import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

const data = [
    { label: 'Application Center', value: 'application_center' },
    { label: 'singapore', value: 'singapore' },
];

const ApplicationCenter = () => {
    const [value, setValue] = useState('application_center');

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                iconColor={colors.comanTextcolor2}
                textStyle={styles.text}
                itemTextStyle={styles.itemText}
                selectedItemTextStyle={styles.selectedItemText}
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
        marginTop: 20
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
    text: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
         color: colors.commonTextColor,
    },
    iconStyle: {
        width: 32,
        height: 16,
    },
    itemText: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.commonTextColor,
    },
    selectedItemText: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
         color: colors.commonTextColor,
    },
});

export default ApplicationCenter;