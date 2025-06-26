import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SuccessIcon } from '../utils/Image';
import { scale } from '../utils/responsive';
import { Geist_Fonts, Poppins_Fonts } from '../utils/fonts';
import { colors } from '../utils/colors';
// import { SuccessIcon } from '../utils/Image';

const SuccessMessageCard = ({ userName, email }) => {
  const maskEmail = (email) => {
    if (!email) return '';
    const parts = email.split('@');
    if (parts.length !== 2) return email; // Not a valid email format
    const [localPart, domainPart] = parts;

    let maskedLocalPart = '';
    if (localPart.length <= 3) {
      maskedLocalPart = localPart.replace(/./g, '*'); // Mask all if very short
    } else {
      maskedLocalPart = localPart.substring(0, 2) + '*'.repeat(localPart.length - 3) + localPart.slice(-1);
    }

    // Mask domain part: show first two and asterisks, then the extension
    const domainParts = domainPart.split('.');
    if (domainParts.length >= 2) {
      const tld = domainParts.pop(); // Top-level domain (e.g., com)
      const mainDomain = domainParts.join('.'); // e.g., gm or example.com

      let maskedMainDomain = '';
      if (mainDomain.length <= 2) {
        maskedMainDomain = mainDomain.replace(/./g, '*');
      } else {
        maskedMainDomain = mainDomain.substring(0, 2) + '*'.repeat(mainDomain.length - 2);
      }
      return `${maskedLocalPart}@${maskedMainDomain}.${tld}`;
    }
    return `${maskedLocalPart}@${domainPart.replace(/./g, '*')}`; // Fallback if no TLD
  };

  const displayedEmail = maskEmail(email);

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
      <SuccessIcon width={scale(46.98)} height={46.95}/>
      </View>
      <Text style={styles.successTitle}>Success !</Text>
      <Text style={styles.bodyText}>
        Hi <Text style={styles.boldText}>{"Kapil mishra"}</Text> your appointment{'\n'} booking link has been sent to your {'\n'}registered email address:{"Ashroy037@gmail.com"}
      </Text>
      <Text style={styles.bodyText}>
        If the email is not visible in your {'\n'}Inbox please check your Spam or {'\n'}Junk  folder as your email settings{'\n'} may have redirected it there
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  margin: 20,
  shadowColor: '#000',
   shadowOffset: {
    width: -5,
    height: -20,
  },
  shadowOpacity: 0.1, 
  shadowRadius: 5,   
  elevation: 5,      
  },
  iconContainer: {
    width:"100%",
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: scale(24),
    fontFamily:Geist_Fonts.Geist_SemiBold,
    color:colors.commonTextColor,
    marginTop:10,
    marginBottom: 10,
  },
  bodyText: {
    fontSize: scale(16),
    color:colors.commonTextColor,
    fontFamily:Poppins_Fonts.Poppins_Regular,
    lineHeight: 24,
    marginTop:10,
    marginBottom: 10,
  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default SuccessMessageCard;



// Hi Kapil mishra your appointment
// booking link has been sent to your
// registered email address:
// mi***********1@gm**l.com