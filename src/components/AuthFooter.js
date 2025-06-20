import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform ,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SvgUri from 'react-native-svg-uri';
import { scale } from '../utils/responsive';
import { Geist_Fonts } from '../utils/fonts';
import { colors } from '../utils/colors';

const AuthFooter = ({ onSignUp, onGoogle, onFacebook, onApple }) => {
    const socialIcons = useMemo(() => (
        <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconBox} onPress={onGoogle}>
                <SvgUri
                    width={scale(20)}
                    height={scale(20)}
                    source={require('../assets/icons/google.svg')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox} onPress={onFacebook}>
                  <Image
            source={require('../assets/icons/Facebook.png')}
            style={styles.icon}
            resizeMode="contain"
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
        color: colors.text,
        fontFamily: Geist_Fonts.Geist_Medium,
        fontSize: 14,
        fontWeight: '400',
    },
    signUpText: {
        fontFamily: Geist_Fonts.Geist_Bold,
        color: colors.text,
        fontSize: 14,
    },
icon: {
    width: 24,
    height: 24,
    },
    orText: {
        marginTop: 20,
        fontFamily: Geist_Fonts.Geist_Bold,
        fontSize: 13,
        letterSpacing: 1,
        color: colors.text,
    },
    iconRow: {
        marginTop: 20,
        flexDirection: 'row',
        gap: 16,
    },
    iconBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
});
export default AuthFooter;
