import React, { useState } from "react";
import { Text, View, StatusBar, ScrollView } from "react-native";
import { styles } from "./styles";
import { BackgroundGradient } from "../../../utils/Image";
import ProfileMenuModal from "../../../components/ProfileMenuModal";
import ContactCard from "../../../components/ContactCard";
import StepIndicatorComponent from "../../../components/StepIndicatorComponent";
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
import LabeledInputNationality from "../../../components/LabeledInputNationality";
import LabeledInputPhone from "../../../components/LabeledInputPhone";
import AppointmentType from "../../../components/AppointmentType";
import { useDispatch ,useSelector } from "react-redux";
import { appointment_schedule } from "../../../features/auth/authThunks";

export default function ProcessingScreen() {
    const [nationality, setNationality] = useState('');
    const [applicationType, setApplicationType] = useState({ label: 'Application_type', value: 'Application_type', count: 1 });
    const [dob, setDob] = useState('');
    const [BookanappointmentDate, setBookanappointmentDate] = useState()
    const [selectedTime, setSelectedTime] = useState("");
    const [callingCodeCountry, setCallingCodeCountry] = useState("91");
    const [country, setCountry] = useState("IN");
   const [formData, setFormData] = useState({
    uid: "8opI",
    center_location_id: "1",
    appointment_date: "",
    slot_time: "",
    appointment_type: "normal",
    title: "",
    first_name: "Puneet",
    last_name: "Agrawal",
    email: "puneet.agrawal88@gmail.com",
    mobile_country_code: "+92",
    mobile_number: "",
    passport_no: "PU123456"
});

 const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
    const handerDataChange =() =>{
       
    }
    const handleTimeChange = (item) => {
        handleInputChange("slot_time",item.value);
    };

    const renderApplicantForms = () => {
        const forms = [];
        const count = typeof applicationType.count === 'number' && applicationType.count > 0 ? applicationType.count : 1;
        for (let i = 0; i < count; i++) {
            forms.push(
                <View key={`applicant-${i}`} style={{ marginTop: 10 }}>
                    <Text style={styles.Applicant}>Applicant - {i + 1} </Text>
                    <TimeSlot
                        value={selectedTime}
                        onChange={(e)=>handleTimeChange(e)}
                    />
                    <LabeledInput
                        label="Applicant First Name"
                        value={formData.first_name}
                       onChangeText={(test)=>handleInputChange("first_name",test)}
                    />
                    <LabeledInput
                        label="Applicant Last Name"
                        value={formData.last_name}
                        onChangeText={(test)=>handleInputChange("last_name",test)}
                    />
                    <DateofBirth
                        placeholder="Date of Birth*"
                        date={dob} setDate={(test)=>handleInputChange("first",test)}
                    />
                    <LabeledInput
                        label="Passport No"
                        value={formData.passport_no}
                        onChangeText={(test)=>handleInputChange("passport_no",test)}
                    />
                </View>
            );
        }
        return forms;
    };
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
                <View style={styles.proccessingText}>
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
                    <Applicationtype
                        value={applicationType}
                        setValue={(test)=>handleInputChange("first",test)}
                    />
                    <Text style={styles.AppoinmentDateText}>
                        Appointment Date:
                    </Text>
                    <BoxUIWithFlatList />
                    <AppointmentDate
                        placeholder="Click here for Appointment Date*"
                        date={BookanappointmentDate}
                        setDate={setBookanappointmentDate}
                    />
                      <AppointmentType />
                </View>
                <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
                    <Text style={styles.PersonalInformation}>
                        Personal Information
                    </Text>
                    <View style={styles.PersonalInformationContainer}>
                        <LabeledInputNationality
                            isDropdown
                            dropdownLabel="Nationality"
                            placeholder="Select your country"
                            onDropdownValueChange={(selected) => {
                                console.log(selected)
                                //   onChange(selected?.id);
                                setCountry(selected?.iso);
                                setCallingCodeCountry(selected?.phonecode);
                            }}
                        // initialDropdownValue={country}
                        // onDropdownValueChange={setCountry}
                        />
                        <LabeledInputPhone
                            label="Mobile No"
                            isPhoneInput
                            value={formData.mobile_number}
                            onChangeText={(test) =>handerDataChange("mobile_number",test)}
                            // defaultCountry="US"
                            callingCodeCountry={callingCodeCountry}
                            selectedCountry={country}
                            onCountryChange={(test)=>handleInputChange("first",test)}
                        />
                        <LabeledInput
                            label="Email address"
                            value={formData.email}
                            onChangeText={(test)=>handleInputChange("email",test)}
                        />
                        {renderApplicantForms()}
                        <ServiceDescriptionInput />
                    </View>
                </View>
                 <View style={styles.butoonConationer}>
                    <CustomButton label="BOOK" />
                </View>
            </ScrollView>
            
        </View>
    );
}