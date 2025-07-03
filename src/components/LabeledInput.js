import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LabeledInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  editable = true,
  secureTextEntry = false,
  error = '',
  success = '',
  iconName,
  onIconPress,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

 

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>
      
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={ placeholder}
          editable={editable}
          placeholderTextColor={colors.commonTextColor}
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity 
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon 
              name={showPassword ? 'visibility-off' : 'visibility'} 
              size={20} 
              color="#888" 
            />
          </TouchableOpacity>
        )}
        
        {iconName && !secureTextEntry && (
          <TouchableOpacity 
            style={styles.iconContainer}
            onPress={onIconPress}
          >
            <Icon name={iconName} size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      {(error || success) && (
        <Text style={[
          styles.message, 
          error ? styles.error : styles.success
        ]}>
          {error || success}
        </Text>
      )}
    </View>
  );
};

export default LabeledInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    position: 'absolute',
    top:-10,
    left: 16,
    fontSize:13,
    fontFamily: Poppins_Fonts.Poppins_Medium,
    zIndex: 20,
    color:colors.primary,
    backgroundColor:"transparent",
    paddingHorizontal: 4,
  },
  labelDefault: {
    top: 18,
    fontSize: scale(14),
    color: '#888',
  },
  labelFocused: {
    top: 0,
    fontSize: scale(12),
    color: colors.primary,
  },
  inputWrapper: {
    backgroundColor:colors.Inputfield,
    borderRadius: 10,
    borderColor:colors.borderColorSecondcolor,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
  },
  input: {
    fontSize: scale(16),
    color:colors.comanTextcolor2,
    fontFamily: Poppins_Fonts.Poppins_Regular,
    paddingVertical: 8,
    paddingRight: 40,
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
  message: {
    fontSize: scale(12),
    fontFamily: Poppins_Fonts.Poppins_Regular,
    marginTop: 4,
    marginLeft: 16,
  },
  error: {
    color: colors.error,
  },
  success: {
    color: colors.success,
  },
});