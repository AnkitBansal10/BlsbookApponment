import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import { scale } from '../utils/responsive';

const data = [
  { label: 'Service type', value: 'Service_type' },
  { label: 'Visa', value: 'Visa' },
];

const Servicetype = ({ value, onValueChange, hasError, errorMessage }) => {
  return (
    <View style={styles.container}>
       <Dropdown
        style={[styles.dropdown, hasError && styles.dropdownError]}
        placeholderStyle={[styles.placeholderStyle, hasError && styles.errorPlaceholder]}
        selectedTextStyle={styles.selectedTextStyle}
         itemTextStyle={styles.itemText}
        selectedItemTextStyle={styles.selectedItemText}
        iconStyle={styles.iconStyle}
        iconColor={hasError ? colors.error : colors.comanTextcolor2}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onChange={item => {
          onValueChange && onValueChange(item.value);
        }}
      />
      {hasError && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop:20
  },
  dropdown: {
    height: 60,
    borderColor:colors.borderColorSecondcolor,
    borderWidth:1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownError: {
    borderColor: colors.error,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily:Poppins_Fonts.Poppins_Regular,
    color:colors.comanTextcolor2
  },
  errorPlaceholder: {
    color: colors.error,
  },
  selectedTextStyle: {
   fontSize: 16,
    fontFamily:Poppins_Fonts.Poppins_Regular,
    color:colors.comanTextcolor2
  },
  itemText:{
 fontSize: 16,
    fontFamily:Poppins_Fonts.Poppins_Regular,
    color:colors.comanTextcolor2
  },
  iconStyle: {
    width:32,
    height:16,
  },
  errorText: {
    color: colors.error,
    fontSize: scale(12),
    marginTop: 4,
    marginLeft: 8,
    fontFamily: Poppins_Fonts.Poppins_Regular,
  },
});

export default Servicetype;
