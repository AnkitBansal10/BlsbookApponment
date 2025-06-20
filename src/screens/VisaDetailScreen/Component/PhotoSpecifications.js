import React from 'react';
import { View, Text, StyleSheet ,Image } from 'react-native';
import { Geist_Fonts, Poppins_Fonts } from '../../../utils/fonts';
import { colors } from '../../../utils/colors';
import { Check } from '../../../utils/Image';
import { scale } from '../../../utils/responsive';

const PhotoSpecifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Specifications</Text>
      <Text style={styles.note}>
       Note:-We regret we cannot accept photographs that do not meet these requirements.
      </Text>
      <View>
      <Image  source={require('../../../assets/images/Photo_Spec.gif')} style={{height:scale(100),width:scale(100)}}/>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>•  Piano</Text> Please provide one recent photograph (not more than 6 months old) of yourself, which should not have been used previously in the passport. The photograph should be in colour and:
        </Text>
        <View style={styles.indented}>
          <Text style={styles.listItem}>• Taken against a light background (white or off-white) so that features are distinguishable and contrast against the background.</Text>
          <Text style={styles.indentedItem}>apart from background.</Text>
          <Text style={styles.listItem}>• red color is a key point behind the face button.</Text>
          <Text style={styles.listItem}>• green texture is a key point behind the front panel.</Text>
          <Text style={styles.listItem}>• dark texture is a key point behind the top panel. A fitting or more visual coloring within the original screen</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={styles.note}>
       Note:- Please follow these instructions carefully. If photographs presented
        do not meet these requirements your application will be considered incomplete.
         A photo booth meeting these requirements is available at the centre..
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontFamily:Geist_Fonts.Geist_SemiBold,
    color:colors.commonTextColor,
    marginBottom: 12,
  },
  note: {
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 20,
  },
  listContainer: {
    marginBottom: 12,
  },
  listItem: {
    color:colors.comanTextcolor2,
    fontFamily:Poppins_Fonts.Poppins_Regular,
    fontSize:12,
    marginBottom: 4,
    lineHeight: 20,
  },
  indented: {
    marginLeft: 16,
  },
  indentedItem: {
    color:colors.primary,
     fontFamily:Poppins_Fonts.Poppins_Regular,
    fontSize:12,
    marginLeft: 16,
    marginBottom: 4,
    lineHeight: 20,
  },
  bold: {
    fontFamily:Geist_Fonts.Geist_SemiBold,
    fontSize:14,
  color:colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
  },
});

export default PhotoSpecifications;