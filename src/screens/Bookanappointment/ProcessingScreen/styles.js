import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";
import { scale, verticalScale, moderateScale } from "../../../utils/responsive";
import { Geist_Fonts, OpenSans_Fonts, Poppins_Fonts } from "../../../utils/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.text,
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
    marginTop: scale(50),
  },
  title: {
    fontSize: scale(34),
    color: colors.primary,
    fontFamily: Geist_Fonts.Geist_Bold,
  },
  subtitle: {
    fontSize: scale(16),
    color: colors.comanTextcolor2,
    fontFamily: OpenSans_Fonts.OpenSans_Regular,
    marginTop: scale(2),
  },
  RefreshContainer: {
    width: "100%",
    padding:16.
  },
  SubContainer:{
    backgroundColor:colors.borderColor,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    height:66
  },
  textstyling:{
    fontSize:16,
    color:colors.text,
   fontFamily:Geist_Fonts.Geist_Medium
  }
});
