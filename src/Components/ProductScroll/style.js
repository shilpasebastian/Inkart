import {StyleSheet} from 'react-native';
import color from '../../Components/Common/colors';
const style = (width, height) =>
  StyleSheet.create({
    container: {
      padding: width * 0.05,
      backgroundColor: color.white,
    },
  });

export default style;
