import { StyleSheet } from "react-native";
import { Geist_Fonts, Poppins_Fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { moderateScale, scale, verticalScale } from "../../utils/responsive";


export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor:colors.text
    },
    gradientBackground: {
        flex: 1,
    },
    header: {
        marginTop: 40,
        paddingHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 40,
        alignSelf: 'center',
    },
    title: {
        fontSize: 38,
        fontFamily: Geist_Fonts.Geist_Regular,
        marginTop: 20,
        marginBottom: 10,
        color:colors.commonTextColor,
    },
    subtitle: {
        fontSize: 38,
        fontFamily: Geist_Fonts.Geist_SemiBold,
      color:colors.commonTextColor,
      textAlign:"justify"
    },
    vector: {
        left: moderateScale(190),
        top: scale(-8)
    },
    highlight: {
        fontSize:38,
        fontFamily:Geist_Fonts.Geist_Bold,
        color:colors.primary
    },
    subHeading: {
        fontSize:20,
        color: colors.commonTextColor,
        marginBottom: 15,
        fontFamily: Geist_Fonts.Geist_SemiBold
    },
    form: {
        // padding: 20,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ECECEC',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    icon: {
        marginRight: 8,
    },
    goButton: {
        width: "40%",
        backgroundColor: '#d8a441',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    goText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    bestDestinations: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        // marginTop: 10,
        // marginBottom:20,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize:20,
        color:colors.commonTextColor,
        fontFamily: Geist_Fonts.Geist_SemiBold
    },
    viewAll: {
        color:colors.primary,
        fontFamily:Poppins_Fonts.Poppins_Regular,
        fontSize: 14,
    },
    cards: {
        marginTop: 10,
        paddingLeft: 20,
    },
    card: {
        width: 140,
        height: 180,
        borderRadius: 10,
        marginRight: 15,
    },
});