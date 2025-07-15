import React, { useState, useCallback, useMemo } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/colors';
import { validators } from '../utils/validation';
import { Poppins_Fonts } from '../utils/fonts';

const CustomTextInput = ({
  placeholder,
  value = '',
  onChangeText,
  validationType, // 'name', 'email', 'passport' or undefined
  isOptional = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTextChange = useCallback((newText) => {
    onChangeText?.(newText);

    if (validationType === 'passport' && newText.length === 8 && !newText.includes(' ')) {
      const formatted = `${newText.substring(0, 2)} ${newText.substring(2)}`;
      onChangeText?.(formatted);
      newText = formatted;
    }

    if (validationType && validators[validationType]) {
      if (isOptional && !newText.trim()) {
        setError(false);
        setErrorMessage('');
      } else {
        const message = validators[validationType].validate(newText);
        setError(!!message);
        setErrorMessage(message);
      }
    }
  }, [onChangeText, validationType, validators, isOptional]);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (validationType && validators[validationType]) {
      if (isOptional && !value.trim()) {
        setError(false);
        setErrorMessage('');
      } else {
        const message = validators[validationType].validate(value);
        setError(!!message);
        setErrorMessage(message);
      }
    }
  }, [validationType, validators, value, isOptional]);

  const inputStyle = useMemo(() => [
    styles.inputWrapper,
    isFocused && styles.inputFocused,
    error && styles.inputError,
    isOptional && styles.optionalInput, // Add optional style
  ], [isFocused, error, isOptional]);

  return (
    <View style={styles.container}>
      <View style={inputStyle}>
        <TextInput
          style={styles.input}
          placeholder={isOptional ? `${placeholder} (optional)` : placeholder}
          value={value}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholderTextColor={colors.comanTextcolor2}
          returnKeyType="done"
          keyboardType={validationType === 'passport' ? 'default' : undefined}
          autoCapitalize={validationType === 'passport' ? 'characters' : 'none'}
          maxLength={validationType === 'passport' ? 9 : undefined}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

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
  optionalInput: {
    backgroundColor: colors.optionalBackground || '#f9f9f9', // Light gray background for optional fields
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    fontSize: 16,
    color: colors.comanTextcolor2,
    fontFamily: Poppins_Fonts.Poppins_Regular
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  },
});

export default CustomTextInput;