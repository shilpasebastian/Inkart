import {StyleSheet} from 'react-native';
import color from '../../Components/Common/colors';
const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {padding: 15},
    reviewBox: {
      padding: 15,
      backgroundColor: color.white,
      borderRadius: 14,
      marginVertical: 10,
    },
  });

export default style;
