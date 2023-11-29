import {StyleSheet} from 'react-native';
import color from '../../../Components/Common/colors';
const style = (width, height, isPortrait) =>
  StyleSheet.create({
    descriptionHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      color: color.black_level_3,
    },
    description: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: color.gery,
    },
    commonText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: color.gery,
      lineHeight: 25,
    },
    deliveryHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      marginBottom: 10,
    },
  });
export default style;
