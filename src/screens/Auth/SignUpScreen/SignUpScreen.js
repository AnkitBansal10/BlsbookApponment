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
    StatusBar,
    ScrollView,
    AccessibilityInfo
} from "react-native";
import { styles } from "./styles";
import { scale } from "../../../utils/responsive";
import SvgUri from 'react-native-svg-uri';
import CustomTextInput from "../../../components/CustomTextInput";
import PasswordInput from "../../../components/PasswordInput";
import CustomButton from "../../../components/CustomButton";
import AuthFooter from "../../../components/AuthFooter";
import PhoneInputField from "../../../components/PhoneInputField";
import GDPRCheckbox from "../../../components/GDPRCheckbox";
import { BlackLogo } from "../../../utils/Image";
import ContactCard from "../../../components/ContactCard";
import { BackgroundGradient } from "../../../utils/Image";
import { registerUser } from '../../../features/auth/authThunks';
import { useDispatch, useSelector } from 'react-redux';


import CalenderTextinput from "../../../components/CalenderTextinput";
import PassportCountryDropdown from "../../../components/PassportCountryDropdown";
export default function SignUpScreen({navigation}) {
      const [selectedPassportCountry, setSelectedPassportCountry] = useState('');
    const [first_name, setFirst_name] = useState("");
      const dispatch = useDispatch();
    AccessibilityInfo.announceForAccessibility('New content has loaded');

    // console.log("name" + name)
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [passport, setPassport] = useState("")
    const [checked, setChecked] = useState(false)
    const [dob, setDob] = useState('');

  console.log(mobile)


    const handleCountryChange = (country) => {
    setSelectedPassportCountry(country);
    console.log('Selected Passport Country:', country);
  };
 const handleLogin = async () => {
    console.log("hi")
  try {
   const { message } = await dispatch(registerUser({ first_name, email, mobile, passport })).unwrap();
    Alert.alert("Registration Successful", message);
    // navigation.navigate("BottomTab");
  } catch (error) {
    console.log("❌ Sign Up Error:", error);
    Alert.alert("Registration Error", error);
  }
};
    return (
        <View style={styles.container} accessible={true} >
            <ScrollView >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <BackgroundGradient
                style={{ position: "absolute", width: '100%', height: '100%' }}
            />
            <View style={styles.logo}>
                <BlackLogo
                    width={scale(95)}
                    height={scale(60)}
                    style={{
                        marginTop: scale(50)
                    }}
                />
            </View>
            <ContactCard />
            <View style={styles.titleTextView}>
                <Text style={styles.title}
                 accessibilityLabel="Welcome to our accessible application"
                  accessibilityRole="header"
                
                >Sign up now</Text>
                <Text style={styles.subtitle}>Please sign up to continue our app</Text>
            </View>
            <View style={styles.inputview}>
                <CustomTextInput
                    placeholder="First Name (Given Name)*"
                    value={first_name}
                    onChangeText={setFirst_name}
                    validationType={"name"}
                />
            </View>
            <View style={styles.inputview}>
                <CustomTextInput
                    placeholder="email*"
                    value={email}
                    onChangeText={setEmail}
                    validationType={"email"}
                />
            </View>
            <View style={styles.inputview}>
                {/* <CustomTextInput
                    placeholder="Last Name*"
                    value={mobile}
                    onChangeText={setMobile}
                /> */}
            </View>
              {/* <View style={styles.inputview}>
                <CalenderTextinput
                    placeholder="Date of Birth*"
                   date={dob} setDate={setDob}
                />
                 </View> */}
                   {/* <View style={styles.inputview}>
                   <PassportCountryDropdown />
                {/* <CustomTextInput
                    placeholder="Passport Number*"
                    value={name}
                    onChangeText={setName}
                /> */}
            {/* </View> */} 
             <View style={styles.inputview}>
                <CustomTextInput
                    placeholder="Passport Number*"
                    value={passport}
                    onChangeText={setPassport}
                />
            </View>
             <View style={styles.inputview}>
<PhoneInputField
  value={mobile}
  onChangeText={setMobile}
  showError={true}
/>  
            </View>
             {/* <View style={styles.inputview}>
                <CustomTextInput
                    placeholder="Email*"
                    value={name}
                    onChangeText={setName}
                />
            </View> */}
              <GDPRCheckbox checked={checked} onToggle={() => setChecked(!checked)} />
            <View style={[styles.inputview,{margin:0}]}>
                <CustomButton label="SING UP" onPress={handleLogin} />
            </View>
            
            <View style={styles.singuptextview}>
                <TouchableOpacity onPress={()=>navigation.navigate("SignIn")}>
                <Text style={styles.accountText}>
                    Already have an account{' '}
                    <Text style={styles.signUpText}   >
                        Sign in
                    </Text>
                </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>

    );
}