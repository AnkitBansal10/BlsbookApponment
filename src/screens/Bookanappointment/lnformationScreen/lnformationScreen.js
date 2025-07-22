import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Alert
} from "react-native";
import { styles } from "./styles";
import { BackgroundGradient } from "../../../utils/Image";
import ProfileMenuModal from "../../../components/ProfileMenuModal";
import ContactCard from "../../../components/ContactCard";
import StepIndicatorComponent from "../../../components/StepIndicatorComponent";
import { scale } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { getStoredAuthData } from "../../../features/auth/authService";
import { applicantdata, appointmentform } from "../../../features/auth/authThunks";
import CustomTextInput from "../../../components/CustomTextInput";
import PhoneInputField from "../../../components/PhoneInputField";
import CustomButton from "../../../components/CustomButton";
import CaptchaInput from "../../../components/CaptchaInput";
import ApplicantLastName from "../../../components/ApplicantLastName";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function InformationScreen({ navigation }) {
  const dispatch = useDispatch();
  const { ApplicationInfo, loading, error } = useSelector(state => state.auth);

  const [input, setInput] = useState("");
  const [formData, setFormData] = useState({
    uid: "",
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile_country_code: "",
    mobile_number: "",
    passport_no: ""
  });

  // Fetch auth data on mount
  useEffect(() => {
  const fetchAuthData = async () => {
    try {
      const authData = await getStoredAuthData();
      if (
        authData?.user?.email &&
        authData?.user?.passport_no &&
        !ApplicationInfo // 👈 Only fetch if ApplicationInfo not already available
      ) {
        await dispatch(applicantdata({
          email: authData.user.email,
          passport_no: authData.user.passport_no
        }));
      }
    } catch (error) {
      console.error("Failed to fetch applicant data:", error);
      Alert.alert('Error', 'Failed to load applicant data');
    }
  };
  fetchAuthData();
}, [dispatch]);

  // Update formData when ApplicationInfo changes
  useEffect(() => {
    if (ApplicationInfo) {
      setFormData({
        uid: ApplicationInfo?.uid || "",
        title: ApplicationInfo?.title || "",
        first_name: ApplicationInfo?.name || "",
        last_name: ApplicationInfo?.last_name || "",
        email: ApplicationInfo?.email || "",
        mobile_country_code: ApplicationInfo?.mobile_country_code || "",
        mobile_number: ApplicationInfo?.mobile_number || "",
        passport_no: ApplicationInfo?.passport_no || ""
      });
    }
  }, [ApplicationInfo]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = async () => {
    if (!input) {
      Alert.alert('Error', 'Please complete the captcha');
      return;
    }
    try {
      const result = await dispatch(appointmentform(formData)).unwrap();
      console.log("API Success Result:", result);
      // Navigate to next screen or show success message
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert('Error', error.message || 'Failed to submit form');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingBottom: scale(20) }}
        keyboardShouldPersistTaps="handled"
      >
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
            value={formData?.first_name}
            isOptional={true}
            onChangeText={(text) => handleInputChange('first_name', text)}
          />
          <CustomTextInput
            placeholder="Applicant Last Name"
            value={formData?.last_name}
            onChangeText={(text) => handleInputChange('last_name', text)}
          />
          <CustomTextInput
            placeholder="Email Address"
            isOptional={true}
            value={formData?.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <ApplicantLastName
            value={formData?.title}
            onChangeValue={(value) => handleInputChange('title', value)}
            placeholder="Applicant Title*"
          />
          <View style={{ right: "6%" }}>
            <PhoneInputField
              isOptional={true}
              editable={false}
              value={formData?.mobile_number}
              callingCodeCountry={formData.mobile_country_code?.slice(1)}
              selectedCountry={ApplicationInfo?.country}
            />
          </View>
        </View>
        
        <View style={{ marginTop: scale(6), marginBottom: scale(30), left: "3%" }}>
          <CaptchaInput value={input} onChange={setInput} />
        </View>
        <View style={{ marginBottom: scale(30) }}>
          <CustomButton 
            label="Continue" 
            onPress={handleLogin} 
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
}