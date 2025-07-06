import React, { useState } from 'react';
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
  availableDates = [],
  unavailableDates = [],
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState('calendar');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const onDayPress = (day) => {
    console.log("hihhihhiih")
  const selected = day.dateString.trim();
  console.log('Pressed:', selected);
  const isUnavailable = unavailableDates.includes(selected);
  const isAvailable = availableDates.length === 0 || availableDates.includes(selected);
  if (!isAvailable || isUnavailable) {
    console.log('❌ Blocked: Either unavailable or not in availableDates');
    return;
  }
  console.log('✅ Selected:', selected);
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

    // 🔴 Unavailable
    unavailableDates.forEach((d) => {
      marked[d] = {
        disabled: true,
        disableTouchEvent: true,
        customStyles: {
          container: { backgroundColor: '#d9534f', borderRadius: 4 },
          text: { color:colors.text },
        },
      };
    });
    // 🟢 Available
    availableDates.forEach((d) => {
      if (!marked[d]) {
        marked[d] = {
          customStyles: {
            container: {  backgroundColor: '#4CAF50', borderRadius: 4 },
            text: { color:colors.text },
          },
        };
      }
    });

    // ✅ Selected
    if (date && !unavailableDates.includes(date)) {
      marked[date] = {
        selected: true,
        selectedColor: '#4CAF50',
        customStyles: {
          container: { backgroundColor: '#4CAF50', borderRadius: 4 },
          text: { color: '#fff' },
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
      <TouchableOpacity style={styles.inputBox} onPress={() => setModalVisible(true)}>
        <Text style={[styles.inputText, !date && { color: '#888' }]}>
          {date || placeholder}
        </Text>
        <ClanderIcon />
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
