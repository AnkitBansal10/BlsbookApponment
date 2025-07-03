import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

const ServiceDescriptionInput = () => {
  const [description, setDescription] = useState(''); // State to hold the input value

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Service Description" // The placeholder text
        placeholderTextColor="#888" // Color of the placeholder text
        multiline={true} // Essential for a multiline input
        numberOfLines={4} // Optional: Sets initial height in terms of lines (Android only)
        onChangeText={setDescription} // Update state as text changes
        value={description} // Control the input value
        textAlignVertical="top" // Ensures text starts from the top for multiline (Android only)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20
  },
  input: {
    minHeight: 120, 
    borderColor: '#ddd', // Light grey border color
    borderWidth: 1, // Border width
    borderRadius: 8, // Rounded corners
    paddingHorizontal: 12, 
    paddingVertical: 10,
    fontSize: 16, 
    color: '#333',
    backgroundColor:colors.text
  },
});

export default ServiceDescriptionInput;