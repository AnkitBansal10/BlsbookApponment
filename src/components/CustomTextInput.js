import React, { useState, useCallback } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/colors';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  validationType, // 'name' or 'email'
  ...props
}) => {
  const [text, setText] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      setError(true);
      setErrorMessage('Name is required');
      return false;
    } else if (name.length < 3) {
      setError(true);
      setErrorMessage('Name must be at least 3 characters');
      return false;
    } else {
      setError(false);
      setErrorMessage('');
      return true;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError(true);
      setErrorMessage('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setError(true);
      setErrorMessage('Invalid email format');
      return false;
    } else {
      setError(false);
      setErrorMessage('');
      return true;
    }
  };

  // Handle text change and validation
  const handleTextChange = (newText) => {
    setText(newText);
    if (validationType === 'name') {
      validateName(newText);
    } else if (validationType === 'email') {
      validateEmail(newText);
    }
  };

  // Called on blur or submit
  const handleTextSubmit = useCallback(() => {
    if (text !== value) {
      onChangeText(text);
    }
    if (validationType === 'name') {
      validateName(text);
    } else if (validationType === 'email') {
      validateEmail(text);
    }
  }, [text, value, onChangeText, validationType]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={text}
          onChangeText={handleTextChange}
          onSubmitEditing={handleTextSubmit}
          onBlur={() => {
            handleTextSubmit();
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          placeholderTextColor={colors.comanTextcolor2}
          returnKeyType="done"
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
  inputFocused: {
    borderColor: "red", // Highlight when focused
  },
  inputError: {
    borderColor: colors.error, // Red border on error
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