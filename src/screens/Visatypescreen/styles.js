import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { scale, verticalScale } from "../../utils/responsive"; // Make sure to import these
import { Geist_Fonts, OpenSans_Fonts, Poppins_Fonts } from "../../utils/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerImage: {
        height: verticalScale(300),
        width: '100%',
        justifyContent: 'flex-start',
    },
    imageStyle: {
        width: '100%',
    },
    overlay: {
        paddingTop: verticalScale(60),
        paddingHorizontal: scale(16),
        alignItems: 'center',
        justifyContent: "flex-start",
        flexDirection: "row",
        position: "absolute",
        width: '100%',
    },
    backButton: {
        backgroundColor: colors.text,
        borderRadius: scale(50),
        justifyContent: "center",
        alignItems: "center",
        width: scale(34),
        height: verticalScale(34),
        zIndex: 10,
    },
    logo: {
        left: '150%',
        transform: [{ translateX: scale(-60) }],
    },
    subcaionter: {
        top: verticalScale(-20),
        backgroundColor: "#F0F0F0",
        padding: 20,
        flex: 1,
        borderTopStartRadius: scale(30),
        borderTopEndRadius: scale(30)
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flagRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        // width: 20,
        // height: 20,
        // borderRadius: 3,
        marginRight: 10,
    },
    country: {
        marginRight: 8,
        fontFamily: Geist_Fonts.Geist_Bold,
        fontSize: 20,
        fontWeight: '600',
        color: '#828181',
    },
    iconGroup: {
        flexDirection: 'row',
    },
    iconBtn: {
        backgroundColor: '#828181',
        padding: 6,
        borderRadius: 50,
        marginLeft: 8,
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center"
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#676767',
        fontFamily:Poppins_Fonts.Poppins_Regular,

    },
    title: {
    fontSize: 28,
    fontFamily:Geist_Fonts.Geist_Bold,

},
  highlight: {
    color:colors.primary , 
  },
  subtitle: {
    fontSize: 22,
    fontFamily:Geist_Fonts.Geist_SemiBold,
    color:colors.commonTextColor, // grey
    marginTop: 2,
  },
});