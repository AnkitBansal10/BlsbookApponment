import React, { useState, useCallback, useMemo } from "react";
import {
    Text,
    View,
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

const Uploadyourpassport = React.memo(({
    navigation,
    currentStep = 1,
    totalSteps = 2
}) => {
    const [passportImageUri, setPassportImageUri] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [passportData, setPassportData] = useState(null);
    const [processingStage, setProcessingStage] = useState('');

    // Memoized image selection handler
    const handleImageSelected = useCallback((uri) => {
        setPassportImageUri(uri);
        if (uri) {
            setIsProcessing(true);
            setProcessingStage('Uploading image...');
        } else {
            setIsProcessing(false);
            setProcessingStage('');
            setPassportData(null);
        }
    }, []);

    // Memoized passport confirmation handler
    const handlePassportConfirmed = useCallback((data) => {
        setPassportData(data);
        setIsProcessing(false);
        setProcessingStage('');
    }, []);

    // Memoized processing stage handler
    const handleProcessingStage = useCallback((stage) => {
        setProcessingStage(stage);
    }, []);

    // Memoized proceed handler
    const handleProceed = useCallback(() => {
        if (passportData && navigation) {
            // Navigate to next screen with passport data
            navigation.navigate('UploadSelfiescreen', {
                passportData: passportData,
                passportImage: passportImageUri
            });
        } else {
            Alert.alert(
                'Incomplete Data',
                'Please ensure your passport has been scanned and verified before proceeding.',
                [{ text: 'OK' }]
            );
        }
    }, [passportData, passportImageUri, navigation]);

    // Memoized background gradient style
    const backgroundGradientStyle = useMemo(() => ({
        position: "absolute",
        width: '100%',
        height: '100%'
    }), []);

    // Memoized loading message based on processing stage
    const loadingMessage = useMemo(() => {
        switch (processingStage) {
            case 'Uploading image...':
                return 'Uploading Image';
            case 'Scanning passport...':
                return 'Scanning Passport';
            case 'Extracting data...':
                return 'Extracting Data';
            case 'Verifying information...':
                return 'Verifying Information';
            default:
                return 'Processing';
        }
    }, [processingStage]);

    const loadingSubMessage = useMemo(() => {
        switch (processingStage) {
            case 'Uploading image...':
                return 'Securely uploading your passport image';
            case 'Scanning passport...':
                return 'Reading passport information using AI';
            case 'Extracting data...':
                return 'Extracting personal details from passport';
            case 'Verifying information...':
                return 'Verifying extracted information for accuracy';
            default:
                return 'Please wait while we process your passport';
        }
    }, [processingStage]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <BackgroundGradient style={backgroundGradientStyle} />

            <View style={styles.logo}>
                <ProfileMenuModal />
            </View>

            <View style={styles.inputview}>
                <ContactCard />
                <StepProgress currentPosition={0} />

                <View style={styles.uploadContainer}>
                    <UploadPassportPhoto
                        onImageSelected={handleImageSelected}
                        onPassportConfirmed={handlePassportConfirmed}
                        onProcessingStage={handleProcessingStage}
                    />
                </View>

                {passportData && !isProcessing && (
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            label="Proceed to Next Step"
                            onPress={handleProceed}
                        />
                    </View>
                )}
            </View>
        </View>
    );
});

Uploadyourpassport.displayName = 'Uploadyourpassport';

export default Uploadyourpassport;
