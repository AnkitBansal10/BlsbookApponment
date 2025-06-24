import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { scale } from '../utils/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';
import { colors } from '../utils/colors';

const PhoneInputField = () => {
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setCallingCode] = useState('91');
    const [phoneRaw, setPhoneRaw] = useState('');
    const [formattedPhone, setFormattedPhone] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const onSelect = (country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        setPhoneRaw('');
        setFormattedPhone('');
        setIsValid(true);
    };

    useEffect(() => {
        if (!phoneRaw) {
            setIsValid(true);
            setFormattedPhone('');
            return;
        }

        const input = new AsYouType(countryCode);
        input.input(phoneRaw);
        const formatted = input.formattedOutput || phoneRaw;
        setFormattedPhone(formatted);

        const fullNumber = `+${callingCode}${phoneRaw.replace(/\D/g, '')}`;
        const parsed = parsePhoneNumberFromString(fullNumber);
        setIsValid(parsed?.isValid() ?? false);
    }, [phoneRaw, callingCode]);

    return (
        <View style={[styles.container, !isValid && styles.errorBorder]}>
            <TouchableOpacity
                style={styles.countrySection}
                onPress={() => setShowPicker(true)}
                activeOpacity={0.7}
            >
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withEmoji
                    countryCode={countryCode}
                    visible={showPicker}
                    onSelect={onSelect}
                    onClose={() => setShowPicker(false)}
                    renderFlagButton={() => (
                        <View style={styles.roundedFlagWrapper}>
                            <CountryPicker
                                countryCode={countryCode}
                                withFlag
                                withEmoji
                                withCallingCode={false}
                                onOpen={() => setShowPicker(true)}
                            />
                        </View>
                    )}
                />
                <Text style={styles.callingCodeText}>+{callingCode}</Text>
                <Icon name="arrow-drop-down" size={20} color="#333" style={styles.dropdownIcon} />
            </TouchableOpacity>

            <TextInput
                placeholder="Phone Number"
                style={styles.input}
                keyboardType="phone-pad"
                value={formattedPhone}
                onChangeText={(text) => {
                    setPhoneRaw(text.replace(/\D/g, '')); // keep only numbers internally
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth:1,
        borderColor:colors.borderColorSecondcolor,
    borderRadius: 10,
    height: 54,
    width: "90%",
    justifyContent: 'center',
    paddingHorizontal: 16,
    },
    errorBorder: {
        borderColor: 'red',
    },
    countrySection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roundedFlagWrapper: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(25),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    callingCodeText: {
        marginLeft: scale(6),
        fontSize: scale(14),
        color: '#333',
    },
    dropdownIcon: {
        marginLeft: scale(2),
    },
    input: {
        flex: 1,
        marginLeft: scale(10),
        fontSize: scale(14),
        color: '#333',
    },
});

export default PhoneInputField;
