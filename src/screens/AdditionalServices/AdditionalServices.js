import { useState } from 'react';
import {
    View,
    stylesheet,
    ImageBackground,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    Alert,
    LayoutAnimation,
    FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { WightLogo, Backgroundsmall } from '../../utils/Image';
import { scale } from '../../utils/responsive';
import { CellPhone, Location, Mail, World, Italyflag } from '../../utils/Image';
import { services } from '../../utils/MockData';
import ServiceCard from './Component/ServiceCard';
import ServiceModal from './Component/ServiceModal';
export default function AdditionalServices() {

  const [selectedService, setSelectedService] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleServicePress = (service) => {
        setSelectedService(service);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

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
                    <View style={{ borderWidth: 0.50, marginTop: 20, borderColor: "#D9D9D9", marginBottom: 20 }} />
                    <Text style={styles.title}>
                        <Text style={styles.highlight}>Additional Services</Text>
                    </Text>
                    <Text style={styles.faqSubtitle}>
                        Value Added Services
                    </Text>
                   <FlatList
                            data={services}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            renderItem={({ item }) => (
                                <ServiceCard 
                                    title={item.title} 
                                    IconComponent={item.icon} 
                                    onPress={() => handleServicePress(item)}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                        />
                     <ServiceModal 
                visible={modalVisible} 
                service={selectedService} 
                onClose={closeModal} 
            />
                </View>
            </ScrollView>
        </View>
    );
}


