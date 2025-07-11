// App.js or HomeScreen.js

import React, { useState ,useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { scale } from '../../utils/responsive';
import CountryDropdown from '../../components/CountryDropdown';
import GradientButton from '../../components/GradientButton';
import { styles } from './styles';
import CardSlider from '../../components/CardSlider';
import ViewCardSlider from '../../components/ViewCardSlider';
import { BackgroundGradient, BlackLogo, BottomImage, ButtomIcon } from '../../utils/Image';
import LoadingSpinner from '../../components/LoadingSpinner';

const HomeScreen = ({ navigation }) => {
    const [viewAll, setViewAll] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5 seconds loading time

        return () => clearTimeout(timer);
    }, []);

    const toggleView = () => {
        setViewAll(prevViewAll => !prevViewAll);
    };

    if (isLoading) {
        return (
          <LoadingSpinner />
        );
    }
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
                    <GradientButton title="GO" onPress={() => navigation.navigate('Bookanappoinment')} />
                </View>
                <View style={styles.bestDestinations}>
                    <Text style={styles.sectionTitle}>Best Destination</Text>
                    <TouchableOpacity onPress={toggleView}>
                        <Text style={styles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>
                {!viewAll ? (
                    <CardSlider />
                ) : (
                    <ViewCardSlider />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};
export default HomeScreen;
