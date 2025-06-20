import { scale, moderateScale, verticalScale } from '../../utils/responsive';
import { fonts_Mulish_Fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.primary,
        justifyContent:"center"
    },
    });
