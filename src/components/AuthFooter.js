import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SvgUri from 'react-native-svg-uri';
import { scale, verticalScale } from '../utils/responsive';
import { Geist_Fonts, Poppins_Fonts } from '../utils/fonts';
import { colors } from '../utils/colors';
import { FaceBook, Google } from '../utils/Image';

const AuthFooter = ({ onSignUp, onGoogle, onFacebook, onApple }) => {
    const socialIcons = useMemo(() => (
        <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconBox} onPress={onGoogle}>
                <Google
                    width={scale(20)}
                    height={scale(20)}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox} onPress={onFacebook}>
                <FaceBook
                    width={scale(20)}
                    height={scale(20)}
                />
            </TouchableOpacity>
            {Platform.OS === 'ios' && (
                <TouchableOpacity style={styles.iconBox} onPress={onApple}>
                    <Icon name="apple" size={25} color="#000" />
                </TouchableOpacity>
            )}
        </View>
    ), [onGoogle, onFacebook, onApple]);

    return (
        <View style={styles.container}>
            <Text style={styles.accountText}>
                Don’t have an account?{' '}
                <Text style={styles.signUpText} onPress={onSignUp}>
                    Sign up
                </Text>
            </Text>
            <Text style={styles.orText}>OR CONNECT</Text>
            {socialIcons}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: 'center',
    },
    accountText: {
        color: colors.comanTextcolor2,
        fontFamily: Geist_Fonts.Geist_Medium,
        fontSize: verticalScale(16),
    },
    signUpText: {
        fontFamily: Geist_Fonts.Geist_Bold,
        color: colors.primary,
        fontSize: verticalScale(16),
    },
    icon: {
        width: 24,
        height: 24,
    },
    orText: {
        marginTop: 20,
        fontFamily: Poppins_Fonts.Poppins_SemiBold,
        fontSize: 16,
        letterSpacing: 1,
        color: colors.comanTextcolor2,
    },
    iconRow: {
        marginTop: 20,
        flexDirection: 'row',
        gap: 16,
    },
    iconBox: {
        backgroundColor: '#fff',
        borderWidth:1,
        borderRadius: 10,
        borderColor:colors.borderColorSecondcolor,
        padding: 10,
        width:scale(86),
        height:scale(52),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default AuthFooter;
