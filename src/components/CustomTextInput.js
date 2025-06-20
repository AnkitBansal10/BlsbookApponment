import React, { useState, useCallback } from 'react';
import { TextInput, View, StyleSheet, Keyboard } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText, ...props }) => {
  const [text, setText] = useState(value);

  // Called only on blur or submitEditing
  const handleTextSubmit = useCallback(() => {
    if (text !== value) {
      onChangeText(text);
    }
  }, [text, value, onChangeText]);

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleTextSubmit}
        onBlur={handleTextSubmit}
        placeholderTextColor="#888"
        returnKeyType="done"
        blurOnSubmit={true}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 54,
    width: "90%",
    justifyContent: 'center',
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
});

export default CustomTextInput;
