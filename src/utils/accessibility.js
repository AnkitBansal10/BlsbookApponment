import { AccessibilityInfo, Platform } from 'react-native';

// WCAG 2.1 AA compliance utilities
export const WCAG_GUIDELINES = {
  // Color contrast ratios
  CONTRAST_RATIOS: {
    NORMAL_TEXT: 4.5,
    LARGE_TEXT: 3.0,
    NON_TEXT: 3.0
  },
  
  // Touch target sizes (minimum 44x44 points)
  TOUCH_TARGET: {
    MIN_WIDTH: 44,
    MIN_HEIGHT: 44
  },
  
  // Font sizes
  FONT_SIZES: {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    EXTRA_LARGE: 24
  },
  
  // Timing
  TIMING: {
    FOCUS_DELAY: 100,
    ANNOUNCEMENT_DELAY: 500,
    SCREEN_CHANGE_DELAY: 1000
  }
};

// Accessibility roles mapping
export const ACCESSIBILITY_ROLES = {
  BUTTON: 'button',
  LINK: 'link',
  TEXT: 'text',
  HEADING: 'header',
  IMAGE: 'image',
  LIST: 'list',
  LIST_ITEM: 'listitem',
  TEXTBOX: 'textbox',
  SEARCH: 'search',
  TAB: 'tab',
  TAB_LIST: 'tablist',
  MENU: 'menu',
  MENU_ITEM: 'menuitem',
  ALERT: 'alert',
  DIALOG: 'dialog',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  SWITCH: 'switch',
  SLIDER: 'slider',
  PROGRESS: 'progressbar',
  STATUS: 'status'
};

// Accessibility states
export const ACCESSIBILITY_STATES = {
  DISABLED: 'disabled',
  SELECTED: 'selected',
  CHECKED: 'checked',
  EXPANDED: 'expanded',
  BUSY: 'busy'
};

// Accessibility traits (iOS specific)
export const ACCESSIBILITY_TRAITS = {
  BUTTON: 'button',
  LINK: 'link',
  HEADER: 'header',
  SEARCH_FIELD: 'searchField',
  IMAGE: 'image',
  SELECTED: 'selected',
  PLAYS_SOUND: 'playsSound',
  KEYBOARD_KEY: 'keyboardKey',
  STATIC_TEXT: 'staticText',
  SUMMARY_ELEMENT: 'summaryElement',
  NOT_ENABLED: 'notEnabled',
  UPDATES_FREQUENTLY: 'updatesFrequently',
  STARTS_MEDIA_SESSION: 'startsMediaSession',
  ADJUSTABLE: 'adjustable',
  ALLOWS_DIRECT_INTERACTION: 'allowsDirectInteraction',
  CAUSES_PAGE_TURN: 'causesPageTurn'
};

// Create accessible props for components
export const createAccessibleProps = ({
  label,
  hint,
  role = ACCESSIBILITY_ROLES.BUTTON,
  state = {},
  traits = [],
  value,
  onFocus,
  onBlur,
  testID
}) => {
  const props = {
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityRole: role,
    testID: testID || label?.toLowerCase().replace(/\s+/g, '_')
  };

  // Add accessibility state
  if (Object.keys(state).length > 0) {
    props.accessibilityState = state;
  }

  // Add accessibility value
  if (value !== undefined) {
    props.accessibilityValue = typeof value === 'string' ? { text: value } : value;
  }

  // Platform specific props
  if (Platform.OS === 'ios' && traits.length > 0) {
    props.accessibilityTraits = traits;
  }

  // Focus handlers
  if (onFocus) {
    props.onAccessibilityFocus = onFocus;
  }
  
  if (onBlur) {
    props.onAccessibilityBlur = onBlur;
  }

  return props;
};

// Create form field accessible props
export const createFormFieldProps = ({
  label,
  isRequired = false,
  hasError = false,
  errorMessage = '',
  currentValue = '',
  fieldType = 'text input',
  onFocus,
  onBlur
}) => {
  let accessibilityLabel = label;
  if (isRequired) accessibilityLabel += ', required';
  
  let accessibilityHint = `${fieldType}`;
  if (currentValue) accessibilityHint += `, current value: ${currentValue}`;
  if (hasError && errorMessage) accessibilityHint += `, error: ${errorMessage}`;

  // For TextInput components, don't set accessibilityRole as it causes issues on Android
  // TextInput has its own built-in accessibility handling
  return {
    accessible: true,
    accessibilityLabel: accessibilityLabel,
    accessibilityHint: accessibilityHint,
    accessibilityState: {
      disabled: false,
      selected: false
    },
    onAccessibilityFocus: onFocus,
    onAccessibilityBlur: onBlur,
    testID: label?.toLowerCase().replace(/\s+/g, '_')
  };
};

// Create button accessible props
export const createButtonProps = ({
  label,
  hint,
  isDisabled = false,
  isSelected = false,
  onPress,
  onFocus,
  onBlur
}) => {
  return {
    ...createAccessibleProps({
      label,
      hint: hint || `${label} button`,
      role: ACCESSIBILITY_ROLES.BUTTON,
      state: {
        disabled: isDisabled,
        selected: isSelected
      },
      traits: Platform.OS === 'ios' ? [ACCESSIBILITY_TRAITS.BUTTON] : [],
      onFocus,
      onBlur
    }),
    onPress: isDisabled ? undefined : onPress
  };
};

// Create list item accessible props
export const createListItemProps = ({
  label,
  hint,
  position,
  totalItems,
  isSelected = false,
  onPress,
  onFocus,
  onBlur
}) => {
  const positionInfo = position && totalItems ? ` ${position} of ${totalItems}` : '';
  
  return createAccessibleProps({
    label: `${label}${positionInfo}`,
    hint: hint || `List item${positionInfo}`,
    role: ACCESSIBILITY_ROLES.LIST_ITEM,
    state: {
      selected: isSelected
    },
    onFocus,
    onBlur
  });
};

// Create heading accessible props
export const createHeadingProps = ({
  label,
  level = 1,
  onFocus
}) => {
  return createAccessibleProps({
    label,
    hint: `Heading level ${level}`,
    role: ACCESSIBILITY_ROLES.HEADING,
    traits: Platform.OS === 'ios' ? [ACCESSIBILITY_TRAITS.HEADER] : [],
    onFocus
  });
};

// Focus management utilities
export const focusElement = (ref, delay = WCAG_GUIDELINES.TIMING.FOCUS_DELAY) => {
  if (ref && ref.current) {
    setTimeout(() => {
      AccessibilityInfo.setAccessibilityFocus(ref.current);
    }, delay);
  }
};

export const announceForAccessibility = (message, delay = 0) => {
  setTimeout(() => {
    AccessibilityInfo.announceForAccessibility(message);
  }, delay);
};

// Screen reader detection
export const isScreenReaderEnabled = async () => {
  try {
    return await AccessibilityInfo.isScreenReaderEnabled();
  } catch (error) {
    console.error('Error checking screen reader status:', error);
    return false;
  }
};

// Reduce motion detection
export const isReduceMotionEnabled = async () => {
  try {
    return await AccessibilityInfo.isReduceMotionEnabled();
  } catch (error) {
    console.error('Error checking reduce motion status:', error);
    return false;
  }
};

// Color contrast calculation (simplified)
export const calculateContrastRatio = (color1, color2) => {
  // This is a simplified version - in production, use a proper color contrast library
  const getLuminance = (color) => {
    // Convert hex to RGB and calculate relative luminance
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Check if contrast meets WCAG standards
export const meetsContrastRequirement = (foreground, background, isLargeText = false) => {
  const ratio = calculateContrastRatio(foreground, background);
  const requirement = isLargeText ? 
    WCAG_GUIDELINES.CONTRAST_RATIOS.LARGE_TEXT : 
    WCAG_GUIDELINES.CONTRAST_RATIOS.NORMAL_TEXT;
  
  return ratio >= requirement;
};

// Navigation helpers
export const createNavigationAnnouncement = (screenName, description = '') => {
  return `${screenName} screen${description ? '. ' + description : ''}`;
};

export const createFormValidationAnnouncement = (errors) => {
  if (errors.length === 0) return 'Form is valid';
  
  const errorCount = errors.length;
  const errorText = errors.join(', ');
  
  return `Form has ${errorCount} error${errorCount > 1 ? 's' : ''}: ${errorText}`;
};

// Gesture helpers
export const createGestureInstructions = (gestureType) => {
  const instructions = {
    swipe: 'Swipe right to move to next element, swipe left to move to previous element',
    tap: 'Double tap to activate',
    scroll: 'Use three finger swipe to scroll',
    navigate: 'Swipe right or left to navigate between elements, double tap to select'
  };
  
  return instructions[gestureType] || instructions.navigate;
};

// Timing helpers
export const createTimeoutWarning = (remainingTime) => {
  if (remainingTime > 60) {
    const minutes = Math.floor(remainingTime / 60);
    return `Session will expire in ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `Session will expire in ${remainingTime} second${remainingTime > 1 ? 's' : ''}`;
  }
};

// Export all utilities
export default {
  WCAG_GUIDELINES,
  ACCESSIBILITY_ROLES,
  ACCESSIBILITY_STATES,
  ACCESSIBILITY_TRAITS,
  createAccessibleProps,
  createFormFieldProps,
  createButtonProps,
  createListItemProps,
  createHeadingProps,
  focusElement,
  announceForAccessibility,
  isScreenReaderEnabled,
  isReduceMotionEnabled,
  calculateContrastRatio,
  meetsContrastRequirement,
  createNavigationAnnouncement,
  createFormValidationAnnouncement,
  createGestureInstructions,
  createTimeoutWarning
};
