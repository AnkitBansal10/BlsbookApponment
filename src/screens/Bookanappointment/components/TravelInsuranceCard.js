import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../utils/colors';
import { FlightBAg  ,TravelInsurances,BeachIcon} from '../../../utils/Image';

const TravelInsuranceCard = () => {
  return (
    <View style={styles.card}>
      {/* SVG Background */}
      <View style={styles.svgBackground}>
        <TravelInsurances width="406.36" height="100%" />
      </View>
      
      {/* Content */}
      <View style={styles.leftContent}>
        <FlightBAg width={69} height={57} />
      </View>

      <View style={styles.textContent}>
        <Text style={styles.title}>Buy</Text>
        <Text style={styles.subtitle}>Travel Insurance</Text>
        <Text style={styles.description}>from BLS for hassle free travel</Text>
      </View>
      <BeachIcon  width={20.6} height={20.53} style={styles.cornerIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
  flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    height: 120,
    backgroundColor:colors.primary, // fallback color
  },
   svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  textContent: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  cornerIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default TravelInsuranceCard;



