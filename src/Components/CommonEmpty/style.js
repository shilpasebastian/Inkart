import {StyleSheet} from 'react-native';
import color from '../../Components/Common/colors';
const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      borderColor: color.red,
      borderWidth: 1,
      padding: 10,
      backgroundColor: color.tranRed,
    },
    title: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: color.red,
    },
  });

export default style;
