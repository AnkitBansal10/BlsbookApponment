import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

const data = [
  { label: 'Service type', value: 'Service_type' },
  { label: 'Visa', value: 'Visa' },
];

const Servicetype = () => {
  const [value, setValue] = useState('Service_type');

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
    marginTop:20
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
  itemText:{
 fontSize: 16,
    fontFamily:Poppins_Fonts.Poppins_Regular,
    color:colors.comanTextcolor2
  },
  iconStyle: {
    width:32,
    height:16,
  },
});

export default Servicetype;