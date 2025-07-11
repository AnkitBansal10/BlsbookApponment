import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlagIcon, Flight } from '../utils/Image';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

// Memoized countries data
const COUNTRIES = [
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

    // Memoized dropdown props to prevent unnecessary re-renders
    const commonDropdownProps = useMemo(() => ({
        style: styles.dropdown,
        dropDownContainerStyle: styles.dropdownBox,
        textStyle: styles.text,
        placeholderStyle: styles.placeholder,
        arrowIconStyle: styles.arrowIcon,
        items: COUNTRIES,
    }), []);

    // Callback for from dropdown state changes
    const handleFromOpen = useCallback((open) => {
        if (open) setOpenTo(false);
        setOpenFrom(open);
    }, []);

    // Callback for to dropdown state changes
    const handleToOpen = useCallback((open) => {
        if (open) setOpenFrom(false);
        setOpenTo(open);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.iconContainer}>
                    <FlagIcon width={scale(16)} height={scale(18)} />
                </View>
                <DropDownPicker
                    {...commonDropdownProps}
                    placeholder="I'm applying from"
                    open={openFrom}
                    value={valueFrom}
                    setOpen={handleFromOpen}
                    setValue={setValueFrom}
                    zIndex={openFrom ? 3000 : 1000}
                    zIndexInverse={openFrom ? 1000 : 3000}
                />
            </View>

            <View style={styles.row}>
                <View style={styles.iconContainer}>
                    <Flight width={scale(24.21)} height={scale(18)} />
                </View>
                <DropDownPicker
                    {...commonDropdownProps}
                    placeholder="I'm going to"
                    open={openTo}
                    value={valueTo}
                    setOpen={handleToOpen}
                    setValue={setValueTo}
                    zIndex={openTo ? 3000 : 1000}
                    zIndexInverse={openTo ? 1000 : 3000}
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
        paddingLeft: 50,
    },
    dropdownBox: {
        borderColor: '#ECECEC',
        borderWidth: 1,
        borderRadius: 12,
    },
    text: {
        fontSize: 16,
        color: colors.comanTextcolor2,
        fontFamily: Poppins_Fonts.Poppins_Regular
    },
    placeholder: {
        fontSize: 16,
        color: colors.comanTextcolor2,
        fontFamily: Poppins_Fonts.Poppins_Regular
    },
    iconContainer: {
        position: 'absolute',
        left: 15,
        zIndex: 4000,
    },
    arrowIcon: {
        width: 32,
        height: 16,
        tintColor: colors.comanTextcolor2
    },
});

export default React.memo(CountryDropdown);