// components/StepIndicatorComponent.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { Poppins_Fonts } from '../utils/fonts';
import { scale } from '../utils/responsive';
import { colors } from '../utils/colors';

const StepIndicatorComponent = ({ currentStep = 0 }) => {
  const labels = ['Account', 'Information', 'Processing', 'Preview'];

  const customStyles = {
    stepIndicatorSize: 22,
    currentStepIndicatorSize: 32,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#C28807',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: '#C28807',
    stepStrokeUnFinishedColor: '#aaa',
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: colors.borderColor,
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorUnFinishedColor: '#aaa',
    stepIndicatorCurrentColor: colors.primary,
    labelColor: '#aaa',
    labelSize: scale(14),
    currentStepLabelColor: colors.primary,
    labelFontFamily: Poppins_Fonts.Poppins_Regular,
  };

  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStep}
        stepCount={labels.length}
        labels={labels}
        renderLabel={({ position, stepStatus, label }) => (
          <Text
            style={{
              fontSize: scale(14),
              fontFamily: Poppins_Fonts.Poppins_Regular,
              color:
                position < currentStep
                  ? colors.primary
                  : position === currentStep
                  ? colors.primary
                  : colors.borderColor,
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            {label}
          </Text>
        )}
        renderStepIndicator={({ position, stepStatus }) => {
          // Determine size and color per step
          let size = 22;
          let backgroundColor =colors.borderColor;

          if (position < currentStep) {
            backgroundColor = colors.primary;
            size = 22;
          } else if (position === currentStep) {
            backgroundColor = colors.primary;
            size = 32;
          } else {
            // unfinished future steps
            backgroundColor = '#aaa';
            size = 26; // 👈 increase this value for larger size
          }

          return (
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor,
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default StepIndicatorComponent;
