import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/colors';
import { validators } from '../utils/validation';
import { Poppins_Fonts } from '../utils/fonts';

const CustomTextInput = React.memo(({
  placeholder,
  value = '',
  onChangeText,
  validationType,
  isOptional = false,
  externalError,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [internalValue, setInternalValue] = useState(value);

  // Sync internal value with external value prop
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Handle external errors
  useEffect(() => {
    if (externalError) {
      setError(true);
      setErrorMessage(externalError);
    } else {
      setError(false);
      setErrorMessage('');
    }
  }, [externalError]);

  const validateInput = useCallback((text) => {
    if (validationType && validators[validationType]) {
      if (isOptional && !text.trim()) {
        setError(false);
        setErrorMessage('');
      } else {
        const message = validators[validationType].validate(text);
        setError(!!message);
        setErrorMessage(message || (text.trim() === '' ? 'This field is required' : ''));
      }
    } else if (!isOptional && text.trim() === '') {
      setError(true);
      setErrorMessage('This field is required');
    }
  }, [validationType, isOptional]);

  const handleTextChange = useCallback((newText) => {
    setInternalValue(newText);
    
    // Special case for passport formatting
    if (validationType === 'passport' && newText.length === 8 && !newText.includes(' ')) {
      const formatted = `${newText.substring(0, 2)} ${newText.substring(2)}`;
      setInternalValue(formatted);
      onChangeText?.(formatted);
      validateInput(formatted);
      return;
    }

    // Only validate while not focused to avoid showing errors during typing
    if (!isFocused) {
      validateInput(newText);
    }
  }, [validationType, onChangeText, isFocused, validateInput]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setError(false);
    setErrorMessage('');
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onChangeText?.(internalValue);
    validateInput(internalValue);
  }, [internalValue, onChangeText, validateInput]);

  const inputStyle = useMemo(() => [
    styles.inputWrapper,
    isFocused && styles.inputFocused,
    error && styles.inputError,
    isOptional && styles.optionalInput,
  ], [isFocused, error, isOptional]);

  return (
    <View style={styles.container}>
      <View style={inputStyle}>
        <TextInput
          style={styles.input}
          placeholder={isOptional ? `${placeholder} (optional)` : placeholder}
          value={internalValue}
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
});

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
    backgroundColor: colors.optionalBackground || '#f9f9f9',
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