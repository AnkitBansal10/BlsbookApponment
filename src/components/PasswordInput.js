import React, { useState, useMemo, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors } from '../utils/colors';
import { Eye, CloseEye } from '../utils/Image';

const PasswordInput = ({ 
  value = '', 
  onChangeText, 
  placeholder = "Password",
  validationRules = {
    minLength: 8,
    requireUppercase: true,
    requireNumber: true,
    requireSpecialChar: true
  }
}) => {
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState(null);
  const [isTouched, setIsTouched] = useState(false);

  // Memoize validation rules to prevent unnecessary recalculations
  const memoizedRules = useMemo(() => validationRules, [
    validationRules.minLength, 
    validationRules.requireUppercase,
    validationRules.requireNumber,
    validationRules.requireSpecialChar
  ]);

  // Memoize the password validator
  const validatePassword = useCallback((text) => {
    onChangeText?.(text);
    
    if (!isTouched) return;
    
    let errorMessage = null;
    
    if (text.length < memoizedRules.minLength) {
      errorMessage = `Password must be at least ${memoizedRules.minLength} characters`;
    } else if (memoizedRules.requireUppercase && !/[A-Z]/.test(text)) {
      errorMessage = 'Password must contain at least one uppercase letter';
    } else if (memoizedRules.requireNumber && !/[0-9]/.test(text)) {
      errorMessage = 'Password must contain at least one number';
    } else if (memoizedRules.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(text)) {
      errorMessage = 'Password must contain at least one special character';
    }
    
    setError(errorMessage);
  }, [isTouched, memoizedRules, onChangeText]);

  const handleBlur = useCallback(() => {
    setIsTouched(true);
    validatePassword(value);
  }, [validatePassword, value]);

  const toggleSecure = useCallback(() => {
    setSecure(prev => !prev);
  }, []);

  // Memoize the container style
  const containerStyle = useMemo(() => [
    styles.container, 
    error && isTouched && styles.errorContainer
  ], [error, isTouched]);

  return (
    <View style={styles.wrapper}>
      <View style={containerStyle}>
        <TextInput
          value={value}
          onChangeText={validatePassword}
          onBlur={handleBlur}
          placeholder={placeholder}
          secureTextEntry={secure}
          style={styles.input}
          placeholderTextColor={colors.placeholderText}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          accessibilityLabel="Password input field"
          accessibilityHint={error ? error : "Enter your password"}
        />
        <TouchableOpacity 
          onPress={toggleSecure}
          accessibilityLabel={secure ? "Show password" : "Hide password"}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {secure ? <CloseEye /> : <Eye />}
        </TouchableOpacity>
      </View>
      {error && isTouched && (
        <Text style={styles.errorText} accessibilityLiveRegion="polite">
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    marginBottom: 16,
  },
  container: {
    height: 54,
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  errorContainer: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: 'Regular',
  },
});

export default React.memo(PasswordInput);