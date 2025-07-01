import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  Image, 
  ActionSheetIOS, 
  Platform, 
  Alert,
  Animated,
  Easing
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { scale } from '../../../../utils/responsive';
import { Poppins_Fonts } from '../../../../utils/fonts';
import { colors } from '../../../../utils/colors';
import * as ImagePicker from 'react-native-image-picker';
import { DeleteIcon, Refresh } from '../../../../utils/Image';

const screenWidth = Dimensions.get('window').width;

const UploadPassportPhoto = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const scanAnim = useRef(new Animated.Value(0)).current;
  const verifyAnim = useRef(new Animated.Value(0)).current;
  
  // Scanning animation (before image selection)
  useEffect(() => {
    if (isScanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      scanAnim.setValue(0);
    }
  }, [isScanning]);

  // Verification animation (after image selection)
  useEffect(() => {
    if (selectedImage && isVerifying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(verifyAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(verifyAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          })
        ]),
        { iterations: 3 } // Run the animation 3 times
      ).start(() => {
        setIsVerifying(false); // Stop verification after completion
      });
    }
  }, [selectedImage, isVerifying]);

  const handleImageUpload = () => {
    setIsScanning(true);
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          setIsScanning(false);
          if (buttonIndex === 1) {
            openCamera();
          } else if (buttonIndex === 2) {
            openImageLibrary();
          }
        }
      );
    } else {
      openImagePickerOptions();
    }
  };

  const openImagePickerOptions = () => {
    Alert.alert(
      'Select Option',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => openCamera() },
        { text: 'Gallery', onPress: () => openImageLibrary() },
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => setIsScanning(false)
        },
      ]
    );
  };

  const openCamera = () => {
    const options = {
      title: 'Take Passport Photo',
      mediaType: 'photo',
      cameraType: 'back',
      quality: 0.8,
      saveToPhotos: true,
    };

    ImagePicker.launchCamera(options, (response) => {
      setIsScanning(false);
      handleImageResponse(response);
    });
  };

  const openImageLibrary = () => {
    const options = {
      title: 'Select Passport Photo',
      mediaType: 'photo',
      quality: 0.8,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      setIsScanning(false);
      handleImageResponse(response);
    });
  };

  const handleImageResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.assets && response.assets[0]) {
      const source = { uri: response.assets[0].uri };
      setSelectedImage(source);
      setIsVerifying(true); // Start verification animation
      if (onImageSelected) {
        onImageSelected(response.assets[0].uri); 
      }
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setIsVerifying(false);
    if (onImageSelected) {
      onImageSelected(null);
    }
  };

  const handleReloadImage = () => {
    handleImageUpload();
  };

  // Scan line animation interpolation (before selection)
  const scanLinePosition = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  // Verification scan line animation (after selection)
  const verifyLinePosition = verifyAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={!selectedImage ? handleImageUpload : null}
      activeOpacity={0.8}
    >
      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Image source={selectedImage} style={styles.image} resizeMode="contain" />
          
          {/* Verification overlay (only shows when verifying) */}
          {isVerifying && (
            <View style={styles.verifyOverlay}>
              <Animated.View 
                style={[
                  styles.verifyLine,
                  { bottom: verifyLinePosition }
                ]} 
              />
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
              <View style={styles.verificationTextContainer}>
                <Text style={styles.verificationText}>Verifying Passport...</Text>
              </View>
            </View>
          )}
          
          <View style={styles.topRightIcons}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={handleReloadImage}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <Refresh width={scale(26)} height={scale(26)} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={handleDeleteImage}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <DeleteIcon width={scale(26)} height={scale(26)} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.innerContent}>
          {isScanning && (
            <View style={styles.scanOverlay}>
              <Animated.View 
                style={[
                  styles.scanLine,
                  { bottom: scanLinePosition }
                ]} 
              />
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
            </View>
          )}
          <View style={styles.iconWrapper}>
            <Feather name="upload" size={20} color={colors.borderColor} />
          </View>
          <Text style={styles.text}>
            Click here to upload the passport photograph
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 8,
    height: scale(450),
    width: "90%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
    position: 'relative',
  },
  innerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: '100%',
  },
  iconWrapper: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  text: {
    color: colors.commonTextColor,
    fontSize: scale(13),
    fontFamily: Poppins_Fonts.Poppins_Medium,
    textAlign: 'center',
    lineHeight: 20,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  topRightIcons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    borderRadius: 20,
    padding: 8,
    gap: 8,
    zIndex: 2, // Ensure icons stay above overlay
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
  },
  verifyOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanLine: {
    position: 'absolute',
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(0, 255, 0, 0.8)',
  },
  verifyLine: {
    position: 'absolute',
    height: 3,
    width: '100%',
    backgroundColor: 'rgba(0, 200, 255, 0.9)',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: '#00FF00',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: '#00FF00',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#00FF00',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#00FF00',
  },
  verificationTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  verificationText: {
    color: 'white',
    fontSize: scale(14),
    fontFamily: Poppins_Fonts.Poppins_SemiBold,
  },
});

export default UploadPassportPhoto;