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

export default function SignUpScreen() {
    const [name, setName] = useState("");
    console.log("name" + name)
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [FormattedPhone, setFormattedPhone] = useState("")
    const [checked, setChecked] = useState(false)


    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <SvgUri
                    width={scale(120)}
                    height={scale(120)}
                    source={require('../../../assets/images/Group.svg')}
                />
            </View>
            <View style={styles.titleTextView}>
                <Text style={styles.title}>Sign up now</Text>
                <Text style={styles.subtitle}>Please sign up to continue our app</Text>
            </View>
            <View style={styles.inputview}>
                <CustomTextInput
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputview}>
                <CustomTextInput
                    placeholder="Email ID"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputview}>
                <PhoneInputField />
            </View>
            <GDPRCheckbox checked={checked} onToggle={() => setChecked(!checked)} />
            <View style={styles.inputview}>
                <CustomButton label="SING UP" onPress={() => Alert.alert('SING UP')} />
            </View>
              <View style={styles.singuptextview}>
                        <Text style={styles.accountText}>
                            Already have an account  Sign in?{' '}
                            <Text style={styles.signUpText} >
                                Sign in
                            </Text>
                        </Text>
                    </View>
        </View>

    );
}