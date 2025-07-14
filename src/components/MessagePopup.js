import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Animated,
  Easing
} from 'react-native';

const { width } = Dimensions.get('window');

const MessagePopup = ({ 
  type = 'info',
  title,
  message,
  onClose,
  visible = false,
  duration = 3000,
  showCloseButton = true,
  animationType = 'fade'
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const getIcon = () => {
    switch(type) {
      case 'success':
        return <Text style={[styles.icon, styles.successIcon]}>✓</Text>;
      case 'error':
        return <Text style={[styles.icon, styles.errorIcon]}>✕</Text>;
      default:
        return <Text style={[styles.icon, styles.infoIcon]}>i</Text>;
    }
  };

  const getButtonStyle = () => {
    switch(type) {
      case 'success':
        return styles.successButton;
      case 'error':
        return styles.errorButton;
      default:
        return styles.infoButton;
    }
  };

  const getTitleStyle = () => {
    switch(type) {
      case 'success':
        return styles.successTitle;
      case 'error':
        return styles.errorTitle;
      default:
        return styles.infoTitle;
    }
  };

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      // Entry animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        })
      ]).start();

      // Auto-dismiss if duration is set
      if (duration) {
        const timer = setTimeout(() => {
          hidePopup();
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      hidePopup();
    }
  }, [visible]);

  const hidePopup = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -30,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      setIsVisible(false);
      onClose && onClose();
    });
  };

  const handleClose = () => {
    hidePopup();
  };

  const getAnimationStyle = () => {
    return {
      opacity: fadeAnim,
      transform: [
        { translateY: slideAnim },
        { scale: scaleAnim }
      ]
    };
  };

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      animationType="none"
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <Animated.View style={[styles.modalView, getAnimationStyle()]}>
          <View style={[styles.iconContainer, styles[`${type}IconBg`]]}>
            {getIcon()}
          </View>
          
          <Text style={[styles.modalTitle, getTitleStyle()]}>
            {title}
          </Text>
          
          <Text style={styles.modalMessage}>
            {message}
          </Text>
          
          {showCloseButton && (
            <TouchableOpacity
              style={[styles.okButton, getButtonStyle()]}
              onPress={handleClose}
              activeOpacity={0.8}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    width: width * 0.85,
    maxWidth: 400,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successIconBg: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  errorIconBg: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  infoIconBg: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  icon: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  successIcon: {
    color: '#22c55e',
  },
  errorIcon: {
    color: '#ef4444',
  },
  infoIcon: {
    color: '#3b82f6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 28,
  },
  successTitle: {
    color: '#15803d',
  },
  errorTitle: {
    color: '#b91c1c',
  },
  infoTitle: {
    color: '#1d4ed8',
  },
  modalMessage: {
    color: '#4b5563',
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  okButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successButton: {
    backgroundColor: '#22c55e',
  },
  errorButton: {
    backgroundColor: '#ef4444',
  },
  infoButton: {
    backgroundColor: '#3b82f6',
  },
  okButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default MessagePopup;