
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ActionSheetIOS, Platform, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { scale } from '../../../../utils/responsive';
import { Poppins_Fonts } from '../../../../utils/fonts';
import { colors } from '../../../../utils/colors';
import * as ImagePicker from 'react-native-image-picker';
import { DeleteIcon, Refresh } from '../../../../utils/Image';

const screenWidth = Dimensions.get('window').width;

const UploadPassportPhoto = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Selfie', 'Choose from Library'],
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
      openImagePickerOptions();
    }
  };

  const openImagePickerOptions = () => {
    Alert.alert(
      'Select Option',
      'Choose an option',
      [
        { text: 'Take Selfie', onPress: () => openCamera() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };
  const openCamera = () => {
    const options = {
      title: 'Take Selfie',
      mediaType: 'photo',
      cameraType: 'front', // Force front camera
      quality: 0.8,
      saveToPhotos: true,
    };
    ImagePicker.launchCamera(options, (response) => {
      handleImageResponse(response);
    });
  };

  const openImageLibrary = () => {
    const options = {
      title: 'Select Photo',
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
      if (onImageSelected) {
        onImageSelected(response.assets[0].uri);
      }
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    if (onImageSelected) {
      onImageSelected(null);
    }
  };

  const handleReloadImage = () => {
    handleImageUpload();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={!selectedImage ? handleImageUpload : null}
      activeOpacity={0.8}
    >
      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Image source={selectedImage} style={styles.image} resizeMode="contain" />
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
          <View style={styles.iconWrapper}>
            <Feather name="upload" size={20} color={colors.borderColor} />
          </View>
          <Text style={styles.text}>
            Click here to take your selfie (front camera will be used)
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
    padding: 20,
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
  },
  iconButton: {
    // Styles for your icon buttons
  },
});

export default UploadPassportPhoto;