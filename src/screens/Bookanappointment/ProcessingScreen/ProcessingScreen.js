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


export default function ProcessingScreen({ navigation }) {

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
                <StepIndicatorComponent currentStep={2} />
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: scale(20) }}>
                    <Text style={styles.title}>Processing</Text>
                    <Text style={styles.subtitle}>Appointment Booking</Text>
                </View>
                <View style={styles.RefreshContainer}>
                    <View style={styles.SubContainer}>
                        <Text style={styles.textstyling}>
                            Please do not refresh the page until {`/n`}the form is complete.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}