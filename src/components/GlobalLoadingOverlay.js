import React from 'react';
import { View, StyleSheet, Modal, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const GlobalLoadingOverlay = () => {
  const { loading } = useSelector(state => state.auth);

  if (!loading) return null;

  return (
    <Modal
      transparent
      visible={loading}
      animationType="fade"
      statusBarTranslucent
    >
      {Platform.OS === 'ios' ? (
        <BlurView
          style={styles.blurContainer}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.9)"
        >
          <LoadingSpinner 
            message="Processing your request..."
            overlay={false}
          />
        </BlurView>
      ) : (
        <View style={styles.androidBlurContainer}>
          <LoadingSpinner 
            message="Processing your request..."
            overlay={false}
          />
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidBlurContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GlobalLoadingOverlay;
