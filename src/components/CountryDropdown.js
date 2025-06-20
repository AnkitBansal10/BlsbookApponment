import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Assuming these are correctly imported and available
// import { colors } from '../utils/colors'; 
// import { scale } from '../utils/responsive'; 
// import SvgUri from 'react-native-svg-uri'; 

const countries = [
    { label: 'Kazakhstan', value: 'Kazakhstan' },
    { label: 'Cameroon', value: 'Cameroon' },
    { label: 'Senegal', value: 'Senegal' },
    { label: 'Abu Dhabi', value: 'Abu Dhabi' },
    { label: 'Singapore', value: 'Singapore' },
    { label: 'Mali', value: 'Mali' },
];

const CountryDropdown = () => {
    const [openFrom, setOpenFrom] = useState(false);
    const [valueFrom, setValueFrom] = useState(null);

    const [openTo, setOpenTo] = useState(false);
    const [valueTo, setValueTo] = useState(null);

    return (
        <>
            <View style={styles.row}>
                <Icon name="airplane" size={24} color="red" style={styles.leftIcon} />
                <DropDownPicker
                    placeholder="I'm applying from"
                    open={openFrom}
                    value={valueFrom}
                    items={countries}
                    setOpen={setOpenFrom}
                    setValue={setValueFrom}
                    setItems={() => { }}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownBox}
                    textStyle={styles.text}
                    showArrowIcon={true}
                    placeholderStyle={styles.placeholder}
                    ArrowDownIconComponent={() => (
                    <Icon name="chevron-down" size={24} color="#676767" style={{ fontWeight: 'bold' }} />
                    )}
                    ArrowUpIconComponent={() => (
                    <Icon name="chevron-up" size={24} color="#676767" style={{ fontWeight: 'bold' }} />
                    )}
                />
            </View>
            <View style={styles.row}>
                <Icon name="airplane" size={24} color="red" style={styles.leftIcon} />
                <DropDownPicker
                    placeholder="I'm going to"
                    open={openTo}
                    value={valueTo}
                    items={countries}
                    setOpen={setOpenTo}
                    setValue={setValueTo}
                    setItems={() => { }}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownBox}
                    textStyle={styles.text}
                    showArrowIcon={true}
                    placeholderStyle={styles.placeholder}
                    ArrowDownIconComponent={() => (
                    <Icon name="chevron-down" size={24} color="#676767" style={{ fontWeight: 'bold' }} />
                    )}
                    ArrowUpIconComponent={() => (
                    <Icon name="chevron-up" size={24} color="#676767" style={{ fontWeight: 'bold' }} />
                    )}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    row: {
        marginBottom: 10,
        // zIndex: 10,
    },
    dropdown: {
        borderColor: '#ECECEC',
        borderWidth: 1,
        borderRadius: 12,
        paddingLeft: 40, // Adjust padding to make space for the icon
        height: 56,
    },
    dropdownBox: {
        borderColor: '#ECECEC',
        borderWidth: 1,
        borderRadius: 12,
    },
    text: {
        fontSize: 14,
        color: '#333',
    },
    placeholder: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        lineHeight: 48,
        letterSpacing: 0,
        color: '#888',
    },
    leftIcon: {
        position: 'absolute',
        left: 12,
        top: '50%', 
        transform: [{ translateY: -12 }],
    },
});

export default CountryDropdown;