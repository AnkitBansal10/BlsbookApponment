import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Tts from 'react-native-tts';
import { BlackLogo } from '../../utils/Image';
import { BackgroundGradient } from '../../utils/Image';
// import { BlackLogo } from '../../utils/Image';
// import { scale } from '../../utils/responsive';
const VoiceoverScreen = () => {
  const [voiceoverEnabled, setVoiceoverEnabled] = useState(false);

  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('en-US');
      Tts.setDefaultRate(0.5);
    }).catch(err => {
      console.warn('TTS initialization error:', err);
    });
    return () => {
      Tts.stop();
    };
  }, []);
  const toggleVoiceover = () => {
    const newState = !voiceoverEnabled;
    setVoiceoverEnabled(newState);
    
    if (newState) {
      Tts.speak('Voiceover enabled');
    } else {
      Tts.stop();
    }
  };
  const speak = (text) => {
    if (voiceoverEnabled) {
      Tts.speak(text);
    }
  };

  return (
    <View style={styles.container}>
          {/* <BackgroundGradient
                style={{ position: "absolute", width: '100%', height: '100%' }}
              /> */}
      <Text style={styles.title}>Voiceover Settings</Text>
      <TouchableOpacity 
        style={[
          styles.toggleButton,
          voiceoverEnabled ? styles.toggleOn : styles.toggleOff
        ]}
        onPress={toggleVoiceover}
        onPressIn={() => speak('Voiceover toggle button')}
        accessible={true}
        accessibilityLabel={voiceoverEnabled ? 'Voiceover on, double tap to turn off' : 'Voiceover off, double tap to turn on'}
        accessibilityRole="button">
        <Text style={styles.toggleText}>
          {voiceoverEnabled ? 'ON' : 'OFF'}
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.description}>
        Toggle to enable or disable voiceover
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 32,
  },
  toggleButton: {
    width: 120, 
    height: 44, 
    borderRadius: 22, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginVertical: 8,
  },
  toggleOn: {
    backgroundColor: '#4CAF50',
  },
  toggleOff: {
    backgroundColor: '#F44336', 
  },
  toggleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default VoiceoverScreen;