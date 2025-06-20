import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StatusBar
} from "react-native";
import { styles } from "./styles";
import { scale } from "../../../utils/responsive";
import SvgUri from 'react-native-svg-uri';
import CustomTextInput from "../../../components/CustomTextInput";
import PasswordInput from "../../../components/PasswordInput";
import CustomButton from "../../../components/CustomButton";
import AuthFooter from "../../../components/AuthFooter";
import { onFacebookButtonPress,onGoogleButtonPress } from "../../../features/auth/onGoogleButtonPress";
import { colors } from "../../../utils/colors";
import { Logo } from "../../../utils/Image";

export default function SignInScreen({navigation}) {
  const [name, setName] = useState("");
  console.log("name"+name)
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <View style={styles.logo}>
        <Logo
          width={scale(120)}
          height={scale(120)}
        />
      </View>
      <View style={styles.titleTextView}>
        <Text style={styles.title}>Sign in now</Text>
        <Text style={styles.subtitle}>Please sign in to continue our app</Text>
      </View>
      <View style={styles.inputview}>
        <CustomTextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputview}>
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
        <View style={styles.forgetTextView}>
          <TouchableOpacity>
            <Text style={styles.forgetText}>Forget Password ?</Text>
          </TouchableOpacity>
        </View>
        <CustomButton label="SING IN" onPress={()=>navigation.navigate("BottomTab")} />
        <AuthFooter
          onSignUp={() => navigation.navigate('SignUp')}
          onGoogle={()=> navigation.navigate("BottomTab")}
          onFacebook={()=>navigation.navigate("BottomTab")}
          onApple={() => console.log('Apple')}
        />
      </View>
    </View>
  );
}