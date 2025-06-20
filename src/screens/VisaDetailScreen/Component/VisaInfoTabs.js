import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { scale } from '../../../utils/responsive';
import { Geist_Fonts, Poppins_Fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import VisaFeesCard from './VisaFeesCard';
import PhotoSpecifications from './PhotoSpecifications';

const { width } = Dimensions.get('window');

const InformationTab = () => (
  <View style={styles.cardWrapper}>
    <Text style={styles.cardTitle}>Information</Text>
    <Text style={styles.cardText}>
      The purpose of this visa is to travel to Italy as a tourist, either by taking a trip organised by a tour operator,
      or through individual booking of tickets and accommodation.
    </Text>
  </View>
);

const PhotoSpecificationTab = () => (
  <View style={styles.cardWrapper}>
    <Text style={styles.cardTitle}>Photo Specification</Text>
    <Text style={styles.cardText}>
      Provide a recent passport size photo with white background and no shadows. Dimensions should be 35mm x 45mm.
    </Text>
  </View>
);

const renderScene = SceneMap({
  info: InformationTab,
  fees: VisaFeesCard,
  photo: PhotoSpecifications,
});

const VisaDetailScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'info', title: 'Information' },
    { key: 'fees', title: 'Visa Fees' },
    { key: 'photo', title: 'Photo Specification' },
  ]);

  const renderCustomTabBar = () => (
    <View style={styles.customTabBar}>
      <ScrollView
      horizontal
       showsHorizontalScrollIndicator={false}
      >
      {routes.map((route, i) => {
        const isActive = index === i;
        return (
          <TouchableOpacity
            key={route.key}
            style={[styles.tabItem, isActive && styles.activeTab]}
            onPress={() => setIndex(i)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
      </ScrollView>
    </View>

  );
  return (
    <View style={styles.container}>
      {renderCustomTabBar()}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width }}
        renderTabBar={() => null} // hide default tab bar
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customTabBar: {
    width:"100%",
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:20,
    marginBottom:20
  },
  tabItem: {
    paddingVertical: 6,
    height: scale(42),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#AD842B',
    borderColor: '#AD842B',
  },
  tabText: {
    fontFamily: Poppins_Fonts.Poppins_Medium,
    fontSize: 14,
    color: colors.commonTextColor,
  },
  activeTabText: {
    fontFamily: Poppins_Fonts.Poppins_Medium,
    fontSize: 14,
    color: colors.text,
  },
  cardWrapper: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: Geist_Fonts.Geist_SemiBold,
    fontSize: 24,
    color: colors.commonTextColor,
    marginBottom: 10,
  },
  cardText: {
    fontFamily: Poppins_Fonts.Poppins_Regular,
    fontSize: 16,
    color: colors.commonTextColor,
  },
});

export default VisaDetailScreen;
