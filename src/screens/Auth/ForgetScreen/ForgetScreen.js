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
import { ForgetPassword} from '../../../features/auth/authThunks';
import CustomTextInput from "../../../components/CustomTextInput";
import PasswordInput from "../../../components/PasswordInput";
import CustomButton from "../../../components/CustomButton";
import { BlackLogo } from "../../../utils/Image";
import ContactCard from "../../../components/ContactCard";
import { BackgroundGradient } from "../../../utils/Image";

export default function ForgetScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

   console.log(email)
    console.log(password)

  const handleLogin = async () => {

    try {
       const response = await dispatch(ForgetPassword({ email, password })).unwrap();
        console.log("✅ Login Success:", response.message); 
         Alert.alert(response.message)
      // navigation.navigate("BottomTab");
    } catch (error) {
      Alert.alert(error)
     console.log(error) // Error is already handled by the thunk
    }
  };
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
        <Text style={styles.title}>Forget Password</Text>
        <Text style={styles.subtitle}>Set New Password</Text>
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
        />
         {/* <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Confirm Password"
        /> */}

        <CustomButton 
          label="SEND LINK" 
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}