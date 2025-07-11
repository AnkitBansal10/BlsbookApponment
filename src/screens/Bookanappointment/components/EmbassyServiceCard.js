import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Geist_Fonts, Poppins_Fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import { BankIcon, NewsIcon, Quintion } from '../../../utils/Image';
import { scale } from '../../../utils/responsive';

// Memoized service data to prevent recreation
const serviceData = [
  {
    id: '1',
    title: 'Visa Information',
    Icon: Quintion,
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

const CARD_WIDTH = scale(135);
const CARD_HEIGHT = scale(116);

const EmbassyServiceCard = () => {
  const navigation = useNavigation();

  // Memoized render item function
  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.route)}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
      <item.Icon width={scale(27.08)} height={scale(28.44)} />
      <Text 
        style={styles.title}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  ), [navigation]);

  // Optimize FlatList performance
  const getItemLayout = useCallback((data, index) => ({
    length: CARD_WIDTH + styles.cardList.gap,
    offset: (CARD_WIDTH + styles.cardList.gap) * index,
    index,
  }), []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Embassy Services</Text>
      <FlatList
        data={serviceData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: scale(14),
  },
  header: {
    fontSize: scale(22),
    fontFamily: Poppins_Fonts.Poppins_SemiBold,
    marginBottom: scale(12),
    color: colors.commonTextColor,
    paddingHorizontal: scale(10),
  },
  cardList: {
    gap: scale(12),
    paddingHorizontal: scale(6),
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.text,
    borderRadius: scale(12),
    padding: scale(12),
    marginBottom:10,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: scale(4),
    shadowOffset: { width: 0, height: scale(2) },
  },
  title: {
    marginTop: scale(10),
    fontSize: scale(14),
    fontFamily: Poppins_Fonts.Poppins_Medium,
    color: colors.comanTextcolor2,
    lineHeight: scale(18),
  },
});

export default memo(EmbassyServiceCard);