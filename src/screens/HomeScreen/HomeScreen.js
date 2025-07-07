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
import { BackgroundGradient, BlackLogo, BottomImage, ButtomIcon } from '../../utils/Image';

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
               
                    <BackgroundGradient
                                   style={{ position: "absolute", width: '100%', height: '100%' }}
                               />
                                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <View style={styles.header}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <BlackLogo
                            width={scale(79.67)}
                            height={scale(50)}
                        />
                    </View>
                    <Text style={styles.title}>Your gateway to</Text>
                    <Text style={styles.subtitle}
                    adjustsFontSizeToFit
  minimumFontScale={0.8} // Minimum scale down to 80% of original size
  numberOfLines={1}
                    >
                        Global <Text style={styles.highlight}>Exploration!</Text></Text>
                        <BottomImage
                            width={scale(146.92)}
                            height={scale(15.36)}
                            style={styles.vector}
                           
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
              <CardSlider/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
