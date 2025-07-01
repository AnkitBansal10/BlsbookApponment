import React, { useState } from "react";
import {
    stylesheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Alert
} from "react-native";
import { styles } from "./styles";
import { BackgroundGradient } from "../../../utils/Image";
import ProfileMenuModal from "../../../components/ProfileMenuModal";
import ContactCard from "../../../components/ContactCard";
import StepProgress from "./componets/StepIndicator";
import UploadPassportPhoto from "./componets/UploadPassportPhoto";
import CustomButton from "../../../components/CustomButton";

export default function Uploadyourpassport({ currentStep = 1, totalSteps = 2 }) {
    const [passportImageUri, setPassportImageUri] = useState(null);

    const handleImageSelected = (uri) => {
        console.log(uri)
        setPassportImageUri(uri);
        if (uri) {
            console.log("Passport image selected:", uri);
            // You can now use this URI for uploads or other operations
        } else {
            console.log("Passport image removed");
        }
    };
    return (
        <View style={styles.container}>
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
                
                <View style={styles.uploadContainer}>
                    <UploadPassportPhoto onImageSelected={(uri)=>handleImageSelected(uri)} />
                </View>
                
                {passportImageUri && (
                   <CustomButton label="Proceed to Next Steps" onPress={console.log(";;")}/> 
                )}
            </View>
        </View>
    );
}
