import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap } from 'react-native-tab-view';
import { scale, verticalScale } from '../../../utils/responsive';
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {renderCustomTabBar()}
        <View style={{ flex: 1 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width }}
            renderTabBar={() => null}
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(20),
    flexGrow: 1,
  },
  customTabBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  tabItem: {
    paddingVertical: verticalScale(8),
    minHeight: verticalScale(38),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(18),
    borderRadius: scale(20),
    backgroundColor: '#fff',
    marginHorizontal: scale(6),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#AD842B',
    borderColor: '#AD842B',
  },
  tabText: {
    fontFamily: Poppins_Fonts.Poppins_Medium,
    fontSize: Math.min(scale(14), 16),
    color: colors.commonTextColor,
  },
  activeTabText: {
    fontFamily: Poppins_Fonts.Poppins_Medium,
    fontSize: Math.min(scale(14), 16),
    color: colors.text,
  },
  cardWrapper: {
    backgroundColor: '#fff',
    padding: scale(16),
    borderRadius: scale(12),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: scale(3),
    elevation: 2,
    marginHorizontal: scale(8),
  },
  cardTitle: {
    fontFamily: Geist_Fonts.Geist_SemiBold,
    fontSize: scale(22),
    color: colors.commonTextColor,
    marginBottom: verticalScale(10),
  },
  cardText: {
    fontFamily: Poppins_Fonts.Poppins_Regular,
    fontSize: scale(16),
    color: colors.commonTextColor,
    lineHeight: verticalScale(24),
  },
});

export default VisaDetailScreen;
