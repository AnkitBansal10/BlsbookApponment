// components/ServiceCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Poppins_Fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import { Arrow } from '../../../utils/Image';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';

const ServiceCard = ({ title, IconComponent ,onPress}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} >
            <View style={styles.ArrowView}>
                <Arrow />
            </View>
            <View style={styles.iconContainer}>
                {IconComponent}
            </View>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};
export default ServiceCard;

const styles = StyleSheet.create({
    card: {
        width: '47%',
        aspectRatio: 1,
        backgroundColor: '#fff',
        borderRadius: scale(12),
        margin: scale(6),
        padding: scale(14),
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: verticalScale(2) },
        shadowRadius: scale(4),
        elevation: 3,
    },
    ArrowView: {
        height: scale(30),
        alignItems: "flex-end",
    },
    iconContainer: {
        marginBottom: verticalScale(10),
    },
    title: {
        fontSize: moderateScale(13),
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.commonTextColor,
        textAlign: 'left',
    },
});
