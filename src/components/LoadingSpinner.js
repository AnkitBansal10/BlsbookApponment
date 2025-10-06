import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Dimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { BlackLogo } from '../utils/Image';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

const { width, height } = Dimensions.get('window');

const LoadingSpinner = ({ message = "Loading", overlay = true }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Initial fade in and scale up
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Continuous rotation for spinner
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, overlay && styles.overlay]}>
      <Animated.View 
        style={[
          styles.loadingCard,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Animated Spinner Ring */}
        <Animated.View 
          style={[
            styles.spinnerRing,
            { transform: [{ rotate: spin }] }
          ]}
        >
          <View style={styles.spinnerDot} />
        </Animated.View>

        {/* Logo with pulse animation */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: pulseAnim }]
            }
          ]}
        >
          <BlackLogo
            width={scale(60)}
            height={scale(60)}
          />
        </Animated.View>

        {/* Loading text with animated dots */}
        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <Text style={styles.loadingText}>{message}</Text>
          <View style={styles.dotsContainer}>
            <AnimatedDot delay={0} />
            <AnimatedDot delay={200} />
            <AnimatedDot delay={400} />
          </View>
        </Animated.View>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <Animated.View 
            style={[
              styles.progressBar,
              { transform: [{ scaleX: pulseAnim }] }
            ]} 
          />
        </View>
      </Animated.View>
    </View>
  );
};

// Animated dot component for loading text
const AnimatedDot = ({ delay }) => {
  const dotOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dotOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [delay]);

  return (
    <Animated.Text style={[styles.dot, { opacity: dotOpacity }]}>
      •
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  loadingCard: {
    borderRadius: scale(20),
    padding: scale(30),
    alignItems: 'center',
  },
  spinnerRing: {
    position: 'absolute',
    top: scale(15),
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: colors.primary,
    borderRightColor: colors.primary,
  },
  spinnerDot: {
    position: 'absolute',
    top: -scale(6),
    right: -scale(6),
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    backgroundColor: colors.primary,
  },
  logoContainer: {
    marginBottom: scale(20),
    marginTop: scale(10),
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: scale(15),
  },
  loadingText: {
    color: colors.primary,
    fontSize: scale(16),
    fontFamily: Poppins_Fonts.Poppins_Medium,
    marginBottom: scale(5),
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    color: colors.primary,
    fontSize: scale(20),
    marginHorizontal: scale(2),
    fontFamily: Poppins_Fonts.Poppins_Bold,
  },
  progressContainer: {
    width: '100%',
    height: scale(4),
    backgroundColor: colors.borderColorSecondcolor,
    borderRadius: scale(2),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: scale(2),
    width: '30%',
  },
});

export default LoadingSpinner;
