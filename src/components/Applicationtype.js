import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import { scale } from '../utils/responsive';

const data = [
    { label: 'Application type', value: 'Application_type' },
    { label: 'Individual', value: 'Individual', count: 1 },
    { label: 'Group/Family: 2 members', value: 'Group/Family: 2 members', count: 2 },
    { label: 'Group/Family: 3 members', value: 'Group/Family: 3 members', count: 3 },
    { label: 'Group/Family: 4 members', value: 'Group/Family: 4 members', count: 4 },
    { label: 'Group/Family: 5 members', value: 'Group/Family: 5 members', count: 5 },
];

const Applicationtype = ({ value, setValue, hasError, errorMessage }) => {
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
                style={[styles.dropdown, hasError && styles.dropdownError]}
                placeholderStyle={[styles.placeholderStyle, hasError && styles.errorPlaceholder]}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemText}
                iconStyle={styles.iconStyle}
                iconColor={hasError ? colors.error : colors.comanTextcolor2}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={dropdownValue}
                onChange={handleChange}
            />
            {hasError && <Text style={styles.errorText}>{errorMessage}</Text>}
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
    dropdownError: {
        borderColor: colors.error,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2
    },
    errorPlaceholder: {
        color: colors.error,
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
    errorText: {
        color: colors.error,
        fontSize: scale(12),
        marginTop: 4,
        marginLeft: 8,
        fontFamily: Poppins_Fonts.Poppins_Regular,
    },
});

export default Applicationtype;
