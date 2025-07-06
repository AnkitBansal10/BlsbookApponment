import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";
import { Geist_Fonts, OpenSans_Fonts,Poppins_Fonts } from "../../../utils/fonts";
import { moderateScale, scale, verticalScale } from "../../../utils/responsive";
import { makeMutable } from "react-native-reanimated";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.text,
    },
    logo: {
        marginBottom: scale(10),
        justifyContent:"center",
        alignItems:"center"
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
         fontSize: verticalScale(34),
        fontFamily: Geist_Fonts.Geist_Bold,
        color: colors.primary,
        margin: 10
    },
    subtitle: {
        fontSize: verticalScale(16),
              fontFamily:Poppins_Fonts.Poppins_Regular,
              color:colors.comanTextcolor2,
    },
    inputview: {
        width: "100%",
     justifyContent: "center",
        alignItems: "center",
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
        marginBottom:30,
        alignItems: 'center',
    },
    accountText: {
        color: colors.comanTextcolor2,
        fontFamily: Geist_Fonts.Geist_Medium,
        fontSize: scale(16),
        fontWeight: '400',
    },
    signUpText: {
        fontFamily:Poppins_Fonts.Poppins_Bold,
        color: colors.primary,
        fontSize:scale(16),
    },
});
