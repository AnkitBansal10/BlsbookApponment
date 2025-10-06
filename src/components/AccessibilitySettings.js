import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert
} from 'react-native';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import { scale } from '../utils/responsive';
import { createButtonProps, createHeadingProps, ACCESSIBILITY_ROLES } from '../utils/accessibility';

const AccessibilitySettings = ({ visible, onClose }) => {
  const {
    isAccessibilityEnabled,
    isTtsEnabled,
    isDirectionalGuidanceEnabled,
    isHighContrastEnabled,
    fontSize,
    toggleAccessibility,
    toggleTts,
    toggleDirectionalGuidance,
    toggleHighContrast,
    changeFontSize,
    speak,
    getAccessibilityStyles
  } = useAccessibility();

  const accessibilityStyles = getAccessibilityStyles();
  const fontMultiplier = accessibilityStyles.fontSize;
  const themeColors = accessibilityStyles.colors || colors;

  const handleToggleAccessibility = () => {
    toggleAccessibility();
  };

  const handleToggleTts = () => {
    if (!isAccessibilityEnabled) {
      Alert.alert(
        'Accessibility Required',
        'Please enable accessibility features first to use text-to-speech.',
        [{ text: 'OK' }]
      );
      return;
    }
    toggleTts();
  };

  const handleToggleDirectionalGuidance = () => {
    if (!isAccessibilityEnabled) {
      Alert.alert(
        'Accessibility Required',
        'Please enable accessibility features first to use directional guidance.',
        [{ text: 'OK' }]
      );
      return;
    }
    toggleDirectionalGuidance();
  };

  const handleToggleHighContrast = () => {
    toggleHighContrast();
  };

  const handleFontSizeChange = (size) => {
    changeFontSize(size);
  };

  const handleTestTts = () => {
    speak('This is a test of the text to speech functionality. You can hear announcements for buttons, form fields, and navigation instructions.');
  };

  const handleClose = () => {
    speak('Accessibility settings closed');
    onClose();
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background || 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      flex: 1,
      backgroundColor: themeColors.background || colors.white,
      marginTop: scale(50),
      borderTopLeftRadius: scale(20),
      borderTopRightRadius: scale(20),
      padding: scale(20),
    },
    title: {
      fontSize: scale(24) * fontMultiplier,
      fontFamily: Poppins_Fonts.Poppins_Bold,
      color: themeColors.text || colors.primary,
      marginBottom: scale(20),
      textAlign: 'center',
    },
    section: {
      marginBottom: scale(25),
      padding: scale(15),
      backgroundColor: themeColors.background || colors.lightGray,
      borderRadius: scale(10),
      borderWidth: accessibilityStyles.highContrast ? 2 : 0,
      borderColor: themeColors.border || colors.primary,
    },
    sectionTitle: {
      fontSize: scale(18) * fontMultiplier,
      fontFamily: Poppins_Fonts.Poppins_SemiBold,
      color: themeColors.text || colors.primary,
      marginBottom: scale(10),
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: scale(12),
      minHeight: scale(44), // WCAG touch target
    },
    settingLabel: {
      flex: 1,
      fontSize: scale(16) * fontMultiplier,
      fontFamily: Poppins_Fonts.Poppins_Regular,
      color: themeColors.text || colors.commonTextColor,
      marginRight: scale(10),
    },
    settingDescription: {
      fontSize: scale(14) * fontMultiplier,
      fontFamily: Poppins_Fonts.Poppins_Regular,
      color: themeColors.text || colors.comanTextcolor2,
      marginTop: scale(5),
      lineHeight: scale(20),
    },
    fontSizeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: scale(10),
    },
    fontSizeButton: {
      paddingHorizontal: scale(15),
      paddingVertical: scale(10),
      marginRight: scale(10),
      marginBottom: scale(10),
      borderRadius: scale(8),
      borderWidth: 2,
      minWidth: scale(44), // WCAG touch target
      minHeight: scale(44),
      justifyContent: 'center',
      alignItems: 'center',
    },
    fontSizeButtonActive: {
      backgroundColor: themeColors.primary || colors.primary,
      borderColor: themeColors.primary || colors.primary,
    },
    fontSizeButtonInactive: {
      backgroundColor: 'transparent',
      borderColor: themeColors.border || colors.borderColorSecondcolor,
    },
    fontSizeButtonText: {
      fontSize: scale(14) * fontMultiplier,
      fontFamily: Poppins_Fonts.Poppins_Medium,
      textAlign: 'center',
    },
    fontSizeButtonTextActive: {
      color: themeColors.background || colors.white,
    },
    fontSizeButtonTextInactive: {
      color: themeColors.text || colors.commonTextColor,
    },
    testButton: {
      backgroundColor: themeColors.secondary || colors.secondary,
      paddingHorizontal: scale(20),
      paddingVertical: scale(12),
      borderRadius: scale(8),
      marginTop: scale(10),
      minHeight: scale(44), // WCAG touch target
      justifyContent: 'center',
      alignItems: 'center',
    },
    testButtonText: {
      color: themeColors.background || colors.white,
      fontSize: scale(16) * fontMultiplier,
      fontFamily: Poppins_Fonts.Poppins_Medium,
    },
    closeButton: {
      backgroundColor: themeColors.primary || colors.primary,
      paddingHorizontal: scale(30),
      paddingVertical: scale(15),
      borderRadius: scale(10),
      marginTop: scale(20),
      minHeight: scale(44), // WCAG touch target
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButtonText: {
      color: themeColors.background || colors.white,
      fontSize: scale(18) * fontMultiplier,
      fontFamily: Poppins_Fonts.Poppins_SemiBold,
    },
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.content}>
          <Text 
            style={dynamicStyles.title}
            {...createHeadingProps({
              label: 'Accessibility Settings',
              level: 1,
              onFocus: () => speak('Accessibility Settings')
            })}
          >
            Accessibility Settings
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Main Accessibility Toggle */}
            <View style={dynamicStyles.section}>
              <Text 
                style={dynamicStyles.sectionTitle}
                {...createHeadingProps({
                  label: 'Main Settings',
                  level: 2
                })}
              >
                Main Settings
              </Text>
              
              <View style={dynamicStyles.settingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={dynamicStyles.settingLabel}>Enable Accessibility Features</Text>
                  <Text style={dynamicStyles.settingDescription}>
                    Turn on accessibility features including text-to-speech and navigation assistance
                  </Text>
                </View>
                <Switch
                  value={isAccessibilityEnabled}
                  onValueChange={handleToggleAccessibility}
                  trackColor={{ 
                    false: themeColors.border || colors.borderColorSecondcolor, 
                    true: themeColors.primary || colors.primary 
                  }}
                  thumbColor={isAccessibilityEnabled ? (themeColors.background || colors.white) : (themeColors.text || colors.comanTextcolor2)}
                  accessible={true}
                  accessibilityLabel="Enable accessibility features"
                  accessibilityRole="switch"
                  accessibilityState={{ checked: isAccessibilityEnabled }}
                  accessibilityHint="Double tap to toggle accessibility features on or off"
                />
              </View>
            </View>

            {/* Text-to-Speech Settings */}
            <View style={dynamicStyles.section}>
              <Text 
                style={dynamicStyles.sectionTitle}
                {...createHeadingProps({
                  label: 'Text-to-Speech',
                  level: 2
                })}
              >
                Text-to-Speech
              </Text>
              
              <View style={dynamicStyles.settingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={dynamicStyles.settingLabel}>Enable Text-to-Speech</Text>
                  <Text style={dynamicStyles.settingDescription}>
                    Hear spoken announcements for buttons, form fields, and screen changes
                  </Text>
                </View>
                <Switch
                  value={isTtsEnabled}
                  onValueChange={handleToggleTts}
                  trackColor={{ 
                    false: themeColors.border || colors.borderColorSecondcolor, 
                    true: themeColors.primary || colors.primary 
                  }}
                  thumbColor={isTtsEnabled ? (themeColors.background || colors.white) : (themeColors.text || colors.comanTextcolor2)}
                  accessible={true}
                  accessibilityLabel="Enable text-to-speech"
                  accessibilityRole="switch"
                  accessibilityState={{ checked: isTtsEnabled }}
                  accessibilityHint="Double tap to toggle text-to-speech on or off"
                />
              </View>

              {isTtsEnabled && (
                <TouchableOpacity
                  style={dynamicStyles.testButton}
                  onPress={handleTestTts}
                  {...createButtonProps({
                    label: 'Test Text-to-Speech',
                    hint: 'Test the text-to-speech functionality',
                    onPress: handleTestTts
                  })}
                >
                  <Text style={dynamicStyles.testButtonText}>Test Text-to-Speech</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Directional Guidance */}
            <View style={dynamicStyles.section}>
              <Text 
                style={dynamicStyles.sectionTitle}
                {...createHeadingProps({
                  label: 'Navigation Assistance',
                  level: 2
                })}
              >
                Navigation Assistance
              </Text>
              
              <View style={dynamicStyles.settingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={dynamicStyles.settingLabel}>Directional Guidance</Text>
                  <Text style={dynamicStyles.settingDescription}>
                    Receive spoken instructions for navigating through the app
                  </Text>
                </View>
                <Switch
                  value={isDirectionalGuidanceEnabled}
                  onValueChange={handleToggleDirectionalGuidance}
                  trackColor={{ 
                    false: themeColors.border || colors.borderColorSecondcolor, 
                    true: themeColors.primary || colors.primary 
                  }}
                  thumbColor={isDirectionalGuidanceEnabled ? (themeColors.background || colors.white) : (themeColors.text || colors.comanTextcolor2)}
                  accessible={true}
                  accessibilityLabel="Enable directional guidance"
                  accessibilityRole="switch"
                  accessibilityState={{ checked: isDirectionalGuidanceEnabled }}
                  accessibilityHint="Double tap to toggle directional guidance on or off"
                />
              </View>
            </View>

            {/* Visual Settings */}
            <View style={dynamicStyles.section}>
              <Text 
                style={dynamicStyles.sectionTitle}
                {...createHeadingProps({
                  label: 'Visual Settings',
                  level: 2
                })}
              >
                Visual Settings
              </Text>
              
              <View style={dynamicStyles.settingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={dynamicStyles.settingLabel}>High Contrast Mode</Text>
                  <Text style={dynamicStyles.settingDescription}>
                    Use high contrast colors for better visibility
                  </Text>
                </View>
                <Switch
                  value={isHighContrastEnabled}
                  onValueChange={handleToggleHighContrast}
                  trackColor={{ 
                    false: themeColors.border || colors.borderColorSecondcolor, 
                    true: themeColors.primary || colors.primary 
                  }}
                  thumbColor={isHighContrastEnabled ? (themeColors.background || colors.white) : (themeColors.text || colors.comanTextcolor2)}
                  accessible={true}
                  accessibilityLabel="Enable high contrast mode"
                  accessibilityRole="switch"
                  accessibilityState={{ checked: isHighContrastEnabled }}
                  accessibilityHint="Double tap to toggle high contrast mode on or off"
                />
              </View>

              <View style={{ marginTop: scale(15) }}>
                <Text style={dynamicStyles.settingLabel}>Font Size</Text>
                <Text style={dynamicStyles.settingDescription}>
                  Choose your preferred text size for better readability
                </Text>
                <View style={dynamicStyles.fontSizeContainer}>
                  {['small', 'medium', 'large', 'extra-large'].map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        dynamicStyles.fontSizeButton,
                        fontSize === size ? dynamicStyles.fontSizeButtonActive : dynamicStyles.fontSizeButtonInactive
                      ]}
                      onPress={() => handleFontSizeChange(size)}
                      {...createButtonProps({
                        label: `${size.charAt(0).toUpperCase() + size.slice(1)} font size`,
                        hint: `Set font size to ${size}`,
                        isSelected: fontSize === size,
                        onPress: () => handleFontSizeChange(size)
                      })}
                    >
                      <Text style={[
                        dynamicStyles.fontSizeButtonText,
                        fontSize === size ? dynamicStyles.fontSizeButtonTextActive : dynamicStyles.fontSizeButtonTextInactive
                      ]}>
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={dynamicStyles.closeButton}
            onPress={handleClose}
            {...createButtonProps({
              label: 'Close Settings',
              hint: 'Close accessibility settings',
              onPress: handleClose
            })}
          >
            <Text style={dynamicStyles.closeButtonText}>Close Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AccessibilitySettings;
