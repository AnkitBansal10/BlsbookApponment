import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../assets/images/Animation.gif')}
        style={styles.gif}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  gif: {
    width: 100,
    height: 100,
  },
});

export default LoadingSpinner;