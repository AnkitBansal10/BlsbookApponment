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
    
    // New state variables for additional fields
    const [applicationCenter, setApplicationCenter] = useState(null);
    const [serviceType, setServiceType] = useState('Service_type');
    const [appointmentType, setAppointmentType] = useState('Appointment Type');
    
    const [errors, setErrors] = useState({
        dob: false,
        appointmentDate: false,
        applicationCenter: false,
        serviceType: false,
        applicationType: false,
        appointmentType: false,
        timeSlot: false
    });

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
        setSelectedTime(item.value);
        handleInputChange("slot_time",item.value);
        // Clear error when user selects a time slot
        if (errors.timeSlot) {
            setErrors(prev => ({
                ...prev,
                timeSlot: false
            }));
        }
    };

    const handleDobChange = (date) => {
        setDob(date);
        // Clear error when user selects a date
        if (errors.dob) {
            setErrors(prev => ({
                ...prev,
                dob: false
            }));
        }
    };

    const handleAppointmentDateChange = (date) => {
        setBookanappointmentDate(date);
        handleInputChange("appointment_date", date);
        // Clear error when user selects a date
        if (errors.appointmentDate) {
            setErrors(prev => ({
                ...prev,
                appointmentDate: false
            }));
        }
    };

    const handleApplicationCenterChange = (value) => {
        setApplicationCenter(value);
        handleInputChange("center_location_id", value);
        // Clear error when user selects application center
        if (errors.applicationCenter) {
            setErrors(prev => ({
                ...prev,
                applicationCenter: false
            }));
        }
    };

    const handleServiceTypeChange = (value) => {
        setServiceType(value);
        // Clear error when user selects service type
        if (errors.serviceType) {
            setErrors(prev => ({
                ...prev,
                serviceType: false
            }));
        }
    };

    const handleApplicationTypeChange = (value) => {
        setApplicationType(value);
        // Clear error when user selects application type
        if (errors.applicationType) {
            setErrors(prev => ({
                ...prev,
                applicationType: false
            }));
        }
    };

    const handleAppointmentTypeChange = (value) => {
        setAppointmentType(value);
        handleInputChange("appointment_type", value === 'Normal Time' ? 'normal' : value);
        // Clear error when user selects appointment type
        if (errors.appointmentType) {
            setErrors(prev => ({
                ...prev,
                appointmentType: false
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            dob: !dob || dob.trim() === "",
            appointmentDate: !BookanappointmentDate || BookanappointmentDate.toString().trim() === "",
            applicationCenter: !applicationCenter,
            serviceType: !serviceType || serviceType === 'Service_type',
            applicationType: !applicationType || !applicationType.value || applicationType.value === 'Application_type',
            appointmentType: !appointmentType || appointmentType === 'Appointment Type',
            timeSlot: !selectedTime || selectedTime === ""
        };

        setErrors(newErrors);
        
        // Return true if no errors
        return !Object.values(newErrors).some(error => error);
    };

    const handleBookAppointment = () => {
        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        // Proceed with booking logic
        console.log("Form is valid, proceeding with booking...");
        // Add your booking logic here
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
                        hasError={errors.timeSlot}
                        errorMessage="Time Slot is required"
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
                        date={dob} 
                        setDate={handleDobChange}
                        error={errors.dob}
                        errorMessage="Date of Birth is required"
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
                    <ApplicationCenter 
                        value={applicationCenter}
                        onValueChange={handleApplicationCenterChange}
                        hasError={errors.applicationCenter}
                        errorMessage="Application Center is required"
                    />
                    <Servicetype 
                        value={serviceType}
                        onValueChange={handleServiceTypeChange}
                        hasError={errors.serviceType}
                        errorMessage="Service Type is required"
                    />
                    <Applicationtype
                        value={applicationType}
                        setValue={handleApplicationTypeChange}
                        hasError={errors.applicationType}
                        errorMessage="Application Type is required"
                    />
                    <Text style={styles.AppoinmentDateText}>
                        Appointment Date:
                    </Text>
                    <BoxUIWithFlatList />
                    <AppointmentDate
                        placeholder="Click here for Appointment Date*"
                        date={BookanappointmentDate}
                        setDate={handleAppointmentDateChange}
                        hasError={errors.appointmentDate}
                        errorMessage="Appointment Date is required"
                    />
                    <AppointmentType 
                        value={appointmentType}
                        onValueChange={handleAppointmentTypeChange}
                        hasError={errors.appointmentType}
                        errorMessage="Appointment Type is required"
                    />
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
                    <CustomButton 
                        label="BOOK" 
                        onPress={handleBookAppointment}
                    />
                </View>
            </ScrollView>
            
        </View>
    );
}
