import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";
import { scale } from "../../../utils/responsive";
import { Geist_Fonts,} from "../../../utils/fonts";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
     inputview: {
        width: "100%",
        marginTop:scale(80),
    },
    logo: {
        marginTop: scale(50),
    },
    title: {
        fontSize: scale(20),
        color: colors.primary, // '#C28807'
        fontFamily: Geist_Fonts.Geist_SemiBold,
        lineHeight:scale(24)
    },
});