import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

const GDPRCheckbox = ({ checked = false, onToggle, error }) => {
  const shakeAnimation = React.useRef(new Animated.Value(0)).current;
  
  // Animation for error shake
  const startShake = useCallback(() => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [shakeAnimation]);

  React.useEffect(() => {
    if (error) {
      startShake();
    }
  }, [error, startShake]);

  const handlePress = useCallback(() => {
    onToggle?.();
  }, [onToggle]);

  const checkboxStyle = useMemo(() => [
    styles.checkbox,
    checked && styles.checkboxChecked,
    error && styles.checkboxError,
  ], [checked, error]);

  const containerStyle = useMemo(() => [
    styles.container,
    {
      transform: [{ translateX: shakeAnimation }]
    }
  ], [shakeAnimation]);

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity 
        onPress={handlePress} 
        style={styles.touchableContainer} 
        activeOpacity={0.8}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        accessibilityLabel="GDPR compliance and terms & conditions checkbox"
      >
        <View style={checkboxStyle}>
          {checked && (
            <Icon 
              name="check" 
              size={scale(20)} 
              color="#FFFFFF" 
              accessibilityElementsHidden
            />
          )}
        </View>
        <Text style={styles.label}>
          I accept to the <Text style={styles.bold}>GDPR compliances &{'\n'}Terms & conditions</Text>
        </Text>
      </TouchableOpacity>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(12),
    paddingHorizontal: scale(20),
    marginBottom: scale(8),
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: scale(23),
    height: scale(23),
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 3,
    marginTop: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.borderColorSecondcolor,
  },
  checkboxError: {
    borderColor: colors.error,
  },
  label: {
    fontSize: scale(14),
    textAlign: "left",
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: colors.comanTextcolor2,
    lineHeight: scale(18),
    flex: 1,
  },
  bold: {
    fontSize: scale(14),
    fontFamily: Poppins_Fonts.Poppins_SemiBold,
    color: colors.comanTextcolor2,
  },
  errorText: {
    color: colors.error,
    fontSize: scale(12),
    marginTop: scale(4),
    marginLeft: scale(33),
    fontFamily: Poppins_Fonts.Poppins_Regular,
  },
});

export default memo(GDPRCheckbox);