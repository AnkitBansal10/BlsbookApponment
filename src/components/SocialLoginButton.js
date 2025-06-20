import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialLoginButton = ({ type, onPress }) => {
  const iconMap = {
    google: 'google',
    apple: 'apple',
    facebook: 'facebook',
  };

  return (
    <TouchableOpacity style={[styles.button, styles[type]]} onPress={onPress}>
      <FontAwesome name={iconMap[type]} size={20} color="#fff" />
      <Text style={styles.text}>Continue with {type.charAt(0).toUpperCase() + type.slice(1)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  google: { backgroundColor: '#DB4437' },
  apple: { backgroundColor: '#000' },
  facebook: { backgroundColor: '#4267B2' },
  text: { color: '#fff', marginLeft: 10 },
});

export default SocialLoginButton;
