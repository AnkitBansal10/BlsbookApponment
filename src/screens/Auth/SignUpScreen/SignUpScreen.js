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
import PassportCountryDropdown from "../../../components/PassportCountryDropdown";
import MessagePopup from "../../../components/MessagePopup";
export default function SignUpScreen({ navigation }) {
    const [selectedPassportCountry, setSelectedPassportCountry] = useState('');
    const [first_name, setFirst_name] = useState("");
    const dispatch = useDispatch();
    AccessibilityInfo.announceForAccessibility('New content has loaded');
    // console.log("name" + name)
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [passport, setPassport] = useState("")
    const [checked, setChecked] = useState(false)
    const [countryId, setCountryId] = useState()
    const [dob, setDob] = useState('');
    const [country, setCountry] = useState("IN")
   const [callingCodeCountry,setcallingCodeCountry] =useState("91")
   const [nationality_id,setnationality_id] =useState("")
   const [country_id,setcountry_id]=useState("")

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
            const { message } = await dispatch(registerUser({ first_name, email, mobile, passport ,nationality_id,country_id})).unwrap();
             showPopup({
      type: 'success',
      title: 'RegisterUser Successful',
      onClose: () => navigation.navigate("SignIn"),
      message: message,
      duration: 20000,
      showCloseButton: false
    });
  } catch (error) {
    showPopup({
      type: 'error',
      title: 'RegisterUser Failed',
      message:error|| 'An error occurred during login',
      duration: 3000
    });
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
                        placeholder="Email*"
                        value={email}
                        onChangeText={setEmail}
                        validationType={"email"}
                    />
                </View>
                <View style={[styles.inputview, { marginBottom: 20, justifyContent: "center", alignItems: "center", marginLeft: 20 }]}>
                    <PassportCountryDropdown
                        label="Select Nationality"
                         onValueChange={(selected) => {
                                setcountry_id(selected?.id);
                            }}
                    />
                </View>
                <View style={styles.inputview}>
                    <View style={[styles.inputview, { marginBottom: 20, justifyContent: "center", alignItems: "center", marginLeft: 34 }]}>
                        <PassportCountryDropdown
                            onValueChange={(selected) => {
                                setCountryId(selected?.id);
                                setnationality_id(selected?.id)
                                setCountry(selected?.iso);
                                setcallingCodeCountry(selected?.phonecode)
                            }}
                            label="Select County Applying from"
                        />
                    </View>
                </View>
                <View style={styles.inputview}>
                    <CustomTextInput
                        placeholder="Passport Number*"
                        value={passport}
                        onChangeText={setPassport}
                        // validationType={"passport"}
                    />
                </View>
                <View style={styles.inputview}>
                    <PhoneInputField
                        value={mobile}
                        onChangeText={setMobile}
                        showError={true}
                        callingCodeCountry={callingCodeCountry}
                        selectedCountry={country} // Controlled from parent
                        onCountryChange={setCountry} // Get updates when country changes
                    />
                </View>
                <GDPRCheckbox checked={checked} onToggle={() => setChecked(!checked)} />
                <View style={[styles.inputview, { margin: 0 }]}>
                    <CustomButton label="SING UP" onPress={handleLogin} />
                </View>

                <View style={styles.singuptextview}>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                        <Text style={styles.accountText}>
                            Already have an account{' '}
                            <Text style={styles.signUpText}   >
                                Sign in
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    );
}