import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";
import { scale } from "../../../utils/responsive";
import { Geist_Fonts, OpenSans_Fonts, Poppins_Fonts } from "../../../utils/fonts";
export const styles = StyleSheet.create({
    container: {
      
        flex: 1,
        backgroundColor: '#fff',
    },
     inputview: {
        width: "100%",
        // margin:10,
    left:"6%"
       
    },
    logo: {
        marginTop: scale(50),
    },
    title: {
        fontSize: scale(34),
        color: colors.primary, // '#C28807'
        fontFamily: Geist_Fonts.Geist_Bold,
    },
    subtitle: {
        fontSize: scale(16),
        color: colors.comanTextcolor2,
        fontFamily: OpenSans_Fonts.OpenSans_Regular,
        marginTop: scale(2),
    },
});