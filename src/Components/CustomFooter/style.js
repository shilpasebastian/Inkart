import {StyleSheet} from 'react-native';
import color from '../../Components/Common/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const style = (width, height, isPortrait) =>
  StyleSheet.create({
    mainContainer: {
      height: isPortrait ? height * 0.11 : height * 0.16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: color.primaryGreen,
    },
    touchContainer: {justifyContent: 'center', alignItems: 'center'},
    iconStyle: {
      width: isPortrait ? width * 0.065 : height * 0.065,
      height: isPortrait ? width * 0.065 : height * 0.065,
      resizeMode: 'cover',
    },
    footerText: {
      color: color.white,
      fontSize: 16,
      fontFamily: 'Lato-Bold',
      marginTop: isPortrait ? height * 0.008 : height * 0.015,
    },
    dot: {
      fontSize: 60,
      color: color.white,
      textAlign: 'center',
      fontFamily: 'Lato-Bold',
      marginTop: -height * 0.07,
    },
    cartCount: {
      position: 'absolute',
      right: -8,
      top: -2,
      backgroundColor: color.red,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      overflow: 'hidden',
      paddingHorizontal: 6,
      paddingVertical: 2,
      zIndex: 9,
    },
    count: {
      color: color.white,
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      textAlign: 'center',
    },
  });
export default style;
