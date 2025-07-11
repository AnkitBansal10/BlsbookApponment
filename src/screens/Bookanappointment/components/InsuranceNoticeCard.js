import React, { memo } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Poppins_Fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import { scale } from '../../../utils/responsive';

const InsuranceNoticeCard = () => {
  return (
    <ImageBackground
      source={require('../../../assets/images/Maskgroup.png')}
      style={styles.card}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.contentContainer}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons 
            name="bell-outline" 
            size={scale(18)} 
            color={colors.primaryDark} 
          />
        </View>
        <Text style={styles.text}>
          Please note that Medical insurance is a mandatory document. We recommend that you
          purchase insurance from the Visa Application Center or from an authorized agency.
          <Text style={styles.date}> 21 May 25</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const CARD_HEIGHT = scale(207);
const ICON_SIZE = scale(28);
const ICON_WRAP_SIZE = scale(28);

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    borderRadius: scale(12),
    padding: scale(16),
    marginTop: scale(16),
    overflow: 'hidden',
  },
  backgroundImage: {
    borderRadius: scale(12),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: ICON_WRAP_SIZE,
    height: ICON_WRAP_SIZE,
    borderRadius: ICON_WRAP_SIZE / 2,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
    marginTop: scale(4),
  },
  text: {
    flex: 1,
    fontSize: scale(14),
    lineHeight: scale(20),
    color: colors.text,
    fontFamily: Poppins_Fonts.Poppins_Regular,
  },
  date: {
    fontFamily: Poppins_Fonts.Poppins_SemiBold,
    color: colors.textPrimary,
  },
});

export default memo(InsuranceNoticeCard);