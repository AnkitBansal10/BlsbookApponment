import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../utils/colors';
import { Geist_Fonts } from '../utils/fonts';
import SvgUri from 'react-native-svg-uri';
import { scale } from '../utils/responsive';
import { Butonlogo } from '../utils/Image';

const GradientButton = ({ title = 'GO', onPress }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <LinearGradient
                colors={['#996600', '#cc9900']} // Golden gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}>
                <View style={styles.content}>
                    <Butonlogo
                        width={scale(70)}
                        height={scale(70)}
                        source={require('../assets/icons/fontIcon.svg')}
                        fill="red"
                    />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: "40%",
        height: 50,
        borderRadius: 8,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: colors.text,
        fontSize: 18,
        fontFamily: Geist_Fonts.Geist_Bold,
        fontWeight: '600',
        marginRight: 8,
    },
    icon: {
        marginTop: 1,
    },
});

export default GradientButton;
