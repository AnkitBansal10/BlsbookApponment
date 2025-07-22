import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  AccessibilityInfo
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import { styles } from "./styles";
import { scale } from "../../../utils/responsive";
import { registerUser } from "../../../features/auth/authThunks";

import CustomTextInput from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import PhoneInputField from "../../../components/PhoneInputField";
import GDPRCheckbox from "../../../components/GDPRCheckbox";
import PassportCountryDropdown from "../../../components/PassportCountryDropdown";
import MessagePopup from "../../../components/MessagePopup";
import ContactCard from "../../../components/ContactCard";
import { BlackLogo, BackgroundGradient } from "../../../utils/Image";

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const [popupProps, setPopupProps] = useState({
    visible: false,
    type: 'info',
    title: '',
    message: '',
    onClose: () => { },
    duration: null,
    showCloseButton: true
  });

  const [callingCodeCountry, setCallingCodeCountry] = useState("91");
  const [country, setCountry] = useState("IN");

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      first_name: "",
      email: "",
      passport: "",
      mobile: "",
      nationality_id: "",
      country_id: "",
      gdpr: false,
    }
  });

  const showPopup = (props) => {
    setPopupProps(prev => ({
      ...prev,
      ...props,
      visible: true
    }));
  };

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility("New content has loaded");
  }, []);

  const onSubmit = async (data) => {
  try {
    const { message } = await dispatch(registerUser(data)).unwrap();
    showPopup({
      type: 'success',
      title: 'Registration Successful',
      onClose: () => navigation.navigate("SignIn"),
      message: message,
      duration: 2000,
      showCloseButton: false
    });
  } catch (error) {
    // Handle specific field errors
    if (error.errors) {
      for (let key in error.errors) {
        setError(key, { type: "manual", message: error.errors[key] });
      }
      return;
    }

    // Handle common case: email already exists
    if (
      error.message &&
      error.message.toLowerCase().includes("email already exists")
    ) {
      setError("email", {
        type: "manual",
        message: "Email already exists"
      });
      return;
    }

    // Fallback popup
    showPopup({
      type: "error",
      title: "Registration Failed",
      message: error.message || "An error occurred during registration",
      duration: 3000
    });
  }
};

  return (
    <View style={styles.container} accessible={true}>
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <BackgroundGradient style={{ position: "absolute", width: "100%", height: "100%" }} />

        <View style={styles.logo}>
          <BlackLogo width={scale(95)} height={scale(60)} style={{ marginTop: scale(50) }} />
        </View>

        <ContactCard />

        <View style={styles.titleTextView}>
          <Text style={styles.title}>Sign up now</Text>
          <Text style={styles.subtitle}>Please sign up to continue our app</Text>
        </View>

        <View style={styles.inputview}>
          <Controller
            control={control}
            name="first_name"
            rules={{ required: "First name is required" }}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                placeholder="First Name (Given Name)*"
                value={value}
                onChangeText={onChange}
                externalError={errors.first_name?.message}
              />
            )}
          />
        </View>

        <View style={styles.inputview}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address"
              }
            }}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                placeholder="Email*"
                value={value}
                onChangeText={onChange}
                externalError={errors.email?.message}
              />
            )}
          />
        </View>

        <View style={[styles.inputview, { marginLeft: 20 ,marginBottom:20}]}>
          <Controller
            control={control}
            name="nationality_id"
            rules={{ required: "Please select nationality" }}
            render={({ field: { onChange } }) => (
              <PassportCountryDropdown
                label="Select Nationality"
                onValueChange={(selected) => onChange(selected?.id)}
                error={errors.nationality_id?.message}
              />
            )}
          />
        </View>

        <View style={[styles.inputview, { marginLeft: 20 ,marginBottom:20 }]}>
          <Controller
            control={control}
            name="country_id"
            rules={{ required: "Please select country" }}
            render={({ field: { onChange } }) => (
              <PassportCountryDropdown
                label="Select Country Applying From"
                onValueChange={(selected) => {
                  onChange(selected?.id);
                  setCountry(selected?.iso);
                  setCallingCodeCountry(selected?.phonecode);
                }}
                error={errors.country_id?.message}
              />
            )}
          />
        </View>

        <View style={styles.inputview}>
          <Controller
            control={control}
            name="passport"
            rules={{ required: "Passport number is required" }}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                placeholder="Passport Number*"
                value={value}
                onChangeText={onChange}
                externalError={errors.passport?.message}
              />
            )}
          />
        </View>

        <View style={styles.inputview}>
          <Controller
            control={control}
            name="mobile"
            rules={{ required: "Mobile number is required" }}
            render={({ field: { onChange, value } }) => (
              <PhoneInputField
                value={value}
                onChangeText={onChange}
                showError={!!errors.mobile}
                errorMessage={errors.mobile?.message}
                callingCodeCountry={callingCodeCountry}
                selectedCountry={country}
                onCountryChange={setCountry}
              />
            )}
          />
        </View>

        <Controller
          control={control}
          name="gdpr"
          rules={{ required: "You must accept the terms and conditions" }}
          render={({ field: { onChange, value } }) => (
            <GDPRCheckbox
              checked={value}
              onToggle={() => onChange(!value)}
              error={errors.gdpr?.message}
            />
          )}
        />

        <View style={styles.inputview}>
          <CustomButton label="SIGN UP" onPress={handleSubmit(onSubmit)} />
        </View>

        <View style={styles.singuptextview}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.accountText}>
              Already have an account? <Text style={styles.signUpText}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <MessagePopup
        {...popupProps}
        onClose={() => {
          setPopupProps(prev => ({ ...prev, visible: false }));
          popupProps.onClose?.();
        }}
      />
    </View>
  );
}
