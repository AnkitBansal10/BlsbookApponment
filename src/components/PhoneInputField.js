import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

const PhoneInputField = ({ 
  value = '', 
  onChangeText, 
  showError = false,
  defaultCountry = 'IN',
  selectedCountry,
  onCountryChange,
  callingCodeCountry,
  isOptional = false,
  editable = true,
}) => {
  const [countryCode, setCountryCode] = useState(defaultCountry);
  const [callingCode, setCallingCode] = useState(callingCodeCountry||"91");
  const [phoneRaw, setPhoneRaw] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Static mapping of country names to codes
  const countryNameToCode = {
    'pakistan': 'PK',
    'united states': 'US',
    'united kingdom': 'GB',
    'canada': 'CA',
    'australia': 'AU',
    'india': 'IN',
  };

  // Initialize country code and calling code
  useEffect(() => {
    if (selectedCountry) {
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
    }
  }, [selectedCountry, callingCodeCountry]);

  // Handle initial value
  useEffect(() => {
    if (value) {
      try {
        const fullNumber = value.startsWith('+') ? value : `+${callingCode}${value}`;
        const parsed = parsePhoneNumberFromString(fullNumber);
        
        if (parsed) {
          setCountryCode(parsed.country || countryCode);
          setCallingCode(parsed.countryCallingCode || callingCode);
          setPhoneRaw(parsed.nationalNumber);
          
          const formatter = new AsYouType(parsed.country || countryCode);
          formatter.input(parsed.nationalNumber);
          setFormattedPhone(formatter.formattedOutput || parsed.nationalNumber);
        }
      } catch (error) {
        console.warn("Failed to parse initial phone number:", error);
      }
    }
  }, [value, callingCode, countryCode]);

  // Format and validate phone number
  useEffect(() => {
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

      const fullNumber = `+${callingCode}${phoneRaw.replace(/\D/g, '')}`;
      const parsed = parsePhoneNumberFromString(fullNumber);
      const valid = parsed?.isValid() ?? false;

      setIsValid(valid || isOptional);
      onChangeText?.(valid ? fullNumber : '');
    } catch (error) {
      console.warn('Phone number validation error:', error);
      setIsValid(isOptional);
      onChangeText?.('');
    }
  }, [phoneRaw, callingCode, countryCode, onChangeText, isOptional]);

  const handlePhoneChange = useCallback((text) => {
    if (!editable) return;
    const digitsOnly = text.replace(/\D/g, '');
    setPhoneRaw(digitsOnly);

    const formatter = new AsYouType(countryCode);
    formatter.input(digitsOnly);
    setFormattedPhone(formatter.formattedOutput || text);
  }, [countryCode, editable]);

  const containerStyle = useMemo(() => [
    styles.container, 
    !isValid && showError && !isOptional && styles.errorBorder,
    !editable && styles.nonEditableContainer,
  ], [isValid, showError, isOptional, editable]);

  return (
    <View style={styles.wrapper}>
      {!editable ? (
        <TouchableOpacity 
          style={containerStyle}
          activeOpacity={1}
        >
          <View style={styles.countrySection}>
            <View style={styles.roundedFlagWrapper}>
              {countryCode && (
                <CountryPicker
                  countryCode={countryCode}
                  withFlag
                  withEmoji
                  withCallingCode={false}
                  containerButtonStyle={styles.flagButton}
                  disabled
                />
              )}
            </View>
            <Text style={styles.callingCodeText}>+{callingCode}</Text>
          </View>
          <Text style={[styles.input, !editable && styles.nonEditableText]}>
            {formattedPhone || (isOptional ? "Not Provided" : "Phone Number")}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={containerStyle}>
          <View style={styles.countrySection}>
            <View style={styles.roundedFlagWrapper}>
              {countryCode && (
                <CountryPicker
                  countryCode={countryCode}
                  withFlag
                  withEmoji
                  withCallingCode={false}
                  containerButtonStyle={styles.flagButton}
                  disabled
                />
              )}
            </View>
            <Text style={styles.callingCodeText}>+{callingCode}</Text>
          </View>
          <TextInput
            placeholder={isOptional ? "Phone Number (Optional)" : "Phone Number"}
            placeholderTextColor={colors.placeholderText}
            style={styles.input}
            keyboardType="phone-pad"
            value={formattedPhone}
            onChangeText={handlePhoneChange}
            autoComplete="tel"
            textContentType="telephoneNumber"
            accessibilityLabel="Phone number input"
            maxLength={20}
            editable={editable}
          />
        </View>
      )}
      
      {!isValid && showError && !isOptional && (
        <Text style={styles.errorText} accessibilityLiveRegion="polite">
          Please enter a valid phone number
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  container: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.borderColorSecondcolor,
    borderRadius: scale(10),
    height: scale(54),
    width: '90%',
    paddingHorizontal: scale(16),
    alignItems: 'center',
  },
  errorBorder: {
    borderColor: colors.error,
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
    marginLeft: scale(20),
    alignSelf: 'flex-start',
    fontFamily: Poppins_Fonts.Poppins_Regular,
  },
  countrySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(10),
  },
  roundedFlagWrapper: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  callingCodeText: {
    marginLeft: scale(6),
    fontSize: scale(14),
    color: colors.textPrimary,
    fontFamily: Poppins_Fonts.Poppins_Regular,
  },
  input: {
    flex: 1,
    fontSize: scale(14),
    color: colors.comanTextcolor2,
    fontFamily: Poppins_Fonts.Poppins_Regular,
    paddingVertical: 0,
  },
});

export default React.memo(PhoneInputField);