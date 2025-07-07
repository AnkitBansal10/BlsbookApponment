import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For CLI
import { Geist_Fonts, Poppins_Fonts } from '../../../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../utils/colors';
import { scale } from '../../../utils/responsive';
import { HomeIcon, PLusIcon, Location, FAQ, Wightlocation } from '../../../utils/Image';

const places = [
  {
    id: '1',
    name: 'Colosseum',

    image: require('../../../assets/images/FavoritePlaces3.png'),  // Replace with your image path
  },
  {
    id: '2',
    name: 'Trevi Fountain',
    image: require('../../../assets/images/FavoritePlaces2.png'), // Replace with your image path
  },
  {
    id: '3',
    name: 'Europe',
    image: require('../../../assets/images/FavoritePlaces1.png'),
  },
];

const filters = [
  { id: '1', label: 'VAS', icon: PLusIcon },
  { id: '2', label: 'CENTER', icon: Location },
  { id: '3', label: 'FAQ', icon: FAQ },
  { id: '4', label: '', icon: HomeIcon }, // last icon button only
];

const FavoritePlacesSlider = () => {
      const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Places</Text>

      <FlatList
        data={places}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.overlay}>
              <Wightlocation width={scale(16)} />
              <Text style={styles.locationText}>{item.name}</Text>
            </View>
            <View style={styles.heartpostion}>
              <MaterialIcons name="favorite-border" size={16} color={colors.primary} style={styles.heartIcon} />
            </View>
          </View>
        )}
      />

      <View style={styles.filters}>
        <ScrollView style={{  }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {filters.map((item, index) => (
            <TouchableOpacity key={item.id} style={styles.filterButton} onPress={()=>navigation.navigate("FaqScreen")}>
              {item.icon && (
                <item.icon
                  // width={16}
                  // height={16}
                  style={{ marginRight: item.label ? 6 : 0 }}

                />
              )}
              {item.label ? <Text style={styles.filterLabel}>{item.label}</Text> : null}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    fontSize: 22,
    fontFamily: Geist_Fonts.Geist_SemiBold,
    marginBottom: 12,
    color: colors.commonTextColor,
  },
  list: {
    gap: 12,
  },
  card: {
    width: 140,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: "center"
  },
  locationText: {
    color: colors.text,
    marginLeft: 4,
    fontSize: 12,
    fontFamily: Poppins_Fonts.Poppins_Regular,
  },
  heartpostion: {
    width: scale(20),
    height: scale(20),
    position: 'absolute',
    backgroundColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    top: 8,
    right: 8,
  },
  heartIcon: {
    justifyContent: "center",
    alignItems: "center",

  },
  filters: {
    // flexWrap: 'wrap',
    marginTop: 14,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: colors.text,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 24,
    width: 100,
  },
  filterLabel: {
    fontSize: 13,
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: '#333',
  },
});

export default FavoritePlacesSlider;
