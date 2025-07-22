import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { appointmentholiday, appointment_workplan } from '../features/auth/authThunks';
import { useDispatch, useSelector } from 'react-redux';
import { scale } from '../utils/responsive';
import { ClanderIcon } from '../utils/Image';
import { colors } from '../utils/colors';

const generateYears = (start = 1950, end = new Date().getFullYear()) => {
  return Array.from({ length: end - start + 1 }, (_, i) => `${start + i}`).reverse();
};

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AppointmentDate = ({
  date,
  setDate,
  placeholder = "Select Date",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState('calendar');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const dispatch = useDispatch();
  const { Holidays, loading, error, appointmentworkplans } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(appointmentholiday({ location_id: "1" }));
    dispatch(appointment_workplan({ location_id: "1" }));
  }, [dispatch]);

console.log(date)
  const onDayPress = (day) => {
    const selected = day.dateString.trim();
    console.log("day",day?.dateString.trim())
    if (appointmentworkplans?.onlyWorkingDates && 
        !appointmentworkplans?.onlyWorkingDates.includes(selected)) {
      Alert.alert(
        'Not Available',
        'This date is not available for appointment',
        [{ text: 'OK' }]
      );
      return;
    }
    setDate(selected);
    setModalVisible(false);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(parseInt(year));
    setMode('month');
  };

  const handleMonthSelect = (index) => {
    setSelectedMonth(index);
    setMode('calendar');
  };

const getCurrentMarked = () => {
  const marked = {};
  
  // 1. Mark holidays (yellow)
  if (Holidays) {
    Holidays.forEach((d) => {
      if (d !== date) { // Skip if this is the selected date
        marked[d] = {
          disabled: true,
          disableTouchEvent: true,
          customStyles: {
            container: { 
              backgroundColor: colors.Holiday, 
              borderRadius: 4 
            },
            text: { 
              color: colors.text 
            },
          },
        };
      }
    });
  }

  // 2. Mark weekly off (gray)
  if (appointmentworkplans?.datesWeeklyOff) {
    appointmentworkplans.datesWeeklyOff.forEach((d) => {
      if (d !== date) { // Skip if this is the selected date
        marked[d] = {
          disabled: true,
          disableTouchEvent: true,
          customStyles: {
            container: { 
              backgroundColor: colors.WeeklyOffDay, 
              borderRadius: 4 
            },
            text: { 
              color: colors.text 
            },
          },
        };
      }
    });
  }

  // 3. Mark available dates (blue)
  if (appointmentworkplans?.onlyWorkingDates) {
    appointmentworkplans.onlyWorkingDates.forEach((d) => {
      if (!marked[d] && d !== date) { // Skip if this is the selected date
        marked[d] = {
          customStyles: {
            container: { 
              backgroundColor: colors.AppointmentAvailable, 
              borderRadius: 4 
            },
            text: { 
              color: colors.text 
            },
          },
        };
      }
    });
  }

  // 4. Mark slot-full dates
  if (appointmentworkplans?.datesSlotfull) {
    appointmentworkplans.datesSlotfull.forEach((d) => {
      if (!marked[d] && d !== date) { // Skip if this is the selected date
        marked[d] = {
          customStyles: {
            container: { 
              backgroundColor: colors.AppointmentBooked, 
              borderRadius: 4 
            },
            text: { 
              color: colors.text 
            },
          },
        };
      }
    });
  }

  // 5. Apply selected date styling (highest priority)
   if (date) {
    marked[date] = {
      selected: true,
      selectedColor:colors.CurrentlySelectedDay,
      customStyles: {
        container: {
          backgroundColor:colors.CurrentlySelectedDay,
          borderRadius: 4,
          elevation: 2,
        },
        text: {
          color:colors.text,
          fontWeight: "bold",
        },
      },
    };
  }

  return marked;
};


  const getCalendarDate = () => {
    return `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-01`;
  };

  return (
    <View>
      <TouchableOpacity 
        style={[
          styles.inputBox,
          date && { borderColor: colors.blue } // Highlight border when date is selected
        ]} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.inputText, !date && { color: '#888' }]}>
          {date || placeholder}
        </Text>
        <ClanderIcon color={date ? colors.blue : colors.gray} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.calendarWrapper}>
            {mode === 'calendar' && (
              <>
                <View style={styles.header}>
                  <TouchableOpacity onPress={() => setMode('year')}>
                    <Text style={styles.headerText}>{selectedYear}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setMode('month')}>
                    <Text style={styles.headerText}>{months[selectedMonth]}</Text>
                  </TouchableOpacity>
                </View>
                <Calendar
                  current={getCalendarDate()}
                  onDayPress={onDayPress}
                  markedDates={getCurrentMarked()}
                  markingType="custom"
                  maxDate={new Date().toISOString().split('T')[0]}
                  theme={{
                    todayTextColor: colors.primary,
                    arrowColor: colors.primary,
                  }}
                />
              </>
            )}
            {mode === 'year' && (
              <FlatList
                data={generateYears(1950)}
                keyExtractor={(item) => item}
                numColumns={3}
                contentContainerStyle={styles.gridList}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleYearSelect(item)} style={styles.gridItem}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            {mode === 'month' && (
              <FlatList
                data={months}
                keyExtractor={(item) => item}
                numColumns={3}
                contentContainerStyle={styles.gridList}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => handleMonthSelect(index)} style={styles.gridItem}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppointmentDate;

const styles = StyleSheet.create({
  inputBox: {
    height: 60,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.borderColorSecondcolor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  inputText: {
    fontSize: scale(14),
    color: '#000',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarWrapper: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  gridList: {
    padding: 12,
  },
  gridItem: {
    width: '30%',
    padding: 12,
    margin: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    alignItems: 'center',
  },
});