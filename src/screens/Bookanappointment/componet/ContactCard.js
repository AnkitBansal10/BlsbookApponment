import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Geist_Fonts, Poppins_Fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import { CellPhone } from '../../../utils/Image';
import { Mail } from '../../../utils/Image';

const ContactCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Contact</Text>
      <Text style={styles.subText}>
        For any queries, kindly contact us on our call centre or write to us.
      </Text>

      <View style={styles.row}>
        <View style={styles.backgroundColorIcon}>
          <CellPhone />
        </View>
        <Text style={styles.text}>+221 33 840 13 13/14</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.backgroundColorIcon}>
          <Mail />
        </View>
        <Text style={styles.text}>info.senegal@blshelpline.com</Text>
      </View>

      <Text style={styles.boldText}>
        Submission{' '}
        <Text style={styles.lightText}>Monday to Friday 08:30–16:00</Text>
      </Text>
      <Text style={styles.boldText}>
        Collection{' '}
        <Text style={styles.lightText}>Monday to Friday 08:30–16:00</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 340,
    height: 302,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  heading: {
    fontSize: 22,
    fontFamily: Geist_Fonts.Geist_SemiBold,
    color: colors.commonTextColor,
    marginBottom: 6,
  },
  subText: {
    fontSize: 16,
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: colors.commonTextColor,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backgroundColorIcon: {
    backgroundColor:colors.commonTextColor,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: colors.commonTextColor,
  },
  boldText: {
    fontFamily: Poppins_Fonts.Poppins_SemiBold,
    fontSize: 16,
    color: colors.commonTextColor,
    marginTop: 8,
  },
  lightText: {
    fontFamily: Poppins_Fonts.Poppins_Regular,
    fontSize: 16,
    color: colors.commonTextColor,
  },
});

export default ContactCard;
