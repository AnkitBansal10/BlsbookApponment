import React from 'react';
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
import { Geist_Fonts } from '../utils/fonts';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.50;

const CardSlider = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
<Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.ratingRow}>
            <Icon name="star" size={16} color="#F7B801" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        <View style={{flexDirection:"row",justifyContent:"center"}}>
        <Text style={styles.location}>
          <Icon name="map-marker-outline" size={14} /> {item.location}
        </Text>
        <View style={styles.avatars}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/45.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.more}>
            <Text style={styles.moreText}>+50</Text>
          </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={destinationData}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      snapToInterval={CARD_WIDTH + 20}
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  list: {
    // paddingHorizontal: 10,
    backgroundColor:"transparent"
    
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor:colors.text,
    borderRadius: 16,
    marginBottom:30,
    marginHorizontal:8,
    alignItems:"center",
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    marginTop:moderateScale(10),
     borderRadius: 16,
    height:scale(200),
    width: '90%',
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
fontFamily:Geist_Fonts.Geist_SemiBold,
    fontSize: 18,
    color:colors.commonTextColor
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  location: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
  avatars: {
    flexDirection: 'row',
    // marginTop: 8,
  },
  avatar: {
    height: 20,
    width: 20,
    borderRadius: 14,
    marginRight: -8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  more: {
    height: 20,
    width: 20,
    borderRadius: 14,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  moreText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CardSlider;
