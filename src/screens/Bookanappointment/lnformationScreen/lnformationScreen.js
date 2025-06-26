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
import { BackgroundGradient } from "../../../utils/Image";
import ProfileMenuModal from "../../../components/ProfileMenuModal";
import ContactCard from "../../../components/ContactCard";
import StepIndicatorComponent from "../../../components/StepIndicatorComponent";
import { scale } from "../../../utils/responsive";
import CustomTextInput from "../../../components/CustomTextInput";
import PhoneInputField from "../../../components/PhoneInputField";
import CustomButton from "../../../components/CustomButton";
import CaptchaInput from "../../../components/CaptchaInput";


export default function lnformationScreen({ navigation }) {
  const [name, setName] = useState("");
  const [input, setInput] = useState('');

  return (
    <View style={styles.container} >
      <ScrollView >
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <BackgroundGradient
          style={{ position: "absolute", width: '100%', height: '100%' }}
        />
        <View style={styles.logo}>
          <ProfileMenuModal />
        </View>
        <ContactCard />
        <StepIndicatorComponent currentStep={1} />
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: scale(20) }}>
          <Text style={styles.title}>Information</Text>
          <Text style={styles.subtitle}>Appointment Booking Form</Text>
        </View>
        <View style={[styles.inputview, { marginTop: scale(40) }]}>
          <CustomTextInput
            placeholder="Email Address"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputview}>
          <CustomTextInput
            placeholder="Applicant First Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputview}>
          <CustomTextInput
            placeholder="Applicant Last Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputview}>
          <CustomTextInput
            placeholder="Applicant Title"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputview}>
          <PhoneInputField />
        </View>
        <View style={{ marginTop: 6, marginBottom: 30 }}>
          <CaptchaInput value={input} onChange={setInput} />
        </View>
        <View style={{ marginBottom: 30 }}>
          <CustomButton label="Continue" onPress={() => navigation.navigate("BottomTab")} />
        </View>
      </ScrollView>
    </View>
  );
}