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
    Platform,
    UIManager,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { WightLogo, Backgroundsmall } from '../../utils/Image';
import { scale } from '../../utils/responsive';
import { MinusButton } from '../../utils/Image';
import { PlusButton } from '../../utils/Image';
import { Background, CellPhone, Location, Mail, World ,Italyflag} from '../../utils/Image';

export default function FaqScreen() {
    const [expandedSection, setExpandedSection] = useState('Visa Questions?'); 
    const toggleSection = (sectionTitle) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSection(prev => (prev === sectionTitle ? null : sectionTitle));
    };

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
                                              <Italyflag  height={scale(15)}
                                              width={scale(35)}/> 
                                             <Text style={styles.country}>Italy</Text>
                                         </View>
                 
                                         <View style={styles.iconGroup}>
                                             <TouchableOpacity style={styles.iconBtn}>
                                                 <CellPhone />
                                             </TouchableOpacity>
                                             <TouchableOpacity style={styles.iconBtn}>
                                                 <Mail/>
                                             </TouchableOpacity>
                                             <TouchableOpacity style={styles.iconBtn}>
                                               <World/>
                                             </TouchableOpacity>
                                         </View>
                                     </View>
                                     <View style={styles.locationRow}>
                                       <Location
                                        style={{ }} />
                                         <Text style={styles.locationText}>Senegal</Text>
                                     </View>
                    <View style={{ borderWidth: 0.50, marginTop: 20, borderColor: "#D9D9D9", marginBottom: 20 }} />
                    <Text style={styles.title}>
                        <Text style={styles.highlight}>FAQ</Text>
                    </Text>
                    <Text style={styles.faqSubtitle}>
                        Learn more about our services, we most surely have something for you too.
                    </Text>
                    <View style={styles.divider} />
                    <View style={styles.accordionItem}>
                        <TouchableOpacity
                            style={styles.accordionHeader}
                            onPress={() => toggleSection('Visa Questions?')}
                        >
                            <Text style={styles.accordionTitle}>Visa Questions?</Text>
                            {expandedSection === 'Visa Questions?' ? <MinusButton /> : <PlusButton />}

                        </TouchableOpacity>
                        {expandedSection === 'Visa Questions?' && (
                            <View style={styles.accordionContent}>
                                <Text style={styles.questionText}>Why do I need a Schengen Visa?</Text>
                                <Text style={styles.answerText}>
                                    Italian citizens or foreign citizens, upon
                                    presentation of the documentation
                                    certifying their legal residence in Italy, must
                                    present a visa to enter the Schengen Area,
                                    regardless of the length of stay and
                                    regardless of travel documents, with the
                                    exception of holders of a residence permit
                                    valid in the following days which authorizes
                                    the stay in Italy or in another state of the
                                    Schengen area state. you will stay longer.
                                </Text>
                                <Text style={styles.questionText}>What type of Visa should I apply for?</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.divider} />
                    <View style={styles.accordionItem}>
                        <TouchableOpacity
                            style={styles.accordionHeader}
                            onPress={() => toggleSection('Withdrawal Questions?')}
                        >
                            <Text style={styles.accordionTitle}>Withdrawal Questions?</Text>
                            {expandedSection === 'Withdrawal Questions?' ? <MinusButton /> : <PlusButton />}

                        </TouchableOpacity>
                        {expandedSection === 'Withdrawal Questions?' && (
                            <View style={styles.accordionContent}>
                                <Text style={styles.answerText}>
                                    (Content for withdrawal questions will go here.)
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.divider} />
                    <View style={styles.accordionItem}>
                        <TouchableOpacity
                            style={styles.accordionHeader}
                            onPress={() => toggleSection('Filing questions & documents?')}
                        >
                            <Text style={styles.accordionTitle}>Filing questions & documents?</Text>
                            {expandedSection === 'Filing questions & documents?' ? <MinusButton /> : <PlusButton />}

                        </TouchableOpacity>
                        {expandedSection === 'Filing questions & documents?' && (
                            <View style={styles.accordionContent}>
                                <Text style={styles.answerText}>
                                    (Content for filing questions will go here.)
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.divider} />
                </View>
            </ScrollView>
        </View>
    );
}


