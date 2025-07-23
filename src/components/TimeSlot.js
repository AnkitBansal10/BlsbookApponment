import React, { useState ,useEffect} from 'react';
import { availability } from '../features/auth/authThunks';
import { useDispatch,useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';

const TimeSlot = ({value, onChange}) => {
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
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.Text}
        iconStyle={styles.iconStyle}
        iconColor={colors.comanTextcolor2}
        data={timeSlotOptions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Time Slot"
        value={value}
        onChange={onChange}
      />
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
  placeholderStyle: {
    fontSize: 16,
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: colors.comanTextcolor2
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
});

export default TimeSlot;