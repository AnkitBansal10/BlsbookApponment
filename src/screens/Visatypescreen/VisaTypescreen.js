import React from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For CLI
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import SvgUri from 'react-native-svg-uri';
import VisaTypeGrid from './componets/VisaTypeGrid';
import LogntermvisaGrid from './componets/LogntermvisaGrid';
import { Backgroundsmall } from '../../utils/Image';

export default function VisaTypescreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                {/* <SvgUri  style={styles.imageStyle}  source={require('../../assets/images/background.svg')} /> */}
                {/* <Image
                    source={require('../../assets/images/white-yacht.png')} // Your background image
                    style={styles.imageStyle}
                /> */}
                  <Backgroundsmall />
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="#828181" />
                    </TouchableOpacity>
                    <SvgUri style={styles.logo} source={require('../../assets/images/logoWight.svg')} />
                </View>
                <View style={styles.subcaionter}>
                    <View style={styles.topRow}>
                        <View style={styles.flagRow}>
                            {/* <SvgUri   source={require('../../assets/images/flag.svg')} /> */}
                            <Image
                                source={require('../../assets/images/flag.png')}
                                style={styles.flag}
                            />
                            <Text style={styles.country}>Italy</Text>
                        </View>

                        <View style={styles.iconGroup}>
                            <TouchableOpacity style={styles.iconBtn}>
                                <Image
                                    source={require('../../assets/icons/phone.png')} />
                                {/* <Ionicons name="call" size={18} color="#333" /> */}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn}>
                                <Image
                                    source={require('../../assets/icons/latter.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn}>
                                <Image
                                    source={require('../../assets/icons/word.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.locationRow}>
                        <Image
                            source={require('../../assets/icons/location.png')} style={{ marginRight: 6 }} tintColor='#BABABA' />
                        <Text style={styles.locationText}>Senegal</Text>
                    </View>
                    <View style={{borderWidth:0.50,marginTop:20,borderColor:"#D9D9D9",marginBottom:20}}/>
                    <Text style={styles.title}>
                        <Text style={styles.highlight}>Visa</Text>
                        <Text style={styles.highlight}> Types</Text>
                    </Text>
                    <Text style={styles.subtitle}>Short term visa</Text>
                    <VisaTypeGrid/>
                      <Text style={styles.subtitle}>Long term visa</Text>
                       <LogntermvisaGrid/>
                </View>
            </ScrollView>
        </View>

    );
}


