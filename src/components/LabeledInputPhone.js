import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LabeledInputPhone = ({
    label,
    value,
    onChangeText,
    placeholder,
    editable = true,
    secureTextEntry = false,
    error = '',
    success = '',
    iconName,
    onIconPress,
    isPhoneInput = false,
    defaultCountry = 'IN',
    selectedCountry, 
    onCountryChange,
    callingCodeCountry,
    isOptional = false,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [countryCode, setCountryCode] = useState(defaultCountry);
    const [callingCode, setCallingCode] = useState(callingCodeCountry);
    const [phoneRaw, setPhoneRaw] = useState('');
    const [formattedPhone, setFormattedPhone] = useState('');
    const [isValid, setIsValid] = useState(true);

    const countryNameToCode = {
        'pakistan': 'PK',
        'united states': 'US',
        'united kingdom': 'GB',
        'canada': 'CA',
        'australia': 'AU',
        'india': 'IN',
    };

    useEffect(() => {
        if (typeof selectedCountry === 'string' && selectedCountry.length > 0) {
            if (selectedCountry.length === 2) {
                setCountryCode(selectedCountry.toUpperCase());
            } else {
                const lowerName = selectedCountry.toLowerCase();
                const foundCode = countryNameToCode[lowerName];
                if (foundCode) {
                    setCountryCode(foundCode);
                }
            }
        }

        if (callingCodeCountry) {
            setCallingCode(callingCodeCountry);
        } else if (defaultCountry) { 
            if (defaultCountry === 'IN' && !callingCodeCountry) {
                setCallingCode('91');
            }
        }
    }, [selectedCountry, callingCodeCountry, defaultCountry]); 

    useEffect(() => {
        if (isPhoneInput && value) {
            try {
                const currentCallingCode = callingCode || '91'; 
                const fullNumber = value.startsWith('+') ? value : `+${currentCallingCode}${value}`;
                const parsed = parsePhoneNumberFromString(fullNumber);

                if (parsed) {
                    setCountryCode(parsed.country || countryCode);
                    setCallingCode(parsed.countryCallingCode || currentCallingCode);
                    setPhoneRaw(parsed.nationalNumber);

                    const formatter = new AsYouType(parsed.country || countryCode);
                    formatter.input(parsed.nationalNumber);
                    setFormattedPhone(formatter.formattedOutput || parsed.nationalNumber);
                }
            } catch (error) {
                console.warn("Failed to parse initial phone number:", error);
            }
        }
    }, [value, callingCode, countryCode, isPhoneInput]);

    useEffect(() => {
        if (!isPhoneInput) return;

        if (!phoneRaw) {
            setIsValid(isOptional);
            setFormattedPhone('');
            onChangeText?.('');
            return;
        }

        try {
            const formatter = new AsYouType(countryCode);
            formatter.input(phoneRaw);
            const formatted = formatter.formattedOutput || phoneRaw;
            setFormattedPhone(formatted);
            const currentCallingCode = callingCode || '91'; 
            const fullNumber = `+${currentCallingCode}${phoneRaw.replace(/\D/g, '')}`;
            const parsed = parsePhoneNumberFromString(fullNumber);
            const valid = parsed?.isValid() ?? false;

            setIsValid(valid || isOptional);
            onChangeText?.(valid ? fullNumber : '');
        } catch (error) {
            console.warn('Phone number validation error:', error);
            setIsValid(isOptional);
            onChangeText?.('');
        }
    }, [phoneRaw, callingCode, countryCode, onChangeText, isOptional, isPhoneInput]);

    const handlePhoneChange = useCallback((text) => {
        if (!editable) return;
        const digitsOnly = text.replace(/\D/g, '');
        setPhoneRaw(digitsOnly);

        const formatter = new AsYouType(countryCode);
        formatter.input(digitsOnly);
        setFormattedPhone(formatter.formattedOutput || text);
    }, [countryCode, editable]);

    const handleCountrySelect = (country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        if (onCountryChange) {
            onCountryChange(country);
        }
    };

    const containerStyle = useMemo(() => [
        styles.container,
        !isValid && error && !isOptional && styles.errorBorder,
        !editable && styles.nonEditableContainer,
    ], [isValid, error, isOptional, editable]);

    const inputWrapperStyle = useMemo(() => [
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        error ? styles.errorBorder : success ? styles.successBorder : null,
        isPhoneInput && styles.phoneInputWrapper,
    ], [isFocused, error, success, isPhoneInput]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
            </Text>
            <View style={inputWrapperStyle}>
                {isPhoneInput ? (
                    <>
                        <View style={styles.countrySection}>
                            <CountryPicker
                                countryCode={countryCode}
                                withFlag
                                withEmoji
                                withCallingCode={false}
                                withFilter
                                withAlphaFilter
                                withCallingCodeButton
                                onSelect={handleCountrySelect}
                                containerButtonStyle={styles.flagButton}
                                disabled={!editable}
                            />
                        </View>
                        <TextInput
                            style={[styles.input, !editable && styles.nonEditableText, styles.phoneTextInput]}
                            //   placeholder={isOptional ? "" : placeholder || "Phone Number"} // Provide a default placeholder if none is given
                            placeholderTextColor={colors.commonTextColor}
                            value={formattedPhone}
                            onChangeText={handlePhoneChange}
                            keyboardType="phone-pad"
                            editable={editable}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            {...rest}
                        />
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            value={value}
                            onChangeText={onChangeText}
                            placeholder={placeholder}
                            editable={editable}
                            placeholderTextColor={colors.commonTextColor}
                            secureTextEntry={secureTextEntry && !showPassword}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            {...rest}
                        />
                        {secureTextEntry && (
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Icon
                                    name={showPassword ? 'visibility-off' : 'visibility'}
                                    size={20}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        )}

                        {iconName && !secureTextEntry && (
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={onIconPress}
                            >
                                <Icon name={iconName} size={20} color={colors.primary} />
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>

            {(error || success) && (
                <Text style={[
                    styles.message,
                    error ? styles.error : styles.success
                ]}>
                    {error || success}
                </Text>
            )}

            {isPhoneInput && !isValid && error && !isOptional && (
                <Text style={styles.errorText} accessibilityLiveRegion="polite">
                    Please enter a valid phone number
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        position: 'absolute',
        top: -10,
        left: 16,
        fontSize: 13,
        fontFamily: Poppins_Fonts.Poppins_Medium,
        zIndex: 20,
        color: colors.primary,
        paddingHorizontal: 4,
    },
    inputWrapper: {
        backgroundColor: colors.Inputfield,
        borderRadius: 10,
        borderColor: colors.borderColorSecondcolor,
        borderWidth: 1,
        paddingHorizontal: 16,
        height: 56,
        justifyContent: 'center',
    },
    phoneInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputWrapperFocused: {
        borderColor: colors.borderColorSecondcolor, // Changed to primary for focus effect
    },
    errorBorder: {
        borderColor: colors.error,
    },
    successBorder: {
        borderColor: colors.success,
    },
    input: {
        fontSize: scale(16),
        color: colors.comanTextcolor2,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        paddingVertical: 8,
        flex: 1,
    },
    phoneTextInput: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    iconContainer: {
        position: 'absolute',
        right: 16,
        padding: 8,
    },
    message: {
        fontSize: scale(12),
        fontFamily: Poppins_Fonts.Poppins_Regular,
        marginTop: 4,
        marginLeft: 16,
    },
    error: {
        color: colors.error,
    },
    success: {
        color: colors.success,
    },
    countrySection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    flagButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 0,
    },
    callingCodeText: {
        marginLeft: 6,
        fontSize: 14,
        color: colors.comanTextcolor2,
        fontFamily: Poppins_Fonts.Poppins_Regular,
    },
    nonEditableContainer: {
        backgroundColor: colors.disabledBackground || '#f5f5f5',
    },
    nonEditableText: {
        color: colors.disabledText || '#888',
    },
    errorText: {
        color: colors.error,
        fontSize: scale(12),
        marginTop: scale(4),
        marginLeft: scale(16),
        fontFamily: Poppins_Fonts.Poppins_Regular,
    },
});

export default LabeledInputPhone;