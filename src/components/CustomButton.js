import React, { memo, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Geist_Fonts } from '../utils/fonts';

// Memoized gradient colors array
const GRADIENT_COLORS = ['#9C6100', '#D9A546'];


const CustomButton = ({ 
  onPress, 
  label = "SIGN IN", 
  loading = false,
  disabled = false,
  loadingIndicatorColor = '#FFFFFF',
  loadingIndicatorSize = 'small',
  loadingText = ''
}) => {
  const isDisabled = disabled || loading;

  const handlePress = useCallback(() => {
    if (!isDisabled) {
      onPress?.();
    }
  }, [onPress, isDisabled]);

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      activeOpacity={isDisabled ? 1 : 0.85}
      style={[styles.touchable, isDisabled && styles.disabledTouchable]}
      disabled={isDisabled}
    >
      <LinearGradient
        colors={ GRADIENT_COLORS}
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
            />
            {loadingText ? (
              <Text style={[styles.text, styles.loadingText]}>{loadingText}</Text>
            ) : null}
          </View>
        ) : (
          <Text style={styles.text}>{label}</Text>
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
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Geist_Fonts.Geist_Bold,
    fontWeight: '600',
    letterSpacing: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    marginRight: 8,
  },
  loadingText: {
    marginLeft: 8,
  },
});

export default memo(CustomButton);