// components/UploadPassportPhoto.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ActionSheetIOS, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { scale } from '../../../../utils/responsive';
import { Poppins_Fonts } from '../../../../utils/fonts';
import { colors } from '../../../../utils/colors';
import * as ImagePicker from 'react-native-image-picker';

const screenWidth = Dimensions.get('window').width;
const percentageWidth = (550 / screenWidth) * 100;

const UploadPassportPhoto = ({ onPress }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            openCamera();
          } else if (buttonIndex === 2) {
            openImageLibrary();
          }
        }
      );
    } else {
      // For Android, we'll use a simple alert or implement a custom modal
      openImagePickerOptions();
    }
  };

  const openImagePickerOptions = () => {
    // You can implement a custom modal for Android here
    // For now, we'll default to opening the camera directly on Android
    openCamera();
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
      if (onPress) {
        onPress(source);
      }
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleImageUpload}>
      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Image source={selectedImage} style={styles.image} resizeMode="contain" />
          <View style={styles.overlay}>
            <Feather name="camera" size={20} color="white" />
            <Text style={styles.overlayText}>Change Photo</Text>
          </View>
        </View>
      ) : (
        <View style={styles.innerContent}>
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
  },
  innerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  text: {
    color: colors.commonTextColor,
    fontSize: scale(11),
    fontFamily: Poppins_Fonts.Poppins_Medium,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    marginLeft: 8,
    fontSize: scale(11),
    fontFamily: Poppins_Fonts.Poppins_Medium,
  },
});

export default UploadPassportPhoto;