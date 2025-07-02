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
import RNFetchBlob from 'rn-fetch-blob';
import PassportConfirmationModal from './PassportConfirmationModal';
import LoadingSpinner from '../../../../components/LoadingSpinner';


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
  

  const extractPassportData = async (imageUri) => {
    try {
      setIsLoadingData(true); 
      setIsVerifying(true);
      
      // Convert image to base64
      const base64Data = await RNFetchBlob.fs.readFile(imageUri, 'base64');
      
      // Prepare the request payload for Google Vision API
      const requestBody = {
        requests: [
          {
            image: {
              content: base64Data,
            },
            features: [
              {
                type: 'DOCUMENT_TEXT_DETECTION',
                maxResults: 1,
              },
            ],
          },
        ],
      };

      // Call Google Vision API
      const response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCw-DG5-XLza46W-vKFu3GFpdjomf3E2B0',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      console.log(data)
      
      if (data.responses && data.responses[0] && data.responses[0].fullTextAnnotation) {
        const text = data.responses[0].fullTextAnnotation.text;
        console.log("text"+data)
        const passportData = parsePassportText(text);
        setPassportData(passportData);
        setShowConfirmation(true);
        
        setExtractedData(passportData);
      //   if (onPassportDataExtracted) {
      //     onPassportDataExtracted(passportData);
      //   }
      // } else {
      //   Alert.alert('Error', 'Could not read passport information. Please try with a clearer image.');
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

  const parsePassportText = (text) => {
    // This is a simplified parser - you'll need to adjust based on actual passport formats
    const data = {
      surname: '',
      firstName: '',
      dateOfBirth: '',
      sex: '',
      nationality: '',
      placeOfBirth: '',
      dateOfIssue: '',
      dateOfExpiry: ''
    };

    console.log("data"+data)

    // Example parsing logic (will need to be customized for your passport format)
    const lines = text.split('\n');
    
    // Look for common patterns in passport text
    lines.forEach(line => {
      // Match surname/first name (common pattern: "Surname Given Names")
      if (line.match(/[A-Z<]{2,}/)) {
        const nameParts = line.split(/<+/).filter(part => part.trim());
        if (nameParts.length >= 2) {
          data.surname = nameParts[0].trim();
          data.firstName = nameParts.slice(1).join(' ').trim();
        }
      }
      
      // Match passport number (common pattern: "P<[A-Z]+<[A-Z]+")
      if (line.match(/P<[A-Z]+/)) {
        const parts = line.split('<');
        if (parts.length > 1) {
          data.surname = parts[1] || '';
          if (parts.length > 2) {
            data.firstName = parts.slice(2).join(' ').trim();
          }
        }
      }
      
      // Match dates (common formats: DD.MM.YYYY or YYYY-MM-DD)
      const dateMatch = line.match(/(\d{2}[./-]\d{2}[./-]\d{4})|(\d{4}[./-]\d{2}[./-]\d{2})/);
      if (dateMatch) {
        if (!data.dateOfBirth) {
          data.dateOfBirth = dateMatch[0];
        } else if (!data.dateOfIssue) {
          data.dateOfIssue = dateMatch[0];
        } else if (!data.dateOfExpiry) {
          data.dateOfExpiry = dateMatch[0];
        }
      }
      
      // Match sex (common patterns: "Sex M" or "F")
      const sexMatch = line.match(/Sex[:\s]*([MF])/i) || line.match(/\b([MF])\b/);
      if (sexMatch) {
        data.sex = sexMatch[1].toUpperCase();
      }
      
      // Match nationality (common pattern: "Nationality: USA")
      const nationalityMatch = line.match(/Nationality[:\s]*([A-Z]{2,3})/i);
      if (nationalityMatch) {
        data.nationality = nationalityMatch[1].toUpperCase();
      }
      
      // Match place of birth (common pattern: "Place of birth: CITY")
      const birthPlaceMatch = line.match(/Place of birth[:\s]*(.+)/i);
      if (birthPlaceMatch) {
        data.placeOfBirth = birthPlaceMatch[1].trim();
      }
    });

    return data;
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
      setSelectedImage(source);
      setIsVerifying(true);
      
      if (onImageSelected) {
        onImageSelected(response.assets[0].uri);
      }
      
      // Call the API to extract passport data
      extractPassportData(response.assets[0].uri);
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
    backgroundColor:colors.primary,
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

