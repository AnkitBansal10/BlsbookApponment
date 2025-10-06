import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/colors';
import { validators } from '../utils/validation';
import { Poppins_Fonts } from '../utils/fonts';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { createFormFieldProps } from '../utils/accessibility';

const CustomTextInput = React.memo(({
  placeholder,
  value = '',
  onChangeText,
  validationType,
  isOptional = false,
  externalError,
  accessibilityLabel,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [internalValue, setInternalValue] = useState(value);

  const {
    announceFormField,
    announceError,
    speak,
    getAccessibilityStyles,
    isAccessibilityEnabled,
    isTtsEnabled
  } = useAccessibility();

  // Remove dynamic font sizing to keep original UI unchanged
  // const accessibilityStyles = getAccessibilityStyles();
  // const fontMultiplier = accessibilityStyles.fontSize;

  // Sync internal value with external value prop
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Handle external errors
  useEffect(() => {
    if (externalError) {
      setError(true);
      setErrorMessage(externalError);
      // Announce error when it appears
      if (isAccessibilityEnabled && isTtsEnabled) {
        announceError(`${accessibilityLabel || placeholder}: ${externalError}`);
      }
    } else {
      setError(false);
      setErrorMessage('');
    }
  }, [externalError, announceError, isAccessibilityEnabled, isTtsEnabled, accessibilityLabel, placeholder]);

  const validateInput = useCallback((text) => {
    if (validationType && validators[validationType]) {
      if (isOptional && !text.trim()) {
        setError(false);
        setErrorMessage('');
      } else {
        const message = validators[validationType].validate(text);
        const hasError = !!message;
        const finalMessage = message || (text.trim() === '' ? 'This field is required' : '');
        
        setError(hasError);
        setErrorMessage(hasError ? finalMessage : '');
        
        // Announce validation errors
        if (hasError && isAccessibilityEnabled && isTtsEnabled) {
          announceError(`${accessibilityLabel || placeholder}: ${finalMessage}`);
        }
      }
    } else if (!isOptional && text.trim() === '') {
      setError(true);
      setErrorMessage('This field is required');
      
      if (isAccessibilityEnabled && isTtsEnabled) {
        announceError(`${accessibilityLabel || placeholder}: This field is required`);
      }
    }
  }, [validationType, isOptional, announceError, isAccessibilityEnabled, isTtsEnabled, accessibilityLabel, placeholder]);

  const handleTextChange = useCallback((newText) => {
    setInternalValue(newText);
    
    // Clear errors when user starts typing
    if (error) {
      setError(false);
      setErrorMessage('');
    }
    
    // Speak the text as user types (character by character or word by word)
    if (isAccessibilityEnabled && isTtsEnabled && newText !== internalValue) {
      const addedText = newText.slice(internalValue.length);
      const removedText = internalValue.slice(newText.length);
      
      if (addedText) {
        // User added text - speak what was added
        if (addedText === ' ') {
          speak('space');
        } else if (addedText.length === 1) {
          // Single character added
          speak(addedText);
        } else {
          // Multiple characters added (paste operation)
          speak(`Added: ${addedText}`);
        }
      } else if (removedText) {
        // User deleted text
        if (removedText.length === 1) {
          speak('deleted');
        } else {
          speak(`Deleted: ${removedText}`);
        }
      }
    }
    
    // Special case for passport formatting
    if (validationType === 'passport' && newText.length === 8 && !newText.includes(' ')) {
      const formatted = `${newText.substring(0, 2)} ${newText.substring(2)}`;
      setInternalValue(formatted);
      onChangeText?.(formatted);
      validateInput(formatted);
      
      // Announce formatting
      if (isAccessibilityEnabled && isTtsEnabled) {
        speak('Passport formatted');
      }
      return;
    }

    // Call the parent's onChange handler
    onChangeText?.(newText);

    // Only validate while not focused to avoid showing errors during typing
    if (!isFocused) {
      validateInput(newText);
    }
  }, [validationType, onChangeText, isFocused, validateInput, error, isAccessibilityEnabled, isTtsEnabled, speak, internalValue]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setError(false);
    setErrorMessage('');
    
    // Announce field information when focused
    if (isAccessibilityEnabled && isTtsEnabled) {
      const fieldName = accessibilityLabel || placeholder;
      const fieldType = validationType ? `${validationType} input` : 'text input';
      const currentValue = internalValue || '';
      const required = !isOptional;
      
      announceFormField(fieldName, fieldType, required, currentValue);
    }
  }, [announceFormField, isAccessibilityEnabled, isTtsEnabled, accessibilityLabel, placeholder, validationType, internalValue, isOptional]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onChangeText?.(internalValue);
    validateInput(internalValue);
    
    // Announce completion when field is filled
    if (isAccessibilityEnabled && isTtsEnabled && internalValue.trim()) {
      speak(`${accessibilityLabel || placeholder} completed`);
    }
  }, [internalValue, onChangeText, validateInput, speak, isAccessibilityEnabled, isTtsEnabled, accessibilityLabel, placeholder]);

  const inputStyle = useMemo(() => [
    styles.inputWrapper,
    isFocused && styles.inputFocused,
    error && styles.inputError,
    isOptional && styles.optionalInput,
  ], [isFocused, error, isOptional]);

  const dynamicStyles = StyleSheet.create({
    input: {
      fontSize: 16, // Keep original font size
      color: colors.comanTextcolor2,
      fontFamily: Poppins_Fonts.Poppins_Regular
    },
    errorText: {
      color: colors.error,
      fontSize: 12, // Keep original font size
      marginTop: 4,
      marginLeft: 16,
    },
  });

  // Create accessibility props
  const accessibilityProps = createFormFieldProps({
    label: accessibilityLabel || placeholder,
    isRequired: !isOptional,
    hasError: error,
    errorMessage: errorMessage,
    currentValue: internalValue,
    fieldType: validationType ? `${validationType} input` : 'text input',
    onFocus: handleFocus,
    onBlur: handleBlur
  });

  return (
    <View style={styles.container}>
      <View style={inputStyle}>
        <TextInput
          style={dynamicStyles.input}
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
          {...accessibilityProps}
          {...props}
        />
      </View>
      {error && (
        <Text 
          style={dynamicStyles.errorText}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={`Error: ${errorMessage}`}
        >
          {errorMessage}
        </Text>
      )}
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
});

export default CustomTextInput;
