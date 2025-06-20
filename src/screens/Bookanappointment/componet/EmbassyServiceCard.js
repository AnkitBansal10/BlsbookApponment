import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Geist_Fonts, Poppins_Fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';

const serviceData = [
  {
    id: '1',
    title: 'Visa Information',
    icon: 'help-circle-outline',
    route: 'VisaDetailScreen',
  },
  {
    id: '2',
    title: 'Visa Application Centre',
    icon: 'office-building-outline',
    route: 'AdditionalServices',
  },
  {
    id: '3',
    title: 'News & Updates',
    icon: 'newspaper-variant-outline',
    route: 'HolidaysScreen',
  },
];

const EmbassyServiceCard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Embassy Services</Text>
      <FlatList
        data={serviceData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(item.route)}
          >
            <MaterialCommunityIcons name={item.icon} size={28} color="#9C6100" />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    fontSize: 16,
    fontFamily: Poppins_Fonts.Poppins_SemiBold,
    marginBottom: 12,
    color: '#333',
  },
  cardList: {
    gap: 12,
  },
  card: {
    width: 135,
    height: 116,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    marginTop: 10,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: Poppins_Fonts.Poppins_Medium,
    color: '#333',
    lineHeight: 18,
  },
});

export default EmbassyServiceCard;
