import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

const GDPRCheckbox = ({ checked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container} activeOpacity={0.8}>
      <View style={[
        styles.checkbox,
        checked && styles.checkboxChecked
      ]}>
        {checked && <Icon name="check" size={scale(20)} color="#FFFFFF" />}
      </View>
      <Text style={styles.label}>
        I accept to the <Text style={styles.bold}>GDPR complainces &{'\n'}Terms & conditions</Text>
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: scale(12),
    paddingHorizontal: scale(20),
    marginBottom: scale(20)
  },
  checkbox: {
    width: scale(23),
    height: scale(23),
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 3,
    marginTop: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.borderColorSecondcolor,
  },
  label: {
    fontSize: scale(14),
    textAlign: "left",
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: colors.comanTextcolor2,
    lineHeight: scale(18),
    flex: 1,
  },
  bold: {
    fontSize: scale(14),
    fontFamily: Poppins_Fonts.Poppins_SemiBold,
    color: colors.comanTextcolor2,
  },
});

export default GDPRCheckbox;