import React, { useState, useCallback } from 'react';
import { TextInput, View, StyleSheet, Keyboard } from 'react-native';
import { colors } from '../utils/colors';

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
        placeholderTextColor={colors.comanTextcolor2}
        returnKeyType="done"
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
    marginBottom:20,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth:1,
    borderColor:colors.borderColorSecondcolor
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
});

export default CustomTextInput;
