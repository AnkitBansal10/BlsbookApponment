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
    Dimensions,
    Text,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { WightLogo, Backgroundsmall } from '../../utils/Image';
import { scale } from '../../utils/responsive';
import VisaInfoTabs from './Component/VisaInfoTabs';

const { height } = Dimensions.get('window');

export default function VisaDetailScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                <Backgroundsmall />
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="#828181" />
                    </TouchableOpacity>
                    <WightLogo height={scale(39)} width={scale(79)} style={styles.logo} />
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
                    <View style={{ borderWidth: 0.50, marginTop: 20, borderColor: "#D9D9D9", marginBottom: 20 }} />
                    <Text style={styles.title}>
                        <Text style={styles.highlight}>Short term Business visa </Text>
                    </Text>
                    <View style={{ flex: 1, minHeight:height }}>
                    <VisaInfoTabs />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


