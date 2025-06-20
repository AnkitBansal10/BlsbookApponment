import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

const TravelInsuranceCard = () => {
  return (
    <LinearGradient
      colors={['#f9d423', '#ff4e50']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.leftContent}>
        <Icon name="plane-departure" size={30} color="#fff" />
        <Icon name="suitcase-rolling" size={24} color="#fff" style={{ marginLeft: 10 }} />
      </View>

      <View style={styles.textContent}>
        <Text style={styles.title}>Buy</Text>
        <Text style={styles.subtitle}>Travel Insurance</Text>
        <Text style={styles.description}>from BLS for hassle free travel</Text>
      </View>

      <Icon name="umbrella-beach" size={20} color="#fff" style={styles.cornerIcon} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginTop:20,
    marginBottom:20,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    position: 'relative',
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
