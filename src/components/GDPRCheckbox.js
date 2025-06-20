import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../utils/responsive'; // Optional
import { colors } from '../utils/colors';

const GDPRCheckbox = ({ checked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container} activeOpacity={0.8}>
      <View style={styles.checkbox}>
        {checked && <Icon name="check" size={20} color={colors.ButtonColor} />}
      </View>
      <Text style={styles.label}>
        I accept to the <Text style={styles.bold}>GDPR compliances & Terms{'\n'}& conditions</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
    alignItems:"center",
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: scale(12),
    paddingHorizontal: scale(20),
    left:scale(24)
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 3,
    marginTop: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: scale(13),
    color: colors.text,
    lineHeight: scale(18),
    flex: 1,
  },
  bold: {
    fontWeight: '500',
    color: colors.text,
  },
});

export default GDPRCheckbox;
