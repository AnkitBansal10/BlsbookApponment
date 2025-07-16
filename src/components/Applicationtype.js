import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

const data = [
    { label: 'Application type', value: 'Application_type' },
    { label: 'Individual', value: 'Individual', count: 1 },
    { label: 'Group/Family: 2 members', value: 'Group/Family: 2 members', count: 2 },
    { label: 'Group/Family: 3 members', value: 'Group/Family: 3 members', count: 3 },
    { label: 'Group/Family: 4 members', value: 'Group/Family: 4 members', count: 4 },
    { label: 'Group/Family: 5 members', value: 'Group/Family: 5 members', count: 5 },
];
const Applicationtype = ({ value, setValue }) => {
    const handleChange = (item) => {
        setValue({
            value: item.value,
            count: item.count
        });
    };
    const dropdownValue = typeof value === 'object' ? value.value : value;

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemText}
                iconStyle={styles.iconStyle}
                iconColor={colors.comanTextcolor2}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={dropdownValue}
                onChange={handleChange}
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
    itemText: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2
    },
    iconStyle: {
        width: 32,
        height: 16,
    },
});

export default Applicationtype;