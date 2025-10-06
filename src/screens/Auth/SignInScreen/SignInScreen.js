import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { styles } from "./styles";
import { scale } from "../../../utils/responsive";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../features/auth/authThunks';
import CustomTextInput from "../../../components/CustomTextInput";
import PasswordInput from "../../../components/PasswordInput";
import CustomButton from "../../../components/CustomButton";
import AuthFooter from "../../../components/AuthFooter";
import { BlackLogo } from "../../../utils/Image";
import ContactCard from "../../../components/ContactCard";
import { BackgroundGradient } from "../../../utils/Image";
import MessagePopup from "../../../components/MessagePopup";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { validators } from "../../../utils/validation";

const SignInScreen = React.memo(({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  
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

  // Memoized validation function
  const validateForm = useCallback(() => {
    const errors = {};
    
    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (validators.email) {
      const emailError = validators.email.validate(email);
      if (emailError) errors.email = emailError;
    }
    
    // Password validation
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return errors;
  }, [email, password]);

  // Memoized popup show function
  const showPopup = useCallback((props) => {
    setPopupProps(prev => ({
      ...prev,
      ...props,
      visible: true
    }));
  }, []);

  // Enhanced login handler with client-side validation
  const handleLogin = useCallback(async () => {
    setHasAttemptedSubmit(true);
    
    // Client-side validation
    const errors = validateForm();
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      showPopup({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fix the errors below and try again.',
        duration: 3000
      });
      return;
    }

    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      
      // Clear any previous errors on success
      setValidationErrors({});
      setHasAttemptedSubmit(false);
      
      showPopup({
        type: 'success',
        title: 'Login Successful',
        message: response.message || 'Welcome back!',
        onClose: () => navigation.navigate("BottomTabScreen"),
        duration: 2000,
        showCloseButton: false
      });
    } catch (error) {
      // Handle server-side errors
      let errorMessage = 'An error occurred during login';
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.error) {
        errorMessage = error.error;
      }
      
      // Check for specific error types
      if (errorMessage.toLowerCase().includes('invalid credentials') || 
          errorMessage.toLowerCase().includes('unauthorized') ||
          errorMessage.toLowerCase().includes('wrong password') ||
          errorMessage.toLowerCase().includes('user not found')) {
        errorMessage = 'Invalid email or password. Please try again.';
      }
      
      showPopup({
        type: 'error',
        title: 'Login Failed',
        message: errorMessage,
        duration: 4000
      });
    }
  }, [email, password, dispatch, navigation, validateForm, showPopup]);

  // Memoized close popup handler
  const handleClosePopup = useCallback(() => {
    setPopupProps(prev => ({ ...prev, visible: false }));
    popupProps.onClose?.();
  }, [popupProps.onClose]);

  // Memoized background gradient style
  const backgroundGradientStyle = useMemo(() => ({
    position: "absolute", 
    width: '100%', 
    height: '100%'
  }), []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <BackgroundGradient style={backgroundGradientStyle} />
      
      <View style={styles.logo}>
        <BlackLogo
          width={scale(95)}
          height={scale(60)}
          style={{ marginTop: scale(50) }}
        />
      </View>
      
      <ContactCard />
      
      <View style={styles.titleTextView}>
        <Text style={styles.title}>Sign in now</Text>
        <Text style={styles.subtitle}>Please sign in to continue our app</Text>
      </View>
      
      <View style={styles.inputview}>
        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          validationType="email"
          externalError={hasAttemptedSubmit ? validationErrors.email : null}
          showValidationOnSubmit={false}
        />
        
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          validationRules={{
            minLength: 6,
            requireUppercase: false,
            requireNumber: false,
            requireSpecialChar: false
          }}
          externalError={hasAttemptedSubmit ? validationErrors.password : null}
          showValidationOnSubmit={false}
        />
        
        <View style={styles.forgetTextView}>
          <TouchableOpacity onPress={() => navigation.navigate("ForgetScreen")}>
            <Text style={styles.forgetText}>Forget Password ?</Text>
          </TouchableOpacity>
        </View>
        
        <CustomButton
          label="SIGN IN"
          onPress={handleLogin}
          loading={loading}
          loadingText="Signing in..."
        />
        
        <AuthFooter
          onSignUp={() => navigation.navigate('SignUpScreen')}
          onGoogle={() => console.log('Google')}
          onFacebook={() => console.log('Facebook')}
          onApple={() => console.log('Apple')}
        />
        
        <MessagePopup
          visible={popupProps.visible}
          type={popupProps.type}
          title={popupProps.title}
          message={popupProps.message}
          onClose={handleClosePopup}
          duration={popupProps.duration}
          showCloseButton={popupProps.showCloseButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
});

SignInScreen.displayName = 'SignInScreen';

export default SignInScreen;
