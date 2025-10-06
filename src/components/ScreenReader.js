import React, { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useAccessibility } from '../contexts/AccessibilityContext';

const ScreenReader = ({ 
  screenName, 
  screenDescription, 
  mainContent,
  navigationHints = [],
  formFields = [],
  buttons = [],
  children 
}) => {
  const {
    announceScreenChange,
    announceNavigation,
    speak,
    isAccessibilityEnabled,
    isTtsEnabled
  } = useAccessibility();

  // Announce screen when it comes into focus
  useFocusEffect(
    useCallback(() => {
      if (isAccessibilityEnabled && isTtsEnabled) {
        // Announce screen change
        announceScreenChange(screenName, screenDescription);
        
        // Provide navigation context after a brief delay
        setTimeout(() => {
          if (navigationHints.length > 0) {
            announceNavigation(navigationHints.join('. '));
          }
          
          // Announce available form fields
          if (formFields.length > 0) {
            const fieldsList = formFields.join(', ');
            speak(`Available form fields: ${fieldsList}`);
          }
          
          // Announce available buttons
          if (buttons.length > 0) {
            const buttonsList = buttons.join(', ');
            speak(`Available buttons: ${buttonsList}`);
          }
        }, 1500);
      }
    }, [
      screenName, 
      screenDescription, 
      navigationHints, 
      formFields, 
      buttons,
      announceScreenChange,
      announceNavigation,
      speak,
      isAccessibilityEnabled,
      isTtsEnabled
    ])
  );

  // Announce main content when it changes
  useEffect(() => {
    if (isAccessibilityEnabled && isTtsEnabled && mainContent) {
      setTimeout(() => {
        speak(mainContent);
      }, 2000);
    }
  }, [mainContent, speak, isAccessibilityEnabled, isTtsEnabled]);

  return children || null;
};

export default ScreenReader;
