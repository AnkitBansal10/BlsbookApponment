// App.js or HomeScreen.js

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    StatusBar,
    ScrollView,
    SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Geist_Fonts } from '../../utils/fonts';
import SvgUri from 'react-native-svg-uri';
import { moderateScale, scale } from '../../utils/responsive';
import { toGammaSpace } from 'react-native-reanimated/lib/typescript/Colors';
import { colors } from '../../utils/colors';
import CountryDropdown from '../../components/CountryDropdown';
import GradientButton from '../../components/GradientButton';
import { styles } from './styles';
import CardSlider from '../../components/CardSlider';
import { BlackLogo } from '../../utils/Image';

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
            <LinearGradient
                colors={[colors.primaryGradientTop, colors.primaryGradientBottom]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradientBackground}
            >
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <View style={styles.header}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <BlackLogo
                            width={scale(70)}
                            height={scale(70)}
                          
                        />
                    </View>
                    <Text style={styles.title}>Your gateway to</Text>
                    <Text style={styles.subtitle}>
                        Global <Text style={styles.highlight}>Exploration!</Text>
                    </Text>
                        <SvgUri
                            width={scale(110)}
                            style={styles.vector}
                            source={require('../../assets/images/Vector.svg')}
                        /> 
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={styles.subHeading}>Applying for a visa?</Text>
                    <CountryDropdown />
                   <GradientButton  title="GO" onPress={()=>navigation.navigate('Bookanappointment')} />
                </View>
                <View style={styles.bestDestinations}>
                    <Text style={styles.sectionTitle}>Best Destination</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cards}>
              <CardSlider/>
                </ScrollView>
            </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
