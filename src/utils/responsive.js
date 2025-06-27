import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

// Scale based on width
export const scale = size => {
  const scaledSize = (width / guidelineBaseWidth) * size;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

// Scale based on height
export const verticalScale = size => {
  const scaledSize = (height / guidelineBaseHeight) * size;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

// Moderate scale with optional factor
export const moderateScale = (size, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

// Platform-specific scaling
export const platformScale = (size, iosFactor = 1, androidFactor = 0.9) => {
  return Platform.select({
    ios: scale(size) * iosFactor,
    android: scale(size) * androidFactor,
  });
};

// Responsive font size
export const fontScale = size => {
  const scaledSize = scale(size);
  return Platform.select({
    ios: scaledSize,
    android: scaledSize * 0.95,
  });
};