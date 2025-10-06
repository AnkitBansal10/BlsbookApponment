import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  AccessibilityInfo
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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

const SignUpScreen = React.memo(({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  
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
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
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

  // Memoized popup show function
  const showPopup = useCallback((props) => {
    setPopupProps(prev => ({
      ...prev,
      ...props,
      visible: true
    }));
  }, []);

  // Memoized close popup handler
  const handleClosePopup = useCallback(() => {
    setPopupProps(prev => ({ ...prev, visible: false }));
    popupProps.onClose?.();
  }, [popupProps.onClose]);

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility("Registration form loaded");
  }, []);

  // Enhanced submit handler with better error handling
  const onSubmit = useCallback(async (data) => {
    setHasAttemptedSubmit(true);
    
    try {
      const response = await dispatch(registerUser(data)).unwrap();
      
      // Clear any previous errors on success
      clearErrors();
      setHasAttemptedSubmit(false);
      
      showPopup({
        type: 'success',
        title: 'Registration Successful',
        message: response.message || 'Account created successfully! Please sign in.',
        onClose: () => navigation.navigate("SignIn"),
        duration: 3000,
        showCloseButton: false
      });
    } catch (error) {
      // Handle specific field errors from server
      if (error.errors && typeof error.errors === 'object') {
        let hasFieldErrors = false;
        for (let key in error.errors) {
          if (error.errors[key]) {
            setError(key, { 
              type: "server", 
              message: Array.isArray(error.errors[key]) 
                ? error.errors[key][0] 
                : error.errors[key] 
            });
            hasFieldErrors = true;
          }
        }
        
        if (hasFieldErrors) {
          showPopup({
            type: "error",
            title: "Validation Error",
            message: "Please fix the errors below and try again.",
            duration: 3000
          });
          return;
        }
      }

      // Handle common server errors
      let errorMessage = 'An error occurred during registration';
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      // Handle specific error cases
      if (errorMessage.toLowerCase().includes("email already exists") ||
          errorMessage.toLowerCase().includes("email is already taken")) {
        setError("email", {
          type: "server",
          message: "This email is already registered. Please use a different email or sign in."
        });
        showPopup({
          type: "error",
          title: "Email Already Exists",
          message: "This email is already registered. Please use a different email or sign in.",
          duration: 4000
        });
        return;
      }

      if (errorMessage.toLowerCase().includes("passport") && 
          errorMessage.toLowerCase().includes("already")) {
        setError("passport", {
          type: "server",
          message: "This passport number is already registered."
        });
      }

      // Fallback popup for general errors
      showPopup({
        type: "error",
        title: "Registration Failed",
        message: errorMessage,
        duration: 4000
      });
    }
  }, [dispatch, navigation, showPopup, setError, clearErrors]);

  // Memoized background gradient style
  const backgroundGradientStyle = useMemo(() => ({
    position: "absolute", 
    width: "100%", 
    height: "100%"
  }), []);

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
        onClose={handleClosePopup}
      />
    </View>
  );
});

SignUpScreen.displayName = 'SignUpScreen';

export default SignUpScreen;
