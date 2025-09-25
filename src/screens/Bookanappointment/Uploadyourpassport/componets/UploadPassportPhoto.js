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
import PassportConfirmationModal from './PassportConfirmationModal';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { s3 } from '../../../../api/aws-config';






const screenWidth = Dimensions.get('window').width;

const UploadPassportPhoto = ({ onImageSelected, onPassportConfirmed }) => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const scanAnim = useRef(new Animated.Value(0)).current;
  const verifyAnim = useRef(new Animated.Value(0)).current;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [passportData, setPassportData] = useState({
    surname: '',
    firstName: '',
    dateOfBirth: '',
    sex: '',
    nationality: '',
    placeOfBirth: '',
    dateOfIssue: '',
    dateOfExpiry: ''
  });

  const extractPassportData = async (fileName, documentType) => {
    try {
      setIsLoadingData(true);
      setIsVerifying(true);

      const response = await fetch(
        'https://7prnhdh8pk.execute-api.ap-south-1.amazonaws.com/Test/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: fileName,
            documentType: documentType,
          }),
        }
      );
      const data = await response.json();
      console.log("API Response:", data);
      // Helper function to extract the actual value from nested structure
      const extractValue = (field) => {
        if (!field) return '';
        // Handle nested value structure: field.value.value or field.value
        if (field.value && typeof field.value === 'object' && field.value.value) {
          return field.value.value || '';
        }
        return field.value || '';
      };

      if (data.body && data.body.passport_details) {
        const rawPassportData = data.body.passport_details;

        // Transform the nested API data to match your state structure
        const transformedData = {
          surname: extractValue(rawPassportData.surname),
          firstName: extractValue(rawPassportData.given_name), // Map given_name to firstName
          dateOfBirth: extractValue(rawPassportData.date_of_birth),
          sex: '', // Not present in API response, keep empty or extract from another field
          nationality: extractValue(rawPassportData.nationality),
          placeOfBirth: extractValue(rawPassportData.place_of_birth),
          dateOfIssue: extractValue(rawPassportData.date_of_issue),
          dateOfExpiry: extractValue(rawPassportData.date_of_expiry)
        };

        console.log("Transformed Passport Data:", transformedData);
        setPassportData(transformedData);
        setShowConfirmation(true);
        setExtractedData(transformedData);
      }
      else if (data.passport_details) {
        const rawPassportData = data.passport_details;

        const transformedData = {
          surname: extractValue(rawPassportData.surname),
          firstName: extractValue(rawPassportData.given_name),
          dateOfBirth: extractValue(rawPassportData.date_of_birth),
          sex: '',
          nationality: extractValue(rawPassportData.nationality),
          placeOfBirth: extractValue(rawPassportData.place_of_birth),
          dateOfIssue: extractValue(rawPassportData.date_of_issue),
          dateOfExpiry: extractValue(rawPassportData.date_of_expiry)
        };

        console.log("Transformed Passport Data:", transformedData);
        setPassportData(transformedData);
        setShowConfirmation(true);
        setExtractedData(transformedData);
      }
      else {
        Alert.alert('Error', 'Could not read passport information. Please try with a clearer image.');
      }
    } catch (error) {
      console.error('Error calling Google Vision API:', error);
      Alert.alert('Error', 'Failed to process passport image. Please try again.');
    } finally {
      setIsVerifying(false);
      setIsLoadingData(false);
    }
  };


  const handleConfirm = () => {
    setShowConfirmation(false);
    if (onPassportConfirmed) {
      onPassportConfirmed(passportData);
    }
  };

  const handleEditField = (field) => {
    // Implement your edit functionality here
    // Could open another modal or input for editing the specific field
    console.log(`Editing field: ${field}`);
  };

  useEffect(() => {
    if (isScanning) {
      Animated.loop(
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      scanAnim.setValue(0);
      Animated.timing(scanAnim).stop();
    }
  }, [isScanning]);

  // Verification animation
  useEffect(() => {
    if (isVerifying) {
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
        { iterations: 3 }
      ).start(() => {
        setIsVerifying(false);
      });
    } else {
      verifyAnim.setValue(0);
      Animated.timing(verifyAnim).stop();
    }
  }, [isVerifying]);

  // Animation interpolations
  const scanLineTranslateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('window').height]
  });

  const verifyLineTranslateY = verifyAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('window').height]
  });


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
      console.log("source" + source)
      setSelectedImage(source);
      uploadImage(response.assets[0].uri)
      setIsVerifying(true);
      if (onImageSelected) {
        console.log(response.assets[0].uri + "response.assets[0].uri")
        onImageSelected(response.assets[0].uri);
      }
    }
  };


  // uploading the image in s3 bucket 
  const uploadImage = async (source) => {
    console.log("imageget ", source)
    if (!source) {
      Alert.alert("No image selected!");
      return;
    }
    try {
      const response = await fetch(source);
      const blob = await response.blob();
      const fileName = `uploads/${Date.now()}.jpg`;
      const params = {
        Key: fileName,
        Body: blob,
        ContentType: "image/jpeg",
      };
      s3.upload(params, async (err, data) => {
        if (err) {
          console.log("Upload Error:", err);
          Alert.alert("Upload Failed", err.message);
        } else {
          console.log("Upload Success:", data.Location);
          // 🔹 Call processDocument API with fileName & documentType
          try {
            const result = await extractPassportData(fileName, "passport");
            console.log("Document Process Result:", result);
            Alert.alert("Success", "Document processed successfully!");
          } catch (apiError) {
            console.log("API Error:", apiError);
            Alert.alert("Error", "Failed to process document");
          }
        }
      });
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", error.message);
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

          {isVerifying && (
            <View style={styles.verifyOverlay}>
              <Animated.View
                style={[
                  styles.verifyLine,
                  { transform: [{ translateY: verifyLineTranslateY }] }
                ]}
              />
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
              <View style={styles.verificationTextContainer}>
                <Text style={styles.verificationText}>
                  {extractedData ? 'Passport Verified' : 'Verifying Passport...'}
                </Text>
              </View>
            </View>
          )}

          <PassportConfirmationModal
            visible={showConfirmation}
            data={passportData}
            onConfirm={handleConfirm}
            onEdit={handleEditField}
            isLoading={isLoadingData}
          />

          <View style={styles.topRightIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleReloadImage}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Refresh width={scale(26)} height={scale(26)} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleDeleteImage}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
                  { transform: [{ translateY: scanLineTranslateY }] }
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
  extractedDataContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
  },
  extractedDataText: {
    color: 'white',
    fontSize: scale(12),
    fontFamily: Poppins_Fonts.Poppins_Regular,
    marginVertical: 2,
  },
  scanLine: {
    position: 'absolute',
    height: 2,
    width: '100%',
    backgroundColor: colors.primary,
    top: 0,
    left: 0,
  },
  verifyLine: {
    position: 'absolute',
    height: 3,
    width: '100%',
    backgroundColor: 'rgba(0, 200, 255, 0.9)',
    top: 0,
    left: 0,
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
  },
});

export default UploadPassportPhoto;

