import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { scale, verticalScale, moderateScale } from "../../utils/responsive";
import { Geist_Fonts, OpenSans_Fonts, Poppins_Fonts } from "../../utils/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: scale(24),
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: scale(10),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: scale(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: scale(20),
  },
  modalTitle: {
    fontSize: scale(20),
    fontFamily:Poppins_Fonts.Poppins_Bold,
    marginBottom: scale(8),
    textAlign: 'center',
    color:colors.primary,
  },
  modalSubtitle: {
    fontSize: scale(14),
    color:colors.borderColor,
    textAlign: 'center',
    fontFamily:Poppins_Fonts.Poppins_Regular,
    marginBottom: scale(25),
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(30),
  },
  emojiItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiButton: {
    padding: scale(8),
    marginBottom: scale(5),
  },
  emojiLabel: {
    fontSize: scale(12),
    color:colors.comanTextcolor2,
    textAlign: 'center',
  },
  feedbackTitle: {
    fontSize: scale(16),
    fontWeight:Poppins_Fonts.Poppins_Bold,
    marginBottom: scale(10),
    color:colors.commonTextColor,
  },
  optionalText: {
    fontSize: scale(12),
    color: '#999',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: scale(15),
    fontSize: scale(14),
    minHeight: scale(120),
    marginBottom: scale(25),
    textAlign: 'left',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});
