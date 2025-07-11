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
import CustomButton from '../../components/CustomButton';
import EmbassyServiceCard from './components/EmbassyServiceCard';
import InsuranceNoticeCard from './components/InsuranceNoticeCard';
import FavoritePlacesSlider from './components/FavoritePlacesSlider';
import ContactCard from './components/ContactCard';
import TravelInsuranceCard from './components/TravelInsuranceCard';
import { Background, CellPhone, Location, Mail, World } from '../../utils/Image';
import { WightLogo } from '../../utils/Image';
import { scale } from '../../utils/responsive';
import { Italyflag } from '../../utils/Image';


export default function BLSHeaderScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                <Background style={{ width: '100%', height: '100%' }} />
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="#828181" />
                    </TouchableOpacity>
                    <WightLogo height={scale(39)} width={scale(79)} style={styles.logo} />
                </View>
                <View style={styles.subcaionter}>
                    <View style={styles.topRow}>
                        <View style={styles.flagRow}>
                            <Italyflag height={scale(15)}
                                width={scale(35)} />
                            <Text style={styles.country}>Italy</Text>
                        </View>

                        <View style={styles.iconGroup}>
                            <TouchableOpacity style={styles.iconBtn}>
                                <CellPhone />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn}>
                                <Mail />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn}>
                                <World />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.locationRow}>
                        <Location
                            style={{}} />
                        <Text style={styles.locationText}>Senegal</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.heading}>Welcome to BLS Italy {"\n"}Visa Centre</Text>

                        <Text style={styles.bodyText}>
                            BLS International Services Ltd. is a trustworthy partner of the Embassy of Italy in Senegal for managing the administrative and non-judgmental tasks of processing visa applications.
                        </Text>

                        <Text style={styles.bodyText}>
                            Applicants are solely responsible for the application(s) they submit. Any false information or misrepresentation of facts, incomplete or invalid supporting documents will have a direct bearing on the decision carried out by the Embassy of Italy in Senegal.
                        </Text>
                    </View>
                    <EmbassyServiceCard />
                    <InsuranceNoticeCard />
                    <FavoritePlacesSlider />
                    <TravelInsuranceCard />
                    <ContactCard />
                </View>
            </ScrollView>
            <View style={{ marginBottom: 10 }}>
                <CustomButton label='BOOK AN APPOINTMENT' onPress={() => navigation.navigate("VisaTypescreen")} />
            </View>
        </View>
    );
}


