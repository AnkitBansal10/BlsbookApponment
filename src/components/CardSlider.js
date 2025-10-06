import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { destinationData } from '../utils/MockData';
import { moderateScale, scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Geist_Fonts, Poppins_Fonts } from '../utils/fonts';
import { Avtar, BookMark, Location } from '../utils/Image';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.58;
const SNAP_INTERVAL = CARD_WIDTH + 20;

// Memoized card item component
const CardItem = React.memo(({ item }) => {
  const locationIconDimensions = useMemo(() => ({
    width: scale(16),
    height: scale(16)
  }), []);

  const avatarDimensions = useMemo(() => ({
    width: scale(54),
    height: scale(24)
  }), []);

  const bottomRowStyle = useMemo(() => ({
    flexDirection: "row",
    width: "100%",
    alignItems: "center"
  }), []);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Image 
        source={item.image} 
        style={styles.image}
        resizeMode="cover"
        fadeDuration={200}
      />
      <TouchableOpacity style={styles.bookmarkIconContainer} activeOpacity={0.7}>
        <BookMark width={34} height={34} />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingRow}>
            <Icon name="star" size={16} color="#F7B801" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <View style={bottomRowStyle}>
          <View style={styles.containerLocation}>
            <Location 
              width={locationIconDimensions.width} 
              height={locationIconDimensions.height} 
            />
            <Text style={styles.location} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
          <View style={styles.avatars}>
            <Avtar 
              width={avatarDimensions.width} 
              height={avatarDimensions.height} 
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

CardItem.displayName = 'CardItem';

const CardSlider = React.memo(() => {
  // Memoized render function
  const renderItem = useCallback(({ item }) => (
    <CardItem item={item} />
  ), []);

  // Memoized key extractor
  const keyExtractor = useCallback((item) => item.id, []);

  // Memoized getItemLayout for performance
  const getItemLayout = useCallback((data, index) => ({
    length: SNAP_INTERVAL,
    offset: SNAP_INTERVAL * index,
    index,
  }), []);

  return (
    <FlatList
      data={destinationData}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      snapToInterval={SNAP_INTERVAL}
      decelerationRate="fast"
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={3}
      windowSize={5}
      initialNumToRender={2}
      scrollEventThrottle={16}
      bounces={false}
    />
  );
});

CardSlider.displayName = 'CardSlider';

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 14,
  },
  card: {
  width: CARD_WIDTH,
  marginTop: 10,
  backgroundColor: colors.text,
  borderRadius: 16,
  marginBottom: 30,
  marginHorizontal: 8,
  alignItems: "center",
  shadowColor: '#000',
  shadowOffset: { 
    width: 0, 
    height: 2 
  },
  shadowOpacity: 0.15,
  shadowRadius: 2,
  elevation: 2, 
  overflow: 'hidden',
  borderTopWidth: 0.5,
  borderTopColor: 'rgba(0,0,0,0.1)',
  shadowOffset: {
    width: 0,
    height: [-3, 3],
  }
  },
   bookmarkIconContainer: {
    position: 'absolute',
    top: moderateScale(20),
    right: moderateScale(20),
    borderRadius: moderateScale(20), 
    width: moderateScale(36),
    height: moderateScale(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: moderateScale(10),
    borderRadius: 16,
    height: scale(240),
    width: '90%',
  },
  content: {
    padding: 12,
    width:"100%"
  },
  header: {
    width:"94%",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Geist_Fonts.Geist_SemiBold,
    fontSize: 18,
    lineHeight:20,
      marginBottom:6,
    color: colors.commonTextColor
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 15,
    color:colors.commonTextColor,
    fontFamily:Poppins_Fonts.Poppins_Regular
  },
  containerLocation:{
 flexDirection: 'row',
    alignItems: 'center',
    width:"70%"
  },
  location: {
   fontSize: scale(13), 
    color:colors.comanTextcolor2,
    marginLeft: scale(2),
  },
  avatars: {
    flexDirection: 'row',
    // marginLeft:4,
    alignItems:"center"
  },
});

export default CardSlider;
