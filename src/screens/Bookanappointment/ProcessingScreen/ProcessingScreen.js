import React, { useState } from "react";
import { Text, View, StatusBar, ScrollView } from "react-native";
import { styles } from "./styles";
import { BackgroundGradient } from "../../../utils/Image";
import ProfileMenuModal from "../../../components/ProfileMenuModal";
import ContactCard from "../../../components/ContactCard";
import StepIndicatorComponent from "../../../components/StepIndicatorComponent";
import { scale } from "../../../utils/responsive";
import ApplicationCenter from "../../../components/ApplicationCenter";
import Servicetype from "../../../components/Servicetype";
import Applicationtype from "../../../components/Applicationtype";
import BoxUIWithFlatList from "../../../components/BoxUIWithFlatList";
import AppointmentDate from "../../../components/AppointmentDate";
import LabeledInput from "../../../components/LabeledInput";
import TimeSlot from "../../../components/TimeSlot";
import DateofBirth from "../../../components/DateofBirth";
import PremiumLounge from "../../../components/PremiumLounge";
import ServiceDescriptionInput from "../../../components/ServiceDescriptionInput";
import CustomButton from "../../../components/CustomButton";
import { colors } from "../../../utils/colors";


export default function ProcessingScreen({ navigation }) {
    const [nationality, setNationality] = useState('');
    const [dob, setDob] = useState('');


    console.log("dob")

    const availableDates = [
        '2025-07-17',
        '2025-07-18',
        '2025-07-21',
        '2025-07-22'
    ];
    const unavailableDates = [
        '2025-07-01', '2025-07-02', '2025-07-03', '2025-07-04',
        '2025-07-07', '2025-07-08', '2025-07-09', '2025-07-10',
        '2025-07-11', '2025-07-14', '2025-07-15', '2025-07-16'
    ];
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
                            Please do not refresh the page until{"\n"} the form is complete.
                        </Text>
                    </View>
                    <Text style={styles.AppoinmentText}>
                        Appointment Schedule
                    </Text>
                    <ApplicationCenter />
                    <Servicetype />
                    <Applicationtype />
                    <Text style={styles.AppoinmentDateText}>
                        Appointment Date:
                    </Text>
                    <BoxUIWithFlatList />
                    <AppointmentDate
                        placeholder="Click here for Appointment Date*"
                        date={dob} setDate={setDob}
                        availableDates={availableDates}
                        unavailableDates={unavailableDates}
                    />
                </View>
                <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
                    <Text style={styles.PersonalInformation}>
                        Personal Information
                    </Text>
                    <View style={styles.PersonalInformationContainer}>
                        <LabeledInput
                            label="Nationality"
                            value={nationality}
                            onChangeText={setNationality}
                            // placeholder="Enter your nationality"
                        />
                        <LabeledInput
                            label="Mobile No"
                            value={nationality}
                            onChangeText={setNationality}
                            // placeholder="Enter your nationality"
                        />
                        <LabeledInput
                            label="Email address"
                            value={nationality}
                            onChangeText={setNationality}
                            // placeholder="Enter your nationality"
                        />
                        <Text style={styles.Applicant}>Applicant - 1 </Text>
                        <TimeSlot />
                        <LabeledInput
                            label="Applicant First Name"
                            value={nationality}
                            onChangeText={setNationality}
                        // placeholder="Enter your nationality"
                        />
                        <LabeledInput
                            label="Applicant Last Name"
                            value={nationality}
                            onChangeText={setNationality}
                        // placeholder="Enter your nationality"
                        />
                        <DateofBirth
                            placeholder="Date of Birth*"
                            date={dob} setDate={setDob}
                        />
                        <LabeledInput
                            label="Passport No"
                            value={nationality}
                            onChangeText={setNationality}
                        // placeholder="Enter your nationality"
                        />
                        <PremiumLounge />
                        <ServiceDescriptionInput />
                    </View>
                </View>
                <View style={{backgroundColor:colors.text,marginBottom:20}}>
 <CustomButton  label="BOOK"/>
                </View>
                                   

            </ScrollView>
        </View>
    );
}