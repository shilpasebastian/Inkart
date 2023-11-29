import {StyleSheet} from 'react-native';
import color from '../Common/colors';
const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      borderRadius: 15,
      backgroundColor: color.primaryGreen,
      padding: 15,
      width: width * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 18,
      alignSelf: 'center',
    },
    text: {
      color: color.white,
      fontFamily: 'Lato-Bold',
      fontSize: 22,
    },
  });
export default style;
