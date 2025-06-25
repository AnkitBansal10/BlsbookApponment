// components/ResponsiveHeader.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Platform,
    SafeAreaView,
} from 'react-native';
import {
    BlackLogo,
    ProfileIcon,
    CheckIcon,
    PrintIcon,
    Cancel,
    LogOut,
} from '../utils/Image';
import { scale, verticalScale } from '../utils/responsive';
import { colors } from '../utils/colors';
import { Geist_Fonts } from '../utils/fonts';

const ResponsiveHeader = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleProfilePress = () => setIsMenuVisible(true);
    const handleCloseMenu = () => setIsMenuVisible(false);

    const MenuItem = ({ IconComponent, text, onPress, showDivider = true }) => (
        <>
            <TouchableOpacity style={styles.menuItem} onPress={onPress}>
                <IconComponent width={scale(25.2)} height={scale(28)} />
                <Text style={styles.menuItemText}>{text}</Text>
            </TouchableOpacity>
            {showDivider && <View style={styles.divider} />}
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <BlackLogo
                    width={scale(95.6)}
                    height={scale(60)}
                    style={styles.logo}
                />
                <TouchableOpacity
                    onPress={handleProfilePress}
                    style={styles.profileButton}
                >
                    <ProfileIcon width={scale(40)} height={scale(40)} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent
                visible={isMenuVisible}
                onRequestClose={handleCloseMenu}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={handleCloseMenu}
                >
                    <View style={styles.modalContent}>
                        <MenuItem
                            IconComponent={CheckIcon}
                            text="Book Your Appointment"
                            onPress={() => {
                                alert('Book Appointment Pressed');
                                handleCloseMenu();
                            }}
                        />
                        <MenuItem
                            IconComponent={PrintIcon}
                            text="Reprint Appointment Letter"
                            onPress={() => {
                                alert('Reprint Pressed');
                                handleCloseMenu();
                            }}
                        />
                        <MenuItem
                            IconComponent={Cancel}
                            text="Cancel Appointment"
                            onPress={() => {
                                alert('Cancel Pressed');
                                handleCloseMenu();
                            }}
                        />
                        <MenuItem
                            IconComponent={LogOut}
                            text="Logout"
                            showDivider={false}
                            onPress={() => {
                                alert('Logout Pressed');
                                handleCloseMenu();
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};
export default ResponsiveHeader;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: scale(20),
        height: verticalScale(80),
        backgroundColor: colors.headerBackground,
    },
    logo: {
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -scale(95.6) / 2 }],
        marginTop: scale(10),
        top: Platform.OS === 'android' ? 0 : scale(0),
    },
    profileButton: {
        backgroundColor: colors.profileButtonBg,
        borderRadius: scale(20),
        width: scale(40),
        height: scale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        top: scale(90),
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: Platform.OS === 'android' ? scale(0) : verticalScale(70),
        paddingRight: scale(10),
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: scale(12),
        paddingVertical: scale(10),
        width: scale(250),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: scale(2) },
        shadowOpacity: 0.25,
        shadowRadius: scale(3.84),
        elevation: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scale(12),
        paddingHorizontal: scale(20),
    },
    menuItemText: {
        marginLeft: scale(15),
        fontSize: scale(16),
        color: '#C28807',
        fontFamily: Geist_Fonts.Geist_Medium,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginHorizontal: scale(20),
    },
});

