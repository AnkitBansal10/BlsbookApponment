import React, { memo, useCallback, useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { destinationData } from '../utils/MockData';
import { moderateScale, scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Geist_Fonts, Poppins_Fonts } from '../utils/fonts';
import { Avtar, BookMark, Location } from '../utils/Image';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42;

// Memoized grid item component
const GridItem = memo(({ item }) => {
  const locationIconDimensions = useMemo(() => ({
    width: scale(16),
    height: scale(16)
  }), []);

  const avatarDimensions = useMemo(() => ({
    width: scale(44),
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

GridItem.displayName = 'GridItem';

const ViewCardSlider = () => {
  const [loadingMore, setLoadingMore] = useState(false);

  // Memoized render function
  const renderItem = useCallback(({ item }) => (
    <GridItem item={item} />
  ), []);

  // Memoized key extractor
  const keyExtractor = useCallback((item) => item.id, []);

  // Memoized footer component
  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }, [loadingMore]);

  // Optimized load more handler
  const handleLoadMore = useCallback(() => {
    if (!loadingMore) {
      setLoadingMore(true);
      // Simulate loading more data
      setTimeout(() => {
        setLoadingMore(false);
        // Here you would typically fetch more data and update your state
      }, 1500);
    }
  }, [loadingMore]);

  // Memoized getItemLayout for performance
  const getItemLayout = useCallback((data, index) => {
    const itemHeight = scale(180) + moderateScale(10) + 60; // image height + margins + content
    return {
      length: itemHeight,
      offset: itemHeight * Math.floor(index / 2),
      index,
    };
  }, []);

  return (
    <FlatList
      data={destinationData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      contentContainerStyle={styles.list}
      decelerationRate="fast"
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={6}
      windowSize={10}
      initialNumToRender={4}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
  },
  card: {
    width: CARD_WIDTH,
    marginTop: 10,
    backgroundColor: colors.text,
    borderRadius: 16,
    marginBottom: 10,
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
    height: scale(180),
    width: '90%',
  },
  content: {
    padding: 12,
    width: "100%"
  },
  header: {
    width: "94%",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Geist_Fonts.Geist_SemiBold,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
    color: colors.commonTextColor
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.commonTextColor,
    fontFamily: Poppins_Fonts.Poppins_Regular
  },
  containerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "70%"
  },
  location: {
    fontSize: scale(10),
    color: colors.comanTextcolor2,
    marginLeft: scale(2),
  },
  avatars: {
    flexDirection: 'row',
    alignItems: "center"
  },
  footerLoader: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(ViewCardSlider);
