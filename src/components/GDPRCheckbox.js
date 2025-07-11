import React, { memo, useCallback,useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

const GDPRCheckbox = ({ checked = false, onToggle }) => {
  // Memoize the toggle handler to prevent unnecessary re-renders
  const handlePress = useCallback(() => {
    onToggle?.();
  }, [onToggle]);

  // Memoize the checkbox style to prevent recalculation on every render
  const checkboxStyle = useMemo(() => [
    styles.checkbox,
    checked && styles.checkboxChecked
  ], [checked]);

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={styles.container} 
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: scale(12),
    paddingHorizontal: scale(20),
    marginBottom: scale(20),
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
});

export default memo(GDPRCheckbox);