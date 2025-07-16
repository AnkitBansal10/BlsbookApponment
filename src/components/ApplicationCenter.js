import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../utils/colors';
import { Poppins_Fonts } from '../utils/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcenter } from '../features/auth/authThunks';

const ApplicationCenter = () => {
    const [value, setValue] = useState(null);
    const [dropdownData, setDropdownData] = useState([]);
    const dispatch = useDispatch();
    const { centers, loading, error } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchcenter());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
        }
    }, [error]);

    useEffect(() => {
        if (centers && centers.data) {
            // Transform the centers data to match the dropdown format
            const formattedData = centers.data.map(center => ({
                label: `${center.l_name}`,
                value: center.l_id,
                originalData: center // Keep original data if needed
            }));
            setDropdownData(formattedData);
        }
    }, [centers]);

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                iconColor={colors.comanTextcolor2}
                textStyle={styles.text}
                itemTextStyle={styles.itemText}
                selectedItemTextStyle={styles.selectedItemText}
                data={dropdownData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select application center"
                value={value}
                onChange={item => {
                    setValue(item.value);
                    // You can access the full center data with item.originalData if needed
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20
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
    text: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.commonTextColor,
    },
    iconStyle: {
        width: 32,
        height: 16,
    },
    itemText: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.commonTextColor,
    },
    selectedItemText: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.commonTextColor,
    },
});

export default ApplicationCenter;