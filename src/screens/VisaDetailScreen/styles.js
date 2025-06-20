import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { scale, verticalScale, moderateScale } from "../../utils/responsive";
import { Geist_Fonts, OpenSans_Fonts, Poppins_Fonts } from "../../utils/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#F0F0F0",
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
    left: '44%',
    transform: [{ translateX: scale(-60) }],
  },
  subcaionter: {
    top: verticalScale(-20),
    backgroundColor: "#F0F0F0",
    padding: moderateScale(20),
  
    borderTopStartRadius: scale(30),
    borderTopEndRadius: scale(30),
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
    marginRight: scale(10),
  },
  country: {
    marginRight: scale(8),
    fontFamily: Geist_Fonts.Geist_Bold,
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#828181',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  iconBtn: {
    backgroundColor: '#828181',
    padding: moderateScale(6),
    borderRadius: scale(50),
    marginLeft: scale(8),
    width: scale(35),
    height: verticalScale(35),
    justifyContent: "center",
    alignItems: "center",
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
  locationText: {
    marginLeft: scale(4),
    fontSize: moderateScale(14),
    color:colors.comanTextcolor2,
    fontFamily: Poppins_Fonts.Poppins_Regular,
  },
  title: {
   color: colors.primary,
   textAlign:"left",
    fontFamily: Geist_Fonts.Geist_Bold,
    fontSize: moderateScale(26),
  },
});
