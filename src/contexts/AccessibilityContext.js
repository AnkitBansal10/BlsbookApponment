import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tts from 'react-native-tts';
import { AccessibilityInfo, Platform } from 'react-native';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [isAccessibilityEnabled, setIsAccessibilityEnabled] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [isDirectionalGuidanceEnabled, setIsDirectionalGuidanceEnabled] = useState(false);
  const [isHighContrastEnabled, setIsHighContrastEnabled] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); // small, medium, large, extra-large
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(null);
  const [navigationHistory, setNavigationHistory] = useState([]);

  // Initialize accessibility settings
  useEffect(() => {
    initializeAccessibility();
    setupTts();
    checkScreenReader();
  }, []);

  const initializeAccessibility = async () => {
    try {
      const settings = await AsyncStorage.getItem('accessibilitySettings');
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        setIsAccessibilityEnabled(parsedSettings.isAccessibilityEnabled || false);
        setIsTtsEnabled(parsedSettings.isTtsEnabled || false);
        setIsDirectionalGuidanceEnabled(parsedSettings.isDirectionalGuidanceEnabled || false);
        setIsHighContrastEnabled(parsedSettings.isHighContrastEnabled || false);
        setFontSize(parsedSettings.fontSize || 'medium');
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
    }
  };

  const setupTts = () => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1.0);
    
    Tts.addEventListener('tts-start', () => console.log('TTS started'));
    Tts.addEventListener('tts-finish', () => console.log('TTS finished'));
    Tts.addEventListener('tts-cancel', () => console.log('TTS cancelled'));
  };

  const checkScreenReader = () => {
    AccessibilityInfo.isScreenReaderEnabled().then((screenReaderEnabled) => {
      setIsScreenReaderActive(screenReaderEnabled);
    });

    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (screenReaderEnabled) => {
        setIsScreenReaderActive(screenReaderEnabled);
      }
    );

    return () => subscription?.remove();
  };

  const toggleAccessibility = async () => {
    const newValue = !isAccessibilityEnabled;
    setIsAccessibilityEnabled(newValue);
    
    const settings = {
      isAccessibilityEnabled: newValue,
      isTtsEnabled,
      isDirectionalGuidanceEnabled,
      isHighContrastEnabled,
      fontSize
    };
    
    await saveSettings(settings);
    
    if (newValue) {
      speak('Accessibility features enabled');
    } else {
      speak('Accessibility features disabled');
      Tts.stop();
    }
  };

  const toggleTts = async () => {
    const newValue = !isTtsEnabled;
    setIsTtsEnabled(newValue);
    
    const settings = {
      isAccessibilityEnabled,
      isTtsEnabled: newValue,
      isDirectionalGuidanceEnabled,
      isHighContrastEnabled,
      fontSize
    };
    
    await saveSettings(settings);
    
    if (newValue) {
      speak('Text to speech enabled');
    } else {
      speak('Text to speech disabled');
      Tts.stop();
    }
  };

  const toggleDirectionalGuidance = async () => {
    const newValue = !isDirectionalGuidanceEnabled;
    setIsDirectionalGuidanceEnabled(newValue);
    
    const settings = {
      isAccessibilityEnabled,
      isTtsEnabled,
      isDirectionalGuidanceEnabled: newValue,
      isHighContrastEnabled,
      fontSize
    };
    
    await saveSettings(settings);
    
    if (newValue) {
      speak('Directional guidance enabled. I will provide navigation instructions.');
    } else {
      speak('Directional guidance disabled');
    }
  };

  const toggleHighContrast = async () => {
    const newValue = !isHighContrastEnabled;
    setIsHighContrastEnabled(newValue);
    
    const settings = {
      isAccessibilityEnabled,
      isTtsEnabled,
      isDirectionalGuidanceEnabled,
      isHighContrastEnabled: newValue,
      fontSize
    };
    
    await saveSettings(settings);
    
    if (newValue) {
      speak('High contrast mode enabled');
    } else {
      speak('High contrast mode disabled');
    }
  };

  const changeFontSize = async (size) => {
    setFontSize(size);
    
    const settings = {
      isAccessibilityEnabled,
      isTtsEnabled,
      isDirectionalGuidanceEnabled,
      isHighContrastEnabled,
      fontSize: size
    };
    
    await saveSettings(settings);
    speak(`Font size changed to ${size}`);
  };

  const speak = (text, options = {}) => {
    if (isAccessibilityEnabled && isTtsEnabled && text) {
      Tts.stop();
      Tts.speak(text, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
        ...options
      });
    }
  };

  const speakWithDelay = (text, delay = 500) => {
    setTimeout(() => speak(text), delay);
  };

  const announceScreenChange = (screenName, description = '') => {
    if (isAccessibilityEnabled && isTtsEnabled) {
      const announcement = `${screenName} screen. ${description}`;
      speakWithDelay(announcement, 1000);
    }
  };

  const announceFormField = (fieldName, fieldType, isRequired = false, currentValue = '') => {
    if (isAccessibilityEnabled && isTtsEnabled) {
      let announcement = `${fieldName} ${fieldType}`;
      if (isRequired) announcement += ', required';
      if (currentValue) announcement += `, current value: ${currentValue}`;
      speak(announcement);
    }
  };

  const announceError = (errorMessage) => {
    if (isAccessibilityEnabled && isTtsEnabled) {
      speak(`Error: ${errorMessage}`, { androidParams: { KEY_PARAM_VOLUME: 0.8 } });
    }
  };

  const announceSuccess = (message) => {
    if (isAccessibilityEnabled && isTtsEnabled) {
      speak(`Success: ${message}`);
    }
  };

  const provideDirectionalGuidance = (instruction) => {
    if (isAccessibilityEnabled && isDirectionalGuidanceEnabled) {
      speak(instruction);
    }
  };

  const announceButtonAction = (buttonName, action = 'button') => {
    if (isAccessibilityEnabled && isTtsEnabled) {
      speak(`${buttonName} ${action}`);
    }
  };

  const announceListNavigation = (currentItem, totalItems, itemDescription) => {
    if (isAccessibilityEnabled && isTtsEnabled) {
      speak(`Item ${currentItem} of ${totalItems}. ${itemDescription}`);
    }
  };

  const setFocusedElement = (elementInfo) => {
    setCurrentFocus(elementInfo);
    if (isAccessibilityEnabled && isTtsEnabled && elementInfo) {
      speak(elementInfo.description || elementInfo.label);
    }
  };

  const addToNavigationHistory = (screenName) => {
    setNavigationHistory(prev => [...prev.slice(-4), screenName]);
  };

  const getNavigationInstructions = () => {
    if (navigationHistory.length > 0) {
      const currentScreen = navigationHistory[navigationHistory.length - 1];
      return `You are currently on ${currentScreen} screen. Use swipe gestures to navigate between elements.`;
    }
    return 'Use swipe gestures to navigate between elements on this screen.';
  };

  const getFontSizeMultiplier = () => {
    switch (fontSize) {
      case 'small': return 0.8;
      case 'medium': return 1.0;
      case 'large': return 1.2;
      case 'extra-large': return 1.4;
      default: return 1.0;
    }
  };

  const getAccessibilityStyles = () => {
    return {
      fontSize: getFontSizeMultiplier(),
      highContrast: isHighContrastEnabled,
      colors: isHighContrastEnabled ? {
        background: '#000000',
        text: '#FFFFFF',
        primary: '#FFFF00',
        secondary: '#00FFFF',
        error: '#FF0000',
        success: '#00FF00',
        border: '#FFFFFF'
      } : null
    };
  };

  const contextValue = {
    // State
    isAccessibilityEnabled,
    isTtsEnabled,
    isDirectionalGuidanceEnabled,
    isHighContrastEnabled,
    fontSize,
    isScreenReaderActive,
    currentFocus,
    navigationHistory,

    // Actions
    toggleAccessibility,
    toggleTts,
    toggleDirectionalGuidance,
    toggleHighContrast,
    changeFontSize,

    // Speech functions
    speak,
    speakWithDelay,
    announceScreenChange,
    announceFormField,
    announceError,
    announceSuccess,
    announceButtonAction,
    announceListNavigation,

    // Navigation functions
    provideDirectionalGuidance,
    setFocusedElement,
    addToNavigationHistory,
    getNavigationInstructions,

    // Style functions
    getFontSizeMultiplier,
    getAccessibilityStyles
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityContext;
