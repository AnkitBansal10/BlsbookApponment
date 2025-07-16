// src/screens/Auth/SignInScreen/SignInScreen.js
import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
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

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [popupVisible, setPopupVisible] = useState(false);
const [popupProps, setPopupProps] = useState({
  visible: false,
  type: 'info',
  title: '',
  message: '',
  onClose: () => {},
  duration: null,
  showCloseButton: true
});

const showPopup = (props) => {
  setPopupProps({
    ...popupProps,
    ...props,
    visible: true
  });
};


const handleLogin = async () => {
  try {
    const response = await dispatch(loginUser({ email, password })).unwrap(); 
    showPopup({
      type: 'success',
      title: 'Login Successful',
      message: response.message,
      // onClose: () => navigation.navigate("BottomTab"),
      duration: 5000,
      showCloseButton: false
    });
  } catch (error) {
    showPopup({
      type: 'error',
      title: 'Login Failed',
      message:error|| 'An error occurred during login',
      duration: 3000
    });
  }
};

  // const handleLogin = async () => {
  //   try {
  //     const response = await dispatch(loginUser({ email, password })).unwrap();
  //     console.log("✅ Login Success:", response.message);
  //     Alert.alert(response.message)
  //     navigation.navigate("BottomTab");
  //   } catch (error) {
  //     Alert.alert(error)
  //     console.log(error) // Error is already handled by the thunk
  //   }
  // };
  return (
    <KeyboardAvoidingView
      style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <BackgroundGradient
        style={{ position: "absolute", width: '100%', height: '100%' }}
      />
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
        />
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          validationRules={{
            minLength: 6,
            requireUppercase: false,
            requireNumber: true,
            requireSpecialChar: false
          }}
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
          loadingText="Processing..."
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
  onClose={() => {
    setPopupProps({...popupProps, visible: false});
    popupProps.onClose?.();
  }}
  duration={popupProps.duration}
  showCloseButton={popupProps.showCloseButton}
/>

      </View>
    </KeyboardAvoidingView>
  );
}