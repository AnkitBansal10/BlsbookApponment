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
import StepProgress from "./componets/StepIndicator";
import UploadPassportPhoto from "./componets/UploadPassportPhoto";


export default function Uploadyourpassport({ currentStep = 1, totalSteps = 2 }) {
    return (
        <View style={styles.container} >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <BackgroundGradient
                style={{ position: "absolute", width: '100%', height: '100%' }}
            />
            <View style={styles.logo}>
                <ProfileMenuModal />
            </View>
            <View style={styles.inputview}>
                <ContactCard />
                <StepProgress currentPosition={0} />
                <View style={{width:"100%",justifyContent:"center",alignItems:"center",marginTop:10}}>
                <UploadPassportPhoto />
                </View>
            </View>
        </View>
    );
}