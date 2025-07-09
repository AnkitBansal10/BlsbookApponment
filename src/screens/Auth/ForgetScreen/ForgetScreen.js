// src/screens/Auth/SignInScreen/SignInScreen.js
import React, { useState } from "react";
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

export default function ForgetScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    // try {
    //    const response = await dispatch(loginUser({ email, password })).unwrap();
    //     console.log("✅ Login Success:", response.message); 
    //      Alert.alert(response.message)
    //   navigation.navigate("BottomTab");
    // } catch (error) {
    //   Alert.alert(error)
    //  console.log(error) // Error is already handled by the thunk
    // }
  };
  return (
  <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
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
        <Text style={styles.title}>Forget Password</Text>
        <Text style={styles.subtitle}>Forget Password </Text>
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
        {/* <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        /> */}
        {/* <View style={styles.forgetTextView}>
          <TouchableOpacity>
            <Text style={styles.forgetText}>Forget Password ?</Text>
          </TouchableOpacity>
        </View> */}
        <CustomButton 
          label="SEND LINK" 
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />
        {/* <AuthFooter
          onSignUp={() => navigation.navigate('SignUpScreen')}
          onGoogle={() => console.log('Google')}
          onFacebook={() => console.log('Facebook')}
          onApple={() => console.log('Apple')}
        /> */}
      </View>
    </KeyboardAvoidingView>
  );
}