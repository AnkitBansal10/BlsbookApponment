import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    StatusBar
} from 'react-native';
import {
    ChevronLeft,
    Settings,
    Heart,
    Download,
    Globe,
    MapPin,
    PlayCircle,
    Monitor,
    Trash2,
    History,
    LogOut,
    Camera
} from 'lucide-react-native';
import { colors } from '../../utils/colors';
import { BackgroundGradient } from '../../utils/Image';
import { Poppins_Fonts } from '../../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {  
    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], 
        });
    };
    const handleMenuItemPress = (screenName) => {
        if (screenName === 'Log Out') {
            handleLogout();
        } else if (screenName === 'FeedBack') {
            navigation.navigate('FeedBack'); 
        } else {
            navigation.navigate(screenName);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <BackgroundGradient
                style={{ position: "absolute", width: '100%', height: '100%' }}
            />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="chevron-back" size={24} color="#828181" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>My Profile</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Settings size={24} color="#374151" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://placehold.co/80x80/000000/FFFFFF?text=Profile' }}
                                style={styles.avatar}
                                onError={() => console.log("Image failed to load")}
                            />
                            <View style={styles.cameraIcon}>
                                <Camera size={16} color="#000" />
                            </View>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.name}>Sabrina Aryan</Text>
                            <Text style={styles.email}>SabrinaAry208@gmail.com</Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => navigation.navigate('EditProfile')}
                            >
                                <Text style={styles.editButtonText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        <MenuItem
                            icon={<Heart size={20} />}
                            text="Favourites"
                            onPress={() => handleMenuItemPress('Favorites')}
                        />
                        <MenuItem
                            icon={<Download size={20} />}
                            text="Downloads"
                            onPress={() => handleMenuItemPress('Downloads')}
                        />
                        <View style={styles.divider} />
                        <MenuItem
                            icon={<Globe size={20} />}
                            text="Languages"
                            onPress={() => handleMenuItemPress('Languages')}
                        />
                        <MenuItem
                            icon={<MapPin size={20} />}
                            text="FeedBack"
                            onPress={() => handleMenuItemPress('FeedBack')}
                        />
                        <MenuItem
                            icon={<PlayCircle size={20} />}
                            text="Subscription"
                            onPress={() => handleMenuItemPress('Subscription')}
                        />
                        <MenuItem
                            icon={<Monitor size={20} />}
                            text="Display"
                            onPress={() => handleMenuItemPress('DisplaySettings')}
                        />
                        <View style={styles.divider} />
                        <MenuItem
                            icon={<Trash2 size={20} />}
                            text="Clear Cache"
                            onPress={() => handleMenuItemPress('ClearCache')}
                        />
                        <MenuItem
                            icon={<History size={20} />}
                            text="Clear History"
                            onPress={() => handleMenuItemPress('ClearHistory')}
                        />
                        <MenuItem
                            icon={<LogOut size={20} />}
                            text="Log Out"
                            onPress={() => handleMenuItemPress('Log Out')}
                        />
                    </View>
                    <View style={styles.versionContainer}>
                        <Text style={styles.versionText}>App Version 2.3</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const MenuItem = ({ icon, text, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={onPress}
        >
            <View style={styles.menuItemContent}>
                <View style={styles.menuIcon}>
                    {icon}
                </View>
                <Text style={styles.menuText}>{text}</Text>
            </View>
            <ChevronLeft size={16} color="#9CA3AF" style={styles.arrowIcon} />
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    card: {
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Poppins_Fonts.Poppins_Medium,
        color: colors.comanTextcolor2,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#D1D5DB',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontFamily: Poppins_Fonts.Poppins_Medium,
        color: colors.comanTextcolor2,
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2,
        marginBottom: 8,
    },
    editButton: {
        backgroundColor: colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    menuContainer: {
        paddingHorizontal: 8,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        marginRight: 16,
        color: '#6B7280',
    },
    menuText: {
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Medium,
        color: colors.comanTextcolor2,
    },
    arrowIcon: {
        transform: [{ rotate: '180deg' }],
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 8,
    },
    versionContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        alignItems: 'center',
    },
    versionText: {
        fontSize: 12,
        color: '#6B7280',
    },
});

export default ProfileScreen;