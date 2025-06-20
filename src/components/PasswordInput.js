import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PasswordInput = ({ value, onChangeText, placeholder }) => {
  const [localValue, setLocalValue] = useState(value);
  const [secure, setSecure] = useState(true);

  const handleBlur = useCallback(() => {
    if (localValue !== value) {
      onChangeText(localValue);
    }
  }, [localValue, value, onChangeText]);

  return (
    <View style={styles.container}>
      <TextInput
        value={localValue}
        onChangeText={setLocalValue}
        placeholder={placeholder}
        secureTextEntry={secure}
        onBlur={handleBlur}
        onSubmitEditing={handleBlur}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TouchableOpacity onPress={() => setSecure(!secure)}>
        <Ionicons
          name={secure ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="#555"
        />
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
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
});

export default PasswordInput;
