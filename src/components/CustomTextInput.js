import React, { useState, useCallback, useMemo } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/colors';
import { validators } from '../utils/validation';

const CustomTextInput = ({
  placeholder,
  value = '',
  onChangeText,
  validationType, // 'name', 'email', 'passport' or undefined
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Memoized validation functions
  // const validators = useMemo(() => ({
  //   name: {
  //     validate: (value) => {
  //       if (!value.trim()) return 'Name is required';
  //       if (value.length < 3) return 'Name must be at least 3 characters';
  //       return '';
  //     }
  //   },
  //   email: {
  //     validate: (value) => {
  //       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //       if (!value.trim()) return 'Email is required';
  //       if (!emailRegex.test(value)) return 'Invalid email format';
  //       return '';
  //     }
  //   },
  //   passport: {
  //     validate: (value) => {
  //       // Basic passport number validation (adjust according to your requirements)
  //       const passportRegex = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/i;
  //       if (!value.trim()) return 'Passport number is required';
  //       if (!passportRegex.test(value)) return 'Invalid passport format';
  //       return '';
  //     }
  //   }
  // }), []);

  // Handle text change with validation
  const handleTextChange = useCallback((newText) => {
    onChangeText?.(newText); // Update parent state immediately
    
    // For passport numbers, auto-format with space if needed
    if (validationType === 'passport' && newText.length === 8 && !newText.includes(' ')) {
      const formatted = `${newText.substring(0, 2)} ${newText.substring(2)}`;
      onChangeText?.(formatted);
      newText = formatted;
    }

    if (validationType && validators[validationType]) {
      const message = validators[validationType].validate(newText);
      setError(!!message);
      setErrorMessage(message);
    }
  }, [onChangeText, validationType, validators]);

  // Handle focus changes
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    // Re-validate on blur
    if (validationType && validators[validationType]) {
      const message = validators[validationType].validate(value);
      setError(!!message);
      setErrorMessage(message);
    }
  }, [validationType, validators, value]);

  // Dynamic input style
  const inputStyle = useMemo(() => [
    styles.inputWrapper,
    isFocused && styles.inputFocused,
    error && styles.inputError,
  ], [isFocused, error]);

  return (
    <View style={styles.container}>
      <View style={inputStyle}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholderTextColor={colors.comanTextcolor2}
          returnKeyType="done"
          // Add keyboard type for passport if needed
          keyboardType={validationType === 'passport' ? 'default' : undefined}
          autoCapitalize={validationType === 'passport' ? 'characters' : 'none'}
          maxLength={validationType === 'passport' ? 9 : undefined} // For format like "AB 123456"
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

// Styles remain the same as in your original component
const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 20,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 54,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.borderColorSecondcolor,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  },
});

export default CustomTextInput;