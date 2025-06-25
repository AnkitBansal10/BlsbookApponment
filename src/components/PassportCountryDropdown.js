import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../utils/colors';
import { countries } from '../utils/MockData';



const PassportCountryDropdown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    return (
        <View style={styles.container}>
            <DropDownPicker
                placeholder="Passport Issue Country*"
                open={open}
                value={value}
                items={countries}
                setOpen={setOpen}
                setValue={setValue}
                setItems={() => { }}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.text}
                placeholderStyle={styles.placeholder}
                showArrowIcon={true}
                ArrowDownIconComponent={() => (
                    <Icon name="chevron-down" size={24} color="#676767" />
                )}
                ArrowUpIconComponent={() => (
                    <Icon name="chevron-up" size={24} color="#676767" />
                )}
                listMode="MODAL" // Optional: Change to 'SCROLLVIEW' if you prefer
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 1000, // Important for dropdown to overlap other elements
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    dropdown: {
        borderRadius: 10,
        height: 54,
        width: "90%",
         borderWidth:1,
        borderColor:colors.borderColorSecondcolor
    },
    dropdownContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 2,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    placeholder: {
        color: '#999',
        fontSize: 16,
    },
});

export default PassportCountryDropdown;