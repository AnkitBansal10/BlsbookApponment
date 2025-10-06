import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlagIcon, Flight } from '../utils/Image';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { createAccessibleProps, ACCESSIBILITY_ROLES } from '../utils/accessibility';

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

    const {
        announceFormField,
        speak,
        getAccessibilityStyles,
        isAccessibilityEnabled,
        isTtsEnabled
    } = useAccessibility();

    const accessibilityStyles = getAccessibilityStyles();
    const fontMultiplier = accessibilityStyles.fontSize;

    // Memoized dropdown props to prevent unnecessary re-renders
    const commonDropdownProps = useMemo(() => ({
        style: [styles.dropdown, {
            fontSize: 16,
        }],
        dropDownContainerStyle: styles.dropdownBox,
        textStyle: [styles.text, {
            fontSize: 16 ,
        }],
        placeholderStyle: [styles.placeholder, {
            fontSize: 16,
        }],
        arrowIconStyle: styles.arrowIcon,
        items: COUNTRIES,
        listMode: "SCROLLVIEW",
        scrollViewProps: {
            nestedScrollEnabled: true // Enable nested scrolling
        }
    }), [fontMultiplier]);

    // Callback for from dropdown state changes
    const handleFromOpen = useCallback((open) => {
        if (open) {
            setOpenTo(false);
            if (isAccessibilityEnabled && isTtsEnabled) {
                announceFormField(
                    "Country applying from", 
                    "dropdown", 
                    true, 
                    valueFrom || "No selection"
                );
                speak("Available options: " + COUNTRIES.map(c => c.label).join(", "));
            }
        }
        setOpenFrom(open);
    }, [announceFormField, speak, isAccessibilityEnabled, isTtsEnabled, valueFrom]);

    // Callback for to dropdown state changes
    const handleToOpen = useCallback((open) => {
        if (open) {
            setOpenFrom(false);
            if (isAccessibilityEnabled && isTtsEnabled) {
                announceFormField(
                    "Destination country", 
                    "dropdown", 
                    true, 
                    valueTo || "No selection"
                );
                speak("Available options: " + COUNTRIES.map(c => c.label).join(", "));
            }
        }
        setOpenTo(open);
    }, [announceFormField, speak, isAccessibilityEnabled, isTtsEnabled, valueTo]);

    // Handle from dropdown value change
    const handleFromValueChange = useCallback((value) => {
        setValueFrom(value);
        if (isAccessibilityEnabled && isTtsEnabled && value) {
            speak(`Selected applying from: ${value}`);
        }
    }, [speak, isAccessibilityEnabled, isTtsEnabled]);

    // Handle to dropdown value change
    const handleToValueChange = useCallback((value) => {
        setValueTo(value);
        if (isAccessibilityEnabled && isTtsEnabled && value) {
            speak(`Selected destination: ${value}`);
        }
    }, [speak, isAccessibilityEnabled, isTtsEnabled]);

    // Create accessibility props for dropdowns
    const fromDropdownProps = createAccessibleProps({
        label: "Country applying from",
        hint: `Dropdown to select country you are applying from. ${valueFrom ? `Currently selected: ${valueFrom}` : 'No selection made'}`,
        role: ACCESSIBILITY_ROLES.BUTTON,
        state: {
            expanded: openFrom,
            selected: !!valueFrom
        }
    });

    const toDropdownProps = createAccessibleProps({
        label: "Destination country",
        hint: `Dropdown to select destination country. ${valueTo ? `Currently selected: ${valueTo}` : 'No selection made'}`,
        role: ACCESSIBILITY_ROLES.BUTTON,
        state: {
            expanded: openTo,
            selected: !!valueTo
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.iconContainer}>
                    <FlagIcon 
                        width={scale(16)} 
                        height={scale(18)}
                        accessible={false}
                    />
                </View>
                <DropDownPicker
                    {...commonDropdownProps}
                    {...fromDropdownProps}
                    placeholder="I'm applying from"
                    open={openFrom}
                    value={valueFrom}
                    setOpen={handleFromOpen}
                    setValue={handleFromValueChange}
                    zIndex={openFrom ? 3000 : 1000}
                    zIndexInverse={openFrom ? 1000 : 3000}
                    onSelectItem={(item) => {
                        if (isAccessibilityEnabled && isTtsEnabled) {
                            speak(`Selected: ${item.label}`);
                        }
                    }}
                />
            </View>

            <View style={styles.row}>
                <View style={[
                    styles.iconContainer,
                    openFrom && styles.hidden // Hide when first dropdown is open
                ]}>
                    <Flight 
                        width={scale(24.21)} 
                        height={scale(18)}
                        accessible={false}
                    />
                </View>
                <DropDownPicker
                    {...commonDropdownProps}
                    {...toDropdownProps}
                    placeholder="I'm going to"
                    open={openTo}
                    value={valueTo}
                    setOpen={handleToOpen}
                    setValue={handleToValueChange}
                    zIndex={openTo ? 3000 : 1000}
                    zIndexInverse={openTo ? 1000 : 3000}
                    onSelectItem={(item) => {
                        if (isAccessibilityEnabled && isTtsEnabled) {
                            speak(`Selected: ${item.label}`);
                        }
                    }}
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
        minHeight: 44, // WCAG touch target
    },
    dropdownBox: {
        borderColor: '#ECECEC',
        borderWidth: 1,
        borderRadius: 12,
    },
    text: {
        color: colors.comanTextcolor2,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        fontSize:16
    },
    placeholder: {
        color: colors.comanTextcolor2,
        fontFamily: Poppins_Fonts.Poppins_Regular
    },
    iconContainer: {
        position: 'absolute',
        left: 15,
        zIndex: 4000,
    },
    hidden: {
        display: 'none', // This will completely hide the element
    },
    arrowIcon: {
        width: 32,
        height: 16,
        tintColor: colors.comanTextcolor2
    },
});

export default React.memo(CountryDropdown);
