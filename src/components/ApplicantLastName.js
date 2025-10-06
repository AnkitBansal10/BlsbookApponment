import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import { fontScale } from '../utils/responsive';

const data = [
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Mrs.', value: 'Mrs.' },
    { label: 'Ms.', value: 'Mss.' },

];

const ApplicantLastName = ({ value, onChangeValue, placeholder = "Service type", error, errorMessage }) => {
    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, error && styles.dropdownError]}
                placeholderStyle={[styles.placeholderStyle, error && styles.errorPlaceholder]}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemText}
                selectedItemTextStyle={styles.selectedItemText}
                iconStyle={styles.iconStyle}
                iconColor={error ? colors.error : colors.comanTextcolor2}
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
            {error && <Text style={styles.errorText}>{errorMessage}</Text>}
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
        paddingHorizontal: 12,
    },
    placeholderStyle: {
        fontSize: fontScale(16),
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2
    },
    selectedTextStyle: {
        fontSize: fontScale(16),
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2
    },
    itemText: {
        fontSize: fontScale(16),
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2
    },
    iconStyle: {
        width: 32,
        height: 16,
    },
    dropdownError: {
        borderColor: colors.error,
    },
    errorPlaceholder: {
        color: colors.error,
    },
    errorText: {
        color: colors.error,
        fontSize: fontScale(12),
        marginTop: 4,
        marginLeft: 12,
        fontFamily: Poppins_Fonts.Poppins_Regular,
    },
});
export default ApplicantLastName;
