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
import { Geist_Fonts, OpenSans_Fonts } from '../../utils/fonts';
const { width, height } = Dimensions.get('window');

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
        borderRadius: 20,
        marginHorizontal: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize:30,
        fontFamily:Geist_Fonts.Geist_Medium,
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 13,
        fontFamily:OpenSans_Fonts.OpenSans_Medium,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#AD842B',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});
