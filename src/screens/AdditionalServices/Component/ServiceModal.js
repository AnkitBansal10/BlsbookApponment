// components/ServiceModal.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { colors } from '../../../utils/colors';
import { Geist_Fonts, Poppins_Fonts } from '../../../utils/fonts';
import { TravelInsurance, Scooter, CourierServices, Message, PremiumLounge } from '../../../utils/Image';
import Modal from 'react-native-modal';

const serviceDescriptions = {
    'Doorstep Delivery Services': {
        description: 'Enjoy the convenience of getting your products delivered directly to your doorstep. All of your documents will be transported to your home or office address.',
        icon: <Scooter width={scale(81)} height={scale(70)} />
    },
    'Courier Services': {
        description: 'Our trusted courier service ensures safe and timely delivery of your documents.',
        icon: <CourierServices width={scale(81)} height={scale(70)} />
    },
    'Travel Insurance': {
        description: 'Secure your travel with comprehensive insurance plans tailored to your needs.',
        icon: <TravelInsurance width={scale(81)} height={scale(70)} />
    },
    'Premium Lounge': {
        description: 'Relax and enjoy premium lounge facilities while you wait.',
        icon: <PremiumLounge width={scale(81)} height={scale(70)} />
    },
    'Automated SMS of Visa Status': {
        description: 'Receive automatic SMS updates about the status of your visa application.',
        icon: <Message width={scale(81)} height={scale(70)} />
    }
};

const ServiceModal = ({ visible, service, onClose }) => {
    const currentService = service ? serviceDescriptions[service.title] : null;

    return (
        <Modal
            isVisible={visible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}
            onBackdropPress={onClose}
            style={styles.modal}
        >
           
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                    accessibilityLabel="Close modal"
                >
                    <Text style={styles.closeText}>×</Text>
                </TouchableOpacity>
            <View style={styles.modalContent}>
                {currentService && (
                    <>
                        <View style={styles.iconContainer}>

                            {currentService.icon}

                            <Text style={styles.title}>{service.title}</Text>
                        </View>
                        <Text style={styles.description}>
                            {currentService.description}
                        </Text>
                    </>
                )}
            </View>
            </View>
        </Modal>
    );
};


export default ServiceModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        padding: scale(40),
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: scale(16),
        padding: scale(20),
        elevation: 10,
    },
    iconContainer: {
        width:"100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    closeButton: {
        //  top: scale(220),
        left: scale(150),
        padding: scale(10),
    },
    closeText: {
        fontSize: scale(36),
        color:colors.text,
    },
    title: {
        fontSize: moderateScale(24),
        fontFamily: Geist_Fonts.Geist_SemiBold,
        color: colors.primary,
        textAlign: "left",
        marginLeft: scale(10),
        marginBottom: scale(10),
        marginTop: scale(10),
    },
    description: {
        fontSize: moderateScale(15),
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: '#444',
        textAlign:"left",
        lineHeight: scale(20),
    },
});