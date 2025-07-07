import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Poppins_Fonts } from '../../../utils/fonts'; // Adjust path if needed
import { colors } from '../../../utils/colors';
const InsuranceNoticeCard = () => {
  return (
    <ImageBackground
      source={require('../../../assets/images/Maskgroup.png')} // Replace with your background image
      style={styles.card}
      imageStyle={{ borderRadius: 12 }}
    >
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="bell-outline" size={18} color="#9C6100" />
        </View>
        <Text style={styles.text}>
          Please note that Medical insurance{"\n"} is a mandatory document, We recommend that you
          purchase{"\n"} insurance from the Visa Application{"\n"} Center or from an authorized {"\n"}agency,
          <Text style={styles.date}> 21 May 25</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 207,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  text: {
    flex: 1,
    fontSize: 14,
    // lineHeight: 20,
    color:colors.text,
    fontFamily:Poppins_Fonts.Poppins_Regular,
  },
  date: {
    fontFamily: Poppins_Fonts.Poppins_SemiBold,
  },
});

export default InsuranceNoticeCard;
