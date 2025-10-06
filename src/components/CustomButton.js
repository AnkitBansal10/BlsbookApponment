import React, { memo, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Geist_Fonts } from '../utils/fonts';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { createButtonProps } from '../utils/accessibility';

// Memoized gradient colors array
const GRADIENT_COLORS = ['#9C6100', '#D9A546'];

const CustomButton = ({
  onPress,
  label = "SIGN IN",
  loading = false,
  disabled = false,
  loadingIndicatorColor = '#FFFFFF',
  loadingIndicatorSize = 'small',
  loadingText = '',
  accessibilityLabel,
  accessibilityHint,
  testID
}) => {
  const { 
    announceButtonAction, 
    getAccessibilityStyles,
    isAccessibilityEnabled 
  } = useAccessibility();
  
  const isDisabled = disabled || loading;
  // Remove dynamic font sizing to keep original UI unchanged
  // const accessibilityStyles = getAccessibilityStyles();
  // const fontMultiplier = accessibilityStyles.fontSize;

  const handlePress = useCallback(() => {
    if (!isDisabled) {
      // Announce button action for accessibility
      if (isAccessibilityEnabled) {
        announceButtonAction(accessibilityLabel || label, 'activated');
      }
      onPress?.();
    }
  }, [onPress, isDisabled, announceButtonAction, isAccessibilityEnabled, accessibilityLabel, label]);

  const handleFocus = useCallback(() => {
    if (isAccessibilityEnabled) {
      announceButtonAction(accessibilityLabel || label, 'focused');
    }
  }, [announceButtonAction, isAccessibilityEnabled, accessibilityLabel, label]);

  // Create accessibility props
  const accessibilityProps = createButtonProps({
    label: accessibilityLabel || label,
    hint: accessibilityHint || `${label} button${loading ? ', loading' : ''}${isDisabled ? ', disabled' : ''}`,
    isDisabled,
    onPress: handlePress,
    onFocus: handleFocus
  });

  const dynamicStyles = StyleSheet.create({
    text: {
      color: '#FFFFFF',
      fontSize: 14, // Keep original font size
      fontFamily: Geist_Fonts.Geist_Bold,
      fontWeight: '600',
      letterSpacing: 1,
    },
    loadingText: {
      marginLeft: 8,
      fontSize: 14, // Keep original font size
    },
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={isDisabled ? 1 : 0.85}
      style={[styles.touchable, isDisabled && styles.disabledTouchable]}
      disabled={isDisabled}
      testID={testID}
      {...accessibilityProps}
    >
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, isDisabled && styles.disabledGradient]}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size={loadingIndicatorSize}
              color={loadingIndicatorColor}
              style={styles.indicator}
              accessible={false}
            />
            {loadingText ? (
              <Text style={[dynamicStyles.text, dynamicStyles.loadingText]}>
                {loadingText}
              </Text>
            ) : null}
          </View>
        ) : (
          <Text style={dynamicStyles.text}>{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 44, // WCAG minimum touch target
  },
  disabledTouchable: {
    opacity: 0.9,
  },
  gradient: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledGradient: {
    opacity: 0.8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    marginRight: 8,
  },
});

export default memo(CustomButton);
