// StepProgress.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { Poppins_Fonts } from '../../../../utils/fonts';
import { scale } from '../../../../utils/responsive';
import { colors } from '../../../../utils/colors';

const customStyles = {
    stepIndicatorSize: 24,
    currentStepIndicatorSize: 24,
    separatorStrokeWidth: 1.5,
    currentStepStrokeWidth: 1.5,
    stepStrokeCurrentColor: '#B99230',
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: '#B99230',
    stepStrokeUnFinishedColor: '#A0A0A0',
    separatorFinishedColor: '#B99230',
    separatorUnFinishedColor: '#D3D3D3',
    stepIndicatorFinishedColor: '#B99230',
    stepIndicatorUnFinishedColor: '#A0A0A0',
    stepIndicatorCurrentColor: '#B99230',
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 12,
    stepIndicatorLabelCurrentColor: '#ffffff',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#ffffff',
};

const StepProgress = ({ currentPosition = 0 }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Click Your Selfie</Text>
            <View style={{ width: "30%" }}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={currentPosition}
                    stepCount={2}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#FFFDF7',
        padding: 8
    },
    title: {
        fontSize: scale(16),
        left: "4%",
        fontFamily: Poppins_Fonts.Poppins_Medium,
        color: colors.commonTextColor,
    },
});
export default StepProgress;
