import React, { useState ,useEffect} from 'react';
import { availability } from '../features/auth/authThunks';
import { useDispatch,useSelector } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import { scale } from '../utils/responsive';

const TimeSlot = ({value, onChange, hasError, errorMessage}) => {
  const dispatch = useDispatch()
    const {availabilitys ,error,loading} =useSelector(state => state.auth)
 
    console.log("availability",availabilitys)

  useEffect(() => {
    dispatch(availability({ location_id: "1" ,appointment_date:"2025-07-22",slot_type:"normal_slots"}));
  }, [dispatch]);

  const timeSlotOptions = availabilitys?.map(slot => ({
    label: slot.slot_time,
    value: slot.id,
  })) || [];

  console.log("timeSlotOptions",timeSlotOptions)

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, hasError && styles.dropdownError]}
        placeholderStyle={[styles.placeholderStyle, hasError && styles.errorPlaceholder]}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.Text}
        iconStyle={styles.iconStyle}
        iconColor={hasError ? colors.error : colors.comanTextcolor2}
        data={timeSlotOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Time Slot"
        value={value}
        onChange={onChange}
      />
      {hasError && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20
  },
  dropdown: {
    height: 60,
    borderColor: colors.borderColorSecondcolor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownError: {
    borderColor: colors.error,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: colors.comanTextcolor2
  },
  errorPlaceholder: {
    color: colors.error,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: colors.comanTextcolor2
  },
  Text: {
    fontSize: 16,
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: colors.comanTextcolor2
  },
  iconStyle: {
    width: 32,
    height: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: scale(12),
    marginTop: 4,
    marginLeft: 8,
    fontFamily: Poppins_Fonts.Poppins_Regular,
  },
});

export default TimeSlot;
