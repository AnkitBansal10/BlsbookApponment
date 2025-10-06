import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const { OzLivenessModule } = NativeModules;
class OzLiveness {
  constructor() {
    this.eventEmitter = new NativeEventEmitter(OzLivenessModule);
  }
  // Initialize the Oz SDK
  async initialize(licenseKey, config = {}) {
    try {
      if (Platform.OS === 'ios') {
        return await OzLivenessModule.initialize(licenseKey, config);
      } else if (Platform.OS === 'android') {
        return await OzLivenessModule.initialize(licenseKey, config);
      }
    } catch (error) {
      console.error('Failed to initialize Oz SDK:', error);
      throw error;
    }
  }
  // Start liveness detection
  async startLivenessCheck() {
    try {
      const result = await OzLivenessModule.startLivenessCheck();
      return result;
    } catch (error) {
      console.error('Liveness check failed:', error);
      throw error;
    }
  }

  // Verify face against reference
  async verifyFace(referenceImageBase64, capturedImageBase64) {
    try {
      const result = await OzLivenessModule.verifyFace(
        referenceImageBase64,
        capturedImageBase64
      );
      return result;
    } catch (error) {
      console.error('Face verification failed:', error);
      throw error;
    }
  }

  // Event listeners for real-time updates
  addEventListener(event, callback) {
    return this.eventEmitter.addListener(event, callback);
  }

  // Remove all listeners
  removeAllListeners() {
    this.eventEmitter.removeAllListeners();
  }

  // Check if SDK is available
  async isAvailable() {
    return await OzLivenessModule.isAvailable();
  }

  // Get SDK version
  async getVersion() {
    return await OzLivenessModule.getVersion();
  }
}

export default new OzLiveness();