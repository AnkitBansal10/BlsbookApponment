import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";
import { Geist_Fonts, OpenSans_Fonts } from "../../../utils/fonts";
import { moderateScale, scale, verticalScale } from "../../../utils/responsive";
import { makeMutable } from "react-native-reanimated";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        marginBottom: scale(120),
    },
    image: {
        marginBottom: 40,
    },
    titleTextView: {
        marginBottom: moderateScale(26),
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: verticalScale(26),
        fontFamily: Geist_Fonts.Geist_Bold,
        color: colors.ButtonTextColor,
        margin: 10
    },
    subtitle: {
        fontSize: verticalScale(14),
        fontFamily: Geist_Fonts.Geist_Regular,
        color: '#fff',
    },
    inputview: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    forgetTextView: {
        marginTop: verticalScale(10),
        width: "90%",
        marginBottom: 20,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    forgetText: {
        fontSize: verticalScale(14),
        fontFamily: Geist_Fonts.Geist_SemiBold,
        color: colors.text
    },
    singuptextview: {
        marginTop: 30,
        alignItems: 'center',
    },
    accountText: {
        color: colors.text,
        fontFamily: Geist_Fonts.Geist_Medium,
        fontSize: 14,
        fontWeight: '400',
    },
    signUpText: {
        fontFamily: Geist_Fonts.Geist_Bold,
        color: colors.text,
        fontSize: 14,
    },
});
