import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlagIcon,Flight } from '../utils/Image';
import { scale } from '../utils/responsive';

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
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.iconContainer}>
                    {/* Changed icon to 'flag' and color to 'black' as per the image */}
                   <FlagIcon width={scale(16)} height={scale(18)} />
                </View>
                <DropDownPicker
                    placeholder="I'm applying from"
                    open={openFrom}
                    value={valueFrom}
                    items={countries}
                    setOpen={setOpenFrom}
                    setValue={setValueFrom}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownBox}
                    textStyle={styles.text}
                    placeholderStyle={styles.placeholder}
                    arrowIconStyle={styles.arrowIcon}
                    // Ensure that the second dropdown doesn't open when the first one is open
                    // This prevents issues with multiple dropdowns trying to expand simultaneously
                    zIndex={3000}
                    zIndexInverse={1000}
                />
            </View>

            <View style={styles.row}>
                <View style={styles.iconContainer}>
                  <Flight width={scale(24.21)} height={scale(18)} />
                </View>
                <DropDownPicker
                    placeholder="I'm going to"
                    open={openTo}
                    value={valueTo}
                    items={countries}
                    setOpen={setOpenTo}
                    setValue={setValueTo}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownBox}
                    textStyle={styles.text}
                    placeholderStyle={styles.placeholder}
                    arrowIconStyle={styles.arrowIcon}
                    // Ensure that the first dropdown doesn't open when the second one is open
                    zIndex={2000}
                    zIndexInverse={2000}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        position: 'relative',
    },
    dropdown: {
        flex: 1,
        borderColor: '#ECECEC',
        borderWidth: 1,
        borderRadius: 12,
        height: 60,
        paddingLeft: 50, // Make space for the icon
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
        // If 'Poppins-Regular' is a custom font, ensure it's loaded in your React Native project.
        // Otherwise, you might need to use a standard font or remove this line.
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: '#888',
    },
    iconContainer: {
        position: 'absolute',
        left: 15,
        // Increased zIndex to ensure the icon is always on top of the dropdown
        zIndex: 4000,
    },
    arrowIcon: {
        width: 24,
        height: 24,
    },
});

export default CountryDropdown;
