import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';

const PhoneInputField = ({ 
  value = '', 
  onChangeText, 
  showError = false,
  defaultCountry = 'BA',
  selectedCountry,
  onCountryChange,
  callingCodeCountry,
}) => {
  const [countryCode, setCountryCode] = useState(selectedCountry || defaultCountry);
  const [callingCode, setCallingCode] = useState(callingCodeCountry);
  const [phoneRaw, setPhoneRaw] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [countryData, setCountryData] = useState(null);

  // Initialize country code and calling code
  useEffect(() => {
    if (selectedCountry) {
      setCountryCode(selectedCountry);
    }
    if (callingCodeCountry) {
      setCallingCode(callingCodeCountry);
    }
  }, [selectedCountry, callingCodeCountry]);

  const handleCountrySelect = useCallback((country) => {
    if (!country || !country.cca2 || !country.callingCode) {
      console.warn('Invalid country data:', country);
      return;
    }

    const newCountryCode = country.cca2;
    const newCallingCode = country.callingCode[0];
    
    setCountryCode(newCountryCode);
    setCallingCode(newCallingCode);
    setCountryData(country);
    setPhoneRaw('');
    setFormattedPhone('');
    setIsValid(true);
    onChangeText?.('');
    onCountryChange?.(newCountryCode, newCallingCode);
    setShowPicker(false);
  }, [onChangeText, onCountryChange]);

  // Format and validate phone number
  useEffect(() => {
    if (!phoneRaw) {
      setIsValid(true);
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

      setIsValid(valid);
      onChangeText?.(valid ? fullNumber : '');
    } catch (error) {
      console.warn('Phone number validation error:', error);
      setIsValid(false);
      onChangeText?.('');
    }
  }, [phoneRaw, callingCode, countryCode, onChangeText]);

  const toggleCountryPicker = useCallback(() => {
    setShowPicker(prev => !prev);
  }, []);

  const handlePhoneChange = useCallback((text) => {
    // Remove all non-digit characters
    const digitsOnly = text.replace(/\D/g, '');
    setPhoneRaw(digitsOnly);
  }, []);

  const containerStyle = useMemo(() => [
    styles.container, 
    !isValid && showError && styles.errorBorder
  ], [isValid, showError]);

  const renderFlagButton = useCallback(() => (
    <View style={styles.roundedFlagWrapper}>
      {countryCode && (
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withEmoji
          withCallingCode={false}
          onOpen={toggleCountryPicker}
          containerButtonStyle={styles.flagButton}
        />
      )}
    </View>
  ), [countryCode, toggleCountryPicker]);

  return (
    <View style={styles.wrapper}>
      <View style={containerStyle}>
        <TouchableOpacity
          style={styles.countrySection}
          onPress={toggleCountryPicker}
          activeOpacity={0.7}
          accessibilityLabel="Select country"
        >
          {renderFlagButton()}
          <Text style={styles.callingCodeText}>+{callingCode}</Text>
          <Icon 
            name="arrow-drop-down" 
            size={scale(20)} 
            color={colors.textPrimary} 
            style={styles.dropdownIcon} 
          />
        </TouchableOpacity>
        
        {showPicker && (
          <CountryPicker
            withFlag
            withCallingCode
            withFilter
            withEmoji
            withAlphaFilter
            withCallingCodeButton
            countryCode={countryCode}
            onSelect={handleCountrySelect}
            onClose={() => setShowPicker(false)}
            visible={showPicker}
            preferredCountries={['US', 'GB', 'CA', 'AU', 'IN']}
            theme={{
              primaryColor: colors.primary,
              primaryColorVariant: colors.primaryDark,
              backgroundColor: colors.backgroundLight,
              onBackgroundTextColor: colors.textPrimary,
              filterPlaceholderTextColor: colors.placeholderText,
              activeOpacity: 0.7,
            }}
          />
        )}
        
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor={colors.placeholderText}
          style={styles.input}
          keyboardType="phone-pad"
          value={formattedPhone}
          onChangeText={handlePhoneChange}
          autoComplete="tel"
          textContentType="telephoneNumber"
          accessibilityLabel="Phone number input"
          maxLength={20}
        />
      </View>
      
      {!isValid && showError && (
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
    borderColor: colors.borderLight,
    borderRadius: scale(10),
    height: scale(54),
    width: '90%',
    paddingHorizontal: scale(16),
    alignItems: 'center',
  },
  errorBorder: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: scale(12),
    marginTop: scale(4),
    marginLeft: scale(20),
    alignSelf: 'flex-start',
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
  },
  dropdownIcon: {
    marginLeft: scale(2),
  },
  input: {
    flex: 1,
    fontSize: scale(14),
    color: colors.textPrimary,
    paddingVertical: 0,
  },
});

export default React.memo(PhoneInputField);