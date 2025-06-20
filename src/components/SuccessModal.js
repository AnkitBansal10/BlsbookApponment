// SuccessModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // or use any vector icon package

const SuccessModal = ({ visible, onClose }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* <Ionicons name="checkmark-circle" size={64} color="green" /> */}
          <Text style={styles.title}>Verification Successful</Text>
          <Text style={styles.message}>You now have full access to our system</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
    width: 300,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8C5E19', // brown-gold tone
    marginTop: 16,
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#C3922F', // gold gradient base color
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    letterSpacing: 1,
  },
});
