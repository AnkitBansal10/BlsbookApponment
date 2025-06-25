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
    ScrollView
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
import CalenderTextinput from "../../../components/CalenderTextinput";
import PassportCountryDropdown from "../../../components/PassportCountryDropdown";
export default function SignUpScreen() {
      const [selectedPassportCountry, setSelectedPassportCountry] = useState('');
    const [name, setName] = useState("");
    console.log("name" + name)
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [FormattedPhone, setFormattedPhone] = useState("")
    const [checked, setChecked] = useState(false)
    const [dob, setDob] = useState('');

    const handleCountryChange = (country) => {
    setSelectedPassportCountry(country);
    console.log('Selected Passport Country:', country);
  };

    return (
        <View style={styles.container} >
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
                <Text style={styles.title}>Sign up now</Text>
                <Text style={styles.subtitle}>Please sign up to continue our app</Text>
            </View>
            <View style={styles.inputview}>
                <CustomTextInput
                    placeholder="Surname (Family Name)*"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputview}>
                <CustomTextInput
                    placeholder="First Name (Given Name)*"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputview}>
                <CustomTextInput
                    placeholder="Last Name*"
                    value={name}
                    onChangeText={setName}
                />
            </View>
              <View style={styles.inputview}>
                <CalenderTextinput
                    placeholder="Date of Birth*"
                   date={dob} setDate={setDob}
                />
                 </View>
                   <View style={styles.inputview}>
                   <PassportCountryDropdown />
                {/* <CustomTextInput
                    placeholder="Passport Number*"
                    value={name}
                    onChangeText={setName}
                /> */}
            </View>
             <View style={styles.inputview}>
                <CustomTextInput
                    placeholder="Passport Number*"
                    value={name}
                    onChangeText={setName}
                />
            </View>
             <View style={styles.inputview}>
               <PhoneInputField />
            </View>
             <View style={styles.inputview}>
                <CustomTextInput
                    placeholder="Email*"
                    value={name}
                    onChangeText={setName}
                />
            </View>
              <GDPRCheckbox checked={checked} onToggle={() => setChecked(!checked)} />
            <View style={[styles.inputview,{margin:0}]}>
                <CustomButton label="SING UP" onPress={() => Alert.alert('SING UP')} />
            </View>
            
            <View style={styles.singuptextview}>
                <Text style={styles.accountText}>
                    Already have an account{' '}
                    <Text style={styles.signUpText} >
                        Sign in
                    </Text>
                </Text>
            </View>
            </ScrollView>
        </View>

    );
}