import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import { fetchNationalities } from '../features/auth/authThunks';
import { useDispatch, useSelector } from 'react-redux';

const PassportCountryDropdown = ({
  onValueChange,
  initialValue = null,
  label = "Passport Issue Country*"
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const dispatch = useDispatch();
  const { nationalities, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchNationalities());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const [items, countryMap] = useMemo(() => {
    if (!nationalities?.data) return [[], {}];
    
    const map = {};
    const dropdownItems = nationalities.data.map(country => {
      map[country.id] = country;
      return {
        label: country.name,
        value: country.id
      };
    });
    return [dropdownItems, map];
  }, [nationalities]);

  const handleValueChange = useCallback((selectedValue) => {
    setValue(selectedValue);
    
    if (selectedValue === null) {
      onValueChange?.(null);
      return;
    }
    
    const selectedCountry = countryMap[selectedValue];
    onValueChange?.(selectedCountry || null);
  }, [onValueChange, countryMap]);

  const ArrowDownIcon = useCallback(() => (
    <Icon name="chevron-down" size={24} color="#676767" />
  ), []);

  const ArrowUpIcon = useCallback(() => (
    <Icon name="chevron-up" size={24} color="#676767" />
  ), []);

  return (
    <View style={styles.container}>
      <DropDownPicker
        placeholder={loading ? "Loading countries..." : label}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={handleValueChange}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.text}
        placeholderStyle={styles.placeholder}
        showArrowIcon={true}
        ArrowDownIconComponent={ArrowDownIcon}
        ArrowUpIconComponent={ArrowUpIcon}
        listMode="MODAL"
        modalProps={{
          animationType: 'fade',
        }}
        modalContentContainerStyle={styles.modalContent}
        searchable={true}
        searchPlaceholder="Search countries..."
        searchContainerStyle={styles.searchContainer}
        searchTextInputStyle={styles.searchInput}
        disabled={loading}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    width: '100%',
    alignItems: 'center',
  },
  dropdown: {
    borderRadius: 10,
    height: 54,
    width: "90%",
    borderWidth: 1,
    borderColor: colors.borderColorSecondcolor,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderColor: colors.borderColorSecondcolor,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 2,
    width: "90%",
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: colors.comanTextcolor2,
  },
  placeholder: {
    fontFamily: Poppins_Fonts.Poppins_Regular,
    color: colors.comanTextcolor2,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchContainer: {
    borderBottomColor: colors.borderColorSecondcolor,
    paddingHorizontal: 0,
  },
  searchInput: {
    borderColor: colors.borderColorSecondcolor,
    borderRadius: 8,
  },
});

export default PassportCountryDropdown;