import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Long_data } from '../../../utils/MockData';
import { colors } from '../../../utils/colors';
import { Geist_Fonts } from '../../../utils/fonts';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - scale(48)) / 2; // Adjusts for 2 columns with spacing

const LogntermvisaGrid = () => {
  return (
    <FlatList
      data={Long_data}
      numColumns={2}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../../assets/icons/ArrowTop.png')}
            style={styles.arrowIcon}
          />
          <View style={styles.box}>
          <Image
            source={require('../../../assets/images/vistypeimage.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default LogntermvisaGrid;

const styles = StyleSheet.create({
  container: {
    marginTop:20,
  },
  card: {
    width: CARD_SIZE,
    height: verticalScale(180),
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    marginBottom: verticalScale(12),
    width: scale(50),
    height: verticalScale(50),
  },
   box: {
    top: verticalScale(40),
    right: scale(30),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(16),
    color: colors.primary,
    fontFamily: Geist_Fonts.Geist_Medium,
    textAlign: 'center',
  },
  arrowIcon: {
    position: 'absolute',
    top: verticalScale(10),
    right: scale(10),
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
  },
});
