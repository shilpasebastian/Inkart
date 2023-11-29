import {StyleSheet, Dimensions} from 'react-native';
import color from '../../../../Components/Common/colors';
const {width, height} = Dimensions.get('screen');
const style = (width, height) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 15,
      borderBottomColor: color.black_level_3,
      borderBottomWidth: 1,
    },
    head: {
      fontFamily: 'Lato-Black',
      fontSize: 20,
      lineHeight: 50,
      color: color.black_level_1,
    },
    content: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      lineHeight: 30,
      color: color.black_level_1,
    },
    endContent: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      lineHeight: 30,
      marginBottom: 15,
      color: color.black_level_1,
    },
    headEnd: {
      fontFamily: 'Lato-Black',
      fontSize: 20,
      lineHeight: 50,
      color: color.white_level_3,
    },
    total: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      lineHeight: 50,
      color: color.black_level_1,
    },
  });
export default style;
