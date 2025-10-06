import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
  Dimensions
} from 'react-native';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import { scale } from '../utils/responsive';
import { createButtonProps } from '../utils/accessibility';
import AccessibilitySettings from './AccessibilitySettings';

const { width, height } = Dimensions.get('window');

const AccessibilityFloatingButton = () => {
  const {
    isAccessibilityEnabled,
    isTtsEnabled,
    toggleAccessibility,
    toggleTts,
    speak,
    getAccessibilityStyles
  } = useAccessibility();

  const [showSettings, setShowSettings] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const accessibilityStyles = getAccessibilityStyles();
  const fontMultiplier = accessibilityStyles.fontSize;
  const themeColors = accessibilityStyles.colors || colors;

  const handleMainButtonPress = () => {
    if (!isAccessibilityEnabled) {
      // If accessibility is off, turn it on and enable TTS
      toggleAccessibility();
      speak('Accessibility features enabled. Speech is now active.');
    } else {
      // If accessibility is on, toggle TTS
      toggleTts();
    }
  };

  const handleSettingsPress = () => {
    speak('Opening accessibility settings');
    setShowSettings(true);
    setIsExpanded(false);
  };

  const handleExpandPress = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      speak('Accessibility options expanded');
    } else {
      speak('Accessibility options collapsed');
    }
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
    speak('Accessibility settings closed');
  };

  const getMainButtonIcon = () => {
    if (!isAccessibilityEnabled) {
      return '🔇'; // Muted speaker
    } else if (isTtsEnabled) {
      return '🔊'; // Speaker with sound
    } else {
      return '🔉'; // Speaker with low sound
    }
  };

  const getMainButtonText = () => {
    if (!isAccessibilityEnabled) {
      return 'OFF';
    } else if (isTtsEnabled) {
      return 'ON';
    } else {
      return 'MUTE';
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: scale(100),
      right: scale(20),
      zIndex: 1000,
      alignItems: 'center',
    },
    mainButton: {
      width: scale(60),
      height: scale(60),
      borderRadius: scale(30),
      backgroundColor: isAccessibilityEnabled 
        ? (isTtsEnabled ? themeColors.primary || colors.primary : themeColors.secondary || colors.secondary)
        : themeColors.border || colors.borderColorSecondcolor,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      borderWidth: 2,
      borderColor: accessibilityStyles.highContrast 
        ? (themeColors.border || colors.white) 
        : 'transparent',
    },
    buttonIcon: {
      fontSize: scale(20) * fontMultiplier,
      marginBottom: scale(2),
    },
    buttonText: {
      fontSize: scale(8) * fontMultiplier,
      fontFamily: Poppins_Fonts.Poppins_Bold,
      color: themeColors.background || colors.white,
      textAlign: 'center',
    },
    expandedContainer: {
      position: 'absolute',
      bottom: scale(70),
      right: 0,
      backgroundColor: themeColors.background || colors.white,
      borderRadius: scale(10),
      padding: scale(10),
      elevation: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      borderWidth: accessibilityStyles.highContrast ? 2 : 0,
      borderColor: themeColors.border || colors.primary,
      minWidth: scale(120),
    },
    expandButton: {
      width: scale(40),
      height: scale(40),
      borderRadius: scale(20),
      backgroundColor: themeColors.secondary || colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scale(10),
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    expandIcon: {
      fontSize: scale(16) * fontMultiplier,
      color: themeColors.background || colors.white,
    },
    optionButton: {
      paddingVertical: scale(8),
      paddingHorizontal: scale(12),
      borderRadius: scale(6),
      marginVertical: scale(2),
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: themeColors.border || colors.borderColorSecondcolor,
      minHeight: scale(44), // WCAG touch target
    },
    optionButtonActive: {
      backgroundColor: themeColors.primary || colors.primary,
      borderColor: themeColors.primary || colors.primary,
    },
    optionText: {
      fontSize: scale(12) * fontMultiplier,
      fontFamily: Poppins_Fonts.Poppins_Medium,
      color: themeColors.text || colors.commonTextColor,
      textAlign: 'center',
    },
    optionTextActive: {
      color: themeColors.background || colors.white,
    },
  });

  return (
    <>
      <View style={dynamicStyles.container}>
        {/* Expanded Options */}
        {isExpanded && (
          <View style={dynamicStyles.expandedContainer}>
            <TouchableOpacity
              style={[
                dynamicStyles.optionButton,
                isAccessibilityEnabled && dynamicStyles.optionButtonActive
              ]}
              onPress={toggleAccessibility}
              {...createButtonProps({
                label: `${isAccessibilityEnabled ? 'Disable' : 'Enable'} Accessibility`,
                hint: `Turn accessibility features ${isAccessibilityEnabled ? 'off' : 'on'}`,
                onPress: toggleAccessibility
              })}
            >
              <Text style={[
                dynamicStyles.optionText,
                isAccessibilityEnabled && dynamicStyles.optionTextActive
              ]}>
                {isAccessibilityEnabled ? '✓ Enabled' : 'Enable'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                dynamicStyles.optionButton,
                isTtsEnabled && dynamicStyles.optionButtonActive
              ]}
              onPress={toggleTts}
              disabled={!isAccessibilityEnabled}
              {...createButtonProps({
                label: `${isTtsEnabled ? 'Disable' : 'Enable'} Speech`,
                hint: `Turn text-to-speech ${isTtsEnabled ? 'off' : 'on'}`,
                isDisabled: !isAccessibilityEnabled,
                onPress: toggleTts
              })}
            >
              <Text style={[
                dynamicStyles.optionText,
                isTtsEnabled && dynamicStyles.optionTextActive,
                !isAccessibilityEnabled && { opacity: 0.5 }
              ]}>
                {isTtsEnabled ? '🔊 Speech' : '🔇 Speech'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={dynamicStyles.optionButton}
              onPress={handleSettingsPress}
              {...createButtonProps({
                label: 'Accessibility Settings',
                hint: 'Open full accessibility settings',
                onPress: handleSettingsPress
              })}
            >
              <Text style={dynamicStyles.optionText}>⚙️ Settings</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Expand/Collapse Button */}
        <TouchableOpacity
          style={dynamicStyles.expandButton}
          onPress={handleExpandPress}
          {...createButtonProps({
            label: `${isExpanded ? 'Collapse' : 'Expand'} accessibility options`,
            hint: `${isExpanded ? 'Hide' : 'Show'} accessibility menu`,
            onPress: handleExpandPress
          })}
        >
          <Text style={dynamicStyles.expandIcon}>
            {isExpanded ? '▼' : '▲'}
          </Text>
        </TouchableOpacity>

        {/* Main Speech Toggle Button */}
        <TouchableOpacity
          style={dynamicStyles.mainButton}
          onPress={handleMainButtonPress}
          {...createButtonProps({
            label: `Speech ${getMainButtonText()}`,
            hint: `Text-to-speech is ${getMainButtonText().toLowerCase()}. Double tap to ${
              !isAccessibilityEnabled ? 'enable accessibility and speech' : 
              isTtsEnabled ? 'turn off speech' : 'turn on speech'
            }`,
            onPress: handleMainButtonPress
          })}
        >
          <Text style={dynamicStyles.buttonIcon}>
            {getMainButtonIcon()}
          </Text>
          <Text style={dynamicStyles.buttonText}>
            {getMainButtonText()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Settings Modal */}
      <AccessibilitySettings
        visible={showSettings}
        onClose={handleCloseSettings}
      />
    </>
  );
};

export default AccessibilityFloatingButton;
