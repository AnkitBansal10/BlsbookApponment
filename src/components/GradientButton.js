import React, { memo, useCallback } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../utils/colors';
import { Geist_Fonts } from '../utils/fonts';
import { scale } from '../utils/responsive';
import { Butonlogo } from '../utils/Image';

// Memoized gradient colors
const GRADIENT_COLORS = ['#996600', '#cc9900'];

const GradientButton = ({ 
  title = 'GO', 
  onPress,
  width = "40%",
  height = 56,
  iconSize = 70
}) => {
  // Memoize the press handler
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <TouchableOpacity 
      style={[styles.buttonContainer, { width, height }]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Butonlogo
            width={scale(iconSize)}
            height={scale(iconSize)}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 18,
    fontFamily: Geist_Fonts.Geist_Bold,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default memo(GradientButton);