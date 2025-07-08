import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

const data = [
    { label: 'Premium Lounge', value: 'Premium_Lounge' },
    { label: 'Yes', value: 'Yes' },
    { label: 'NO', value: 'NO' },

];
const PremiumLounge = () => {
    const [value, setValue] = useState('Premium_Lounge');

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemTextStyleext}
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
    },
    dropdown: {
        height: 60,
        borderColor: colors.borderColorSecondcolor,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2
    },
    itemTextStyleext:{
   fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2
    },
    iconStyle: {
        width: 32,
        height: 16,
    },
});

export default PremiumLounge;