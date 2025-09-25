import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";
import { scale,verticalScale,moderateScale,fontScale,platformScale } from "../../../utils/responsive";
import { Geist_Fonts,Poppins_Fonts} from "../../../utils/fonts";


export const styles = StyleSheet.create({
 container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputview: {
        width: "100%",
        marginTop: verticalScale(80),
    },
    logo: {
        marginTop: verticalScale(50),
    },
    title: {
        fontSize: fontScale(20),
        color: colors.primary,
        fontFamily: Geist_Fonts.Geist_SemiBold,
        lineHeight: moderateScale(24),
    },
    uploadContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(10),
        marginBottom: verticalScale(20),
    },
    submitButton: {
        backgroundColor: colors.primary,
        padding: verticalScale(15),
        borderRadius: moderateScale(8),
        marginTop: verticalScale(20),
        width: platformScale('80%'),
        alignSelf: 'center',
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: Poppins_Fonts.Poppins_SemiBold,
        fontSize: fontScale(16),
    },
});