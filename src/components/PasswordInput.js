import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { Eye, CloseEye } from '../utils/Image';

const PasswordInput = ({ value, onChangeText, placeholder }) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TouchableOpacity onPress={() => setSecure(!secure)}>
        {secure ? <CloseEye /> : <Eye />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 54,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.borderColorSecondcolor,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
});

export default PasswordInput;
