import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

const data = [
    { label: 'Time Slot', value: 'Time_Slot' }, 
    { label: '09:00 - 09:30', value: '09:00 - 09:30' },
    { label: '09:30 - 10:00', value: '09:30 - 10:00' },
    { label: '10:00 - 10:30', value: '10:00 - 10:30' },
    { label: '10:30 - 11:00', value: '10:30 - 11:00' },
    { label: '11:00 - 11:30', value: '11:00 - 11:30' },
    { label: '11:30 - 12:00', value: '11:30 - 12:00' },
    { label: '13:00 - 13:30', value: '13:00 - 13:30' },
    { label: '13:30 - 14:00', value: '13:30 - 14:00' },
    { label: '14:00 - 14:30', value: '14:00 - 14:30' },
    { label: '14:30 - 15:00', value: '14:30 - 15:00' },
    { label: '15:00 - 15:30', value: '15:00 - 15:30' },
    { label: '15:30 - 16:00', value: '15:30 - 16:00' },
  ];

const TimeSlot = () => {
  const [value, setValue] = useState('Time_Slot');

  return (
    <View style={styles.container}>
       <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        iconColor={colors.comanTextcolor2}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop:20,
    marginBottom:20
  },
  dropdown: {
    height: 60,
    borderColor:colors.borderColorSecondcolor,
    borderWidth:1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily:Poppins_Fonts.Poppins_Regular,
    color:colors.comanTextcolor2
  },
  selectedTextStyle: {
   fontSize: 16,
    fontFamily:Poppins_Fonts.Poppins_Regular,
    color:colors.comanTextcolor2
  },
  iconStyle: {
    width:32,
    height:16,
  },
});

export default TimeSlot;