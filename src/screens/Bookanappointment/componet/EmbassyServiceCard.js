import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Geist_Fonts, Poppins_Fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { BankIcon,NewsIcon,Quintion } from '../../../utils/Image';
import { scale } from '../../../utils/responsive';

const serviceData = [
  {
    id: '1',
    title: 'Visa Information',
    Icon:Quintion,
    route: 'VisaDetailScreen',
  },
  {
    id: '2',
    title: 'Visa Application Centre',
    Icon: BankIcon,
    route: 'AdditionalServices',
  },
  {
    id: '3',
    title: 'News & Updates',
    Icon: NewsIcon,
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
            <item.Icon width={scale(27.08)} height={scale(28.44)}/>
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
    fontSize: 22,
    fontFamily: Poppins_Fonts.Poppins_SemiBold,
    marginBottom: 12,
    color:colors.commonTextColor,
  },
  cardList: {
    gap: 12,
  },
  card: {
    width: 135,
    height: 116,
    marginBottom:10,
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
    color:colors.comanTextcolor2,
    lineHeight: 18,
  },
});

export default EmbassyServiceCard;
