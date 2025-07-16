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
import CustomTextInput from "../../../components/CustomTextInput";
import CustomButton from "../../../components/CustomButton";
import PhoneInputField from "../../../components/PhoneInputField";
import GDPRCheckbox from "../../../components/GDPRCheckbox";
import { BlackLogo } from "../../../utils/Image";
import ContactCard from "../../../components/ContactCard";
import { BackgroundGradient } from "../../../utils/Image";
import { registerUser } from '../../../features/auth/authThunks';
import { useDispatch, } from 'react-redux';
import PassportCountryDropdown from "../../../components/PassportCountryDropdown";
import MessagePopup from "../../../components/MessagePopup";

export default function SignUpScreen({ navigation }) {
    const [selectedPassportCountry, setSelectedPassportCountry] = useState('');
    const [first_name, setFirst_name] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    AccessibilityInfo.announceForAccessibility('New content has loaded');
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [passport, setPassport] = useState("")
    const [checked, setChecked] = useState(false)
    const [countryId, setCountryId] = useState()
    const [dob, setDob] = useState('');
    const [country, setCountry] = useState("IN")
    const [callingCodeCountry, setcallingCodeCountry] = useState("91")
    const [nationality_id, setnationality_id] = useState("")
    const [country_id, setcountry_id] = useState("")

    const [popupProps, setPopupProps] = useState({
        visible: false,
        type: 'info',
        title: '',
        message: '',
        onClose: () => { },
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
const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!first_name.trim()) {
        errors.first_name = 'This field is required';
        isValid = false;
    }
    if (!email.trim()) {
        errors.email = 'This field is required';
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = 'Please enter a valid email';
        isValid = false;
    }
    if (!passport.trim()) {
        errors.passport = 'This field is required';
        isValid = false;
    }
    if (!mobile.trim()) {
        errors.mobile = 'This field is required';
        isValid = false;
    }
    if (!nationality_id) {
        errors.nationality = 'Please select nationality';
        isValid = false;
    }
    if (!country_id) {
        errors.country = 'Please select country';
        isValid = false;
    }
    if (!checked) {
        errors.gdpr = 'You must accept the terms and conditions';
        isValid = false;
    }

    setFormErrors(errors);
    return isValid;
};

const handleLogin = async () => {
    if (!validateForm()) {
        // Show validation errors in popup
        const errorMessages = Object.values(formErrors).filter(msg => msg);
        if (errorMessages.length > 0) {
            showPopup({
                type: 'error',
                title: 'Validation Error',
                message: errorMessages.join('\n'),
                duration: 3000
            });
        }
        return;
    }

    try {
        const { message } = await dispatch(registerUser({ 
            first_name, 
            email, 
            mobile, 
            passport, 
            nationality_id, 
            country_id 
        })).unwrap();
        
        showPopup({
            type: 'success',
            title: 'Registration Successful',
            onClose: () => navigation.navigate("SignIn"),
            message: message,
            duration: 2000,
            showCloseButton: false
        });
    } catch (error) {
        let errorMessage = error.message || 'An error occurred during registration';
        
        // Handle API validation errors
        if (error.errors) {
            setFormErrors(error.errors);
            const apiErrorMessages = Object.values(error.errors).filter(msg => msg);
            if (apiErrorMessages.length > 0) {
                errorMessage = apiErrorMessages.join('\n');
            }
        }
        
        showPopup({
            type: 'error',
            title: 'Registration Failed',
            message: errorMessage,
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
                        externalError={formErrors.first_name}
                    />
                </View>
                <View style={styles.inputview}>
                    <CustomTextInput
                        placeholder="Email*"
                        value={email}
                        onChangeText={setEmail}
                        validationType={"email"}
                        externalError={formErrors.email}
                    />
                </View>
                <View style={[styles.inputview, { marginBottom: 20, justifyContent: "center", alignItems: "center", marginLeft: 20 }]}>
                    <PassportCountryDropdown
                        label="Select Nationality"
                        onValueChange={(selected) => {
                            setcountry_id(selected?.id);
                            setFormErrors({...formErrors, nationality: undefined});
                        }}
                        error={formErrors.nationality}
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
                                setFormErrors({...formErrors, country: undefined});
                            }}
                            label="Select County Applying from"
                            error={formErrors.country}
                        />
                    </View>
                </View>
                <View style={styles.inputview}>
                    <CustomTextInput
                        placeholder="Passport Number*"
                        value={passport}
                        onChangeText={setPassport}
                        externalError={formErrors.passport}
                    />
                </View>
                <View style={styles.inputview}>
                    <PhoneInputField
                        value={mobile}
                        onChangeText={setMobile}
                        showError={!!formErrors.mobile}
                        errorMessage={formErrors.mobile}
                        callingCodeCountry={callingCodeCountry}
                        selectedCountry={country}
                        onCountryChange={setCountry}
                    />
                </View>
                <GDPRCheckbox 
                    checked={checked} 
                    onToggle={() => {
                        setChecked(!checked);
                        setFormErrors({...formErrors, gdpr: undefined});
                    }} 
                    error={formErrors.gdpr}
                />
                <View style={[styles.inputview, { margin: 0 }]}>
                    <CustomButton label="SIGN UP" onPress={handleLogin} />
                </View>

                <View style={styles.singuptextview}>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                        <Text style={styles.accountText}>
                            Already have an account{' '}
                            <Text style={styles.signUpText}>
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
                    setPopupProps({ ...popupProps, visible: false });
                    popupProps.onClose?.();
                }}
                duration={popupProps.duration}
                showCloseButton={popupProps.showCloseButton}
            />
        </View>
    );
}