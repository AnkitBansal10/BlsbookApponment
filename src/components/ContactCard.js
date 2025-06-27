import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Italyflag ,Location ,CellPhone,Mail,World} from '../utils/Image';
import { Geist_Fonts, Poppins_Fonts } from '../utils/fonts';
import { colors } from '../utils/colors';
import { scale } from '../utils/responsive';

const ContactCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftSection}>
       
        <View style={styles.countryInfo}>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
             <Italyflag style={styles.flagIcon} 
        />
          <Text style={styles.countryName}>Italy</Text>
          </View>
          <View style={styles.location}>
            <Location
                                   style={{ }} />
            <Text style={styles.locationText}>Senegal</Text>
          </View>
        </View>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconCircle}>
         <CellPhone />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle}>
        <Mail />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCircle}>
          <World/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor:colors.primary, 
    borderRadius: 10,
    backgroundColor: '#fffaf0', 
    margin: 20, 
    // elevation: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagIcon: {
    width: 30, 
    height: 20, 
    resizeMode: 'contain',
    marginRight: 10,
  },
  countryInfo: {
    flexDirection: 'column',
  },
  countryName: {
    fontFamily:Geist_Fonts.Geist_Bold,
    fontSize:24, 
    color:colors.commonTextColor,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"flex-start",
    marginTop: 2, 
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontFamily:Poppins_Fonts.Poppins_Regular,
    fontSize: 14,
    color:colors.comanTextcolor2,
    marginLeft:6
  },
  rightSection: {
    flexDirection: 'row',
    gap: 10, 
  },
  iconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20, 
    backgroundColor: '#d4a754', 
  },
});

export default ContactCard;