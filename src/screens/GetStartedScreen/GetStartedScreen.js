import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { Geist_Fonts, OpenSans_Fonts, Poppins_Fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { verticalScale,moderateScale,scale,fontScale ,platformScale} from '../../utils/responsive';

const GetStartedScreen = ({navigation}) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"  backgroundColor={"#5ba1d5"}/>
            <ImageBackground
                source={require('../../assets/images/getstaredimage.png')} // Replace with your eagle-in-sky image
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <View style={[styles.card, { marginBottom: insets.bottom + 40 }]}>
                    <Text style={styles.title}>Get Your Visa</Text>
                    <Text style={styles.subtitle}>
                        BLS International Services Ltd., with over 19+ years of experience, is a globally trusted
                        and highly esteemed tech-enabled service partner for governments and citizens.
                    </Text>
                    <CustomButton label="Started" onPress={() =>navigation.navigate('SignIn')} />

                </View>
            </ImageBackground>
        </View>
    );
};
export default GetStartedScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: moderateScale(20),
        marginHorizontal: moderateScale(20),
        padding: moderateScale(20),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: verticalScale(6) },
        shadowOpacity: 0.1,
        shadowRadius: moderateScale(10),
        elevation: platformScale(10),
    },
    title: {
        fontSize: fontScale(30),
        fontFamily:Geist_Fonts.Geist_Medium,
        color:colors.commonTextColor,
        marginBottom: verticalScale(10),
    },
    subtitle: {
        fontSize: fontScale(16),
        fontFamily:Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2,
        marginBottom: verticalScale(20),
        textAlign: "center",
    },
    button: {
        backgroundColor: '#AD842B',
        paddingHorizontal: moderateScale(30),
        paddingVertical: verticalScale(12),
        borderRadius: moderateScale(6),
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: fontScale(14),
    },
});



