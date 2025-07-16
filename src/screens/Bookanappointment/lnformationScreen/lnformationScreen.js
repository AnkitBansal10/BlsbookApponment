import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { styles } from "./styles";
import { BackgroundGradient } from "../../../utils/Image";
import ProfileMenuModal from "../../../components/ProfileMenuModal";
import ContactCard from "../../../components/ContactCard";
import StepIndicatorComponent from "../../../components/StepIndicatorComponent";
import { scale } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { applicantdata, appointmentform } from "../../../features/auth/authThunks";
import CustomTextInput from "../../../components/CustomTextInput";
import PhoneInputField from "../../../components/PhoneInputField";
import CustomButton from "../../../components/CustomButton";
import CaptchaInput from "../../../components/CaptchaInput";
import ApplicantLastName from "../../../components/ApplicantLastName";
import MessagePopup from "../../../components/MessagePopup";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function InformationScreen({ navigation }) {
  const dispatch = useDispatch();
  const { applicantinfo, loading, error } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    uid: '8opI',
    title: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile_country_code: '+1',
    mobile_number: '',
    passport_no: ''
  });
  
  const [input, setInput] = useState('');
  const [popupProps, setPopupProps] = useState({
    visible: false,
    type: 'info',
    title: '',
    message: '',
    onClose: () => {},
    duration: null,
    showCloseButton: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(applicantdata({})).unwrap();
        console.log("API Response:", response.data);
        if (response.data) {
          setFormData({
            ...formData,
            first_name: response.data.name || '',
            email: response.data.email || '',
            mobile_country_code: response.data.mobile_country_code || '+1',
            mobile_number: response.data.mobile_number || '',
            country: response.data.country || '',
            passport_no: response.data.passport_no || ''
          });
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        showPopup({
          type: 'error',
          title: 'Error',
          message: 'Failed to fetch applicant data',
          duration: 3000
        });
      }
    };
    
    fetchData();
  }, [dispatch]);

  const showPopup = (props) => {
    setPopupProps(prev => ({
      ...prev,
      ...props,
      visible: true
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleLogin = async () => {
    if (!input) {
      showPopup({
        type: 'error',
        title: 'Validation Error',
        message: 'Please complete the captcha',
        duration: 3000
      });
      return;
    }

    try {
      const result = await dispatch(appointmentform(formData)).unwrap();
      console.log("API Success Result:", result);
      
      showPopup({
        type: 'success',
        title: 'Success',
        message: result?.message || result || 'Registration successful',
        duration: 3000,
        onClose: () => {
          // Optional: Navigate to next screen after successful registration
          // navigation.navigate('NextScreen');
        }
      });
    } catch (error) {
      console.log("API Error Full:", error);
      console.log("Error Payload:", error.payload);
      console.log("Error Message:", error.message);
      
      showPopup({
        type: 'error',
        title: 'Error',
        message: error,
        duration: 3000
      });
    }
  };

  if (loading) {
    return (
  <LoadingSpinner />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <BackgroundGradient
          style={{ position: "absolute", width: '100%', height: '100%' }}
        />
        <View style={styles.logo}>
          <ProfileMenuModal />
        </View>
        <ContactCard />
        <StepIndicatorComponent currentStep={1} />
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: scale(20) }}>
          <Text style={styles.title}>Information</Text>
          <Text style={styles.subtitle}>Appointment Booking Form</Text>
        </View>
        <View style={[styles.inputview, { marginTop: scale(40) }]}>
          <CustomTextInput
            placeholder="Applicant First Name"
            value={formData.first_name}
            isOptional={true}
            onChangeText={(text) => handleInputChange('first_name', text)}
          />
          <CustomTextInput
            placeholder="Applicant Last Name"
            value={formData.last_name}
            onChangeText={(text) => handleInputChange('last_name', text)}
          />
          <CustomTextInput
            placeholder="Email Address"
            isOptional={true}
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <ApplicantLastName
            value={formData.title}
            onChangeValue={(value) => handleInputChange('title', value)}
            placeholder="Applicant Title*"
          />
          <View style={{ right: "6%" }}>
            <PhoneInputField
              isOptional={true}
              editable={false}
              value={formData.mobile_number}
              callingCodeCountry={formData.mobile_country_code?.slice(1)}
              selectedCountry={formData.country}
            />
          </View>
        </View>
        <View style={{ marginTop: 6, marginBottom: 30, left: "3%" }}>
          <CaptchaInput value={input} onChange={setInput} />
        </View>
        <View style={{ marginBottom: 30 }}>
          <CustomButton label="Continue" onPress={handleLogin} />
        </View>
      </ScrollView>
      
      <MessagePopup
        visible={popupProps.visible}
        type={popupProps.type}
        title={popupProps.title}
        message={popupProps.message}
        onClose={() => {
          setPopupProps(prev => ({ ...prev, visible: false }));
          popupProps.onClose?.();
        }}
        duration={popupProps.duration}
        showCloseButton={popupProps.showCloseButton}
      />
    </View>
  );
}