import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Geist_Fonts, Poppins_Fonts } from '../../../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../utils/colors';
import { scale } from '../../../utils/responsive';
import { HomeIcon, PLusIcon, Location, FAQ, Wightlocation } from '../../../utils/Image';

// Memoized data to prevent recreation
const places = [
  {
    id: '1',
    name: 'Colosseum',
    image: require('../../../assets/images/FavoritePlaces3.png'),
  },
  {
    id: '2',
    name: 'Trevi Fountain',
    image: require('../../../assets/images/FavoritePlaces2.png'),
  },
  {
    id: '3',
    name: 'Europe',
    image: require('../../../assets/images/FavoritePlaces1.png'),
  },
];

const filters = [
  { id: '1', label: 'VAS', icon: PLusIcon, route: 'FaqScreen' },
  { id: '2', label: 'CENTER', icon: Location, route: 'CenterScreen' },
  { id: '3', label: 'FAQ', icon: FAQ, route: 'FaqScreen' },
  { id: '4', label: '', icon: HomeIcon, route: 'HomeScreen' },
];

const CARD_WIDTH = scale(140);
const CARD_HEIGHT = scale(160);
const FILTER_BUTTON_WIDTH = scale(100);

const FavoritePlacesSlider = () => {
  const navigation = useNavigation();

  // Memoized render functions
  const renderPlaceItem = useCallback(({ item }) => (
    <View style={styles.card}>
      <Image 
        source={item.image} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Wightlocation width={scale(16)} height={scale(16)} />
        <Text 
          style={styles.locationText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.heartPosition}
        activeOpacity={0.8}
      >
        <MaterialIcons 
          name="favorite-border" 
          size={scale(16)} 
          color={colors.primary} 
        />
      </TouchableOpacity>
    </View>
  ), []);

  const renderFilterItem = useCallback((item) => (
    <TouchableOpacity 
      key={item.id}
      style={styles.filterButton}
      onPress={() => navigation.navigate(item.route)}
      activeOpacity={0.8}
      accessibilityLabel={item.label || 'Home'}
    >
      <item.icon width={scale(16)} height={scale(16)} />
      {item.label ? (
        <Text style={styles.filterLabel}>{item.label}</Text>
      ) : null}
    </TouchableOpacity>
  ), [navigation]);

  // Optimize FlatList performance
  const getItemLayout = useCallback((data, index) => ({
    length: CARD_WIDTH + styles.list.gap,
    offset: (CARD_WIDTH + styles.list.gap) * index,
    index,
  }), []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Places</Text>

      <FlatList
        data={places}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={renderPlaceItem}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
      />
      <FlatList
        data={filters}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.filters}
        renderItem={({ item }) => renderFilterItem(item)}
        getItemLayout={(data, index) => ({
          length: FILTER_BUTTON_WIDTH + 8,
          offset: (FILTER_BUTTON_WIDTH + 8) * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
    paddingHorizontal: scale(9),
  },
  header: {
    fontSize: scale(22),
    fontFamily: Geist_Fonts.Geist_SemiBold,
    marginBottom: scale(12),
    color: colors.commonTextColor,
  },
  list: {
    gap: scale(12),
    paddingBottom: scale(8),
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: scale(12),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: scale(8),
    left: scale(8),
    right: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: scale(4),
    borderRadius: scale(4),
  },
  locationText: {
    color: colors.text,
    marginLeft: scale(4),
    fontSize: scale(12),
    fontFamily: Poppins_Fonts.Poppins_Regular,
    flex: 1,
  },
  heartPosition: {
    position: 'absolute',
    top: scale(8),
    right: scale(8),
    width: scale(20),
    height: scale(20),
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
  },
  filters: {
    gap: scale(8),
    paddingVertical: scale(8),
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.text,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(24),
    minWidth: FILTER_BUTTON_WIDTH,
    justifyContent: 'center',
  },
  filterLabel: {
    fontSize: scale(13),
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: colors.textPrimary,
    marginLeft: scale(6),
  },
});

export default memo(FavoritePlacesSlider);