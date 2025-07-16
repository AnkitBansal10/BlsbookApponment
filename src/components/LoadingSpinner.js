import React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { BlackLogo, Logo } from '../utils/Image';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';

const LoadingSpinner = () => {
  const fadeAnim = new Animated.Value(0);
  const pulseAnim = new Animated.Value(1);

  React.useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: pulseAnim }]
          }
        ]}
      >
        <BlackLogo
          width={scale(100)}
          height={scale(100)}
        />
      </Animated.View>
      <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
        Loading
        <Animated.Text style={styles.dots}>
          <Dot delay={0} />
          <Dot delay={300} />
          <Dot delay={600} />
        </Animated.Text>
      </Animated.Text>
    </View>
  );
};

// Helper component for animated dots
const Dot = ({ delay }) => {
  const dotAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dotAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <>
    <Animated.Text style={{ opacity: dotAnim }}>.</Animated.Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.6)', },
  logoContainer: {
    marginBottom: scale(20),
  },
  loadingText: {
    color:colors.primary,
    fontSize: scale(18),
    fontWeight: '500',
  },
  dots: {
    width: scale(20),
  },
});

export default LoadingSpinner;