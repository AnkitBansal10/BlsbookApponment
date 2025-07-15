import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import { fontScale } from '../utils/responsive';

const data = [
  { label: 'Mr.', value: 'Mr.' },
  { label: 'Mrs.', value: 'Mrs.' },
    { label: 'Ms.', value: 'Mss.' },

];

const ApplicantLastName = ({ value, onChangeValue, placeholder = "Service type" }) => {
  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemText}
        selectedItemTextStyle={styles.selectedItemText}
        iconStyle={styles.iconStyle}
        iconColor={colors.comanTextcolor2}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={item => {
          onChangeValue(item.value);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
          width: '90%',
           marginBottom: 20,
    },
    dropdown: {
        height: 54,
        borderColor: colors.borderColorSecondcolor,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal:12,
    },
    placeholderStyle: {
        fontSize:fontScale(16),
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2
    },
    selectedTextStyle: {
        fontSize:fontScale(16),
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2
    },
    itemText: {
        fontSize:fontScale(16),
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2
    },
    iconStyle: {
        width: 32,
        height: 16,
    },
});


export default ApplicantLastName;