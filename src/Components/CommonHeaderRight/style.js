import {StyleSheet} from 'react-native';
import color from '../Common/colors';
const style = (width, height) =>
  StyleSheet.create({
    padding: {paddingRight: 15},
    image: {width: 30, height: 30, resizeMode: 'contain'},
    cartCount: {
      position: 'absolute',
      right: 7,
      top: -6,
      backgroundColor: color.red,
      justifyContent: 'center',
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
    flexStyle: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });
export default style;
