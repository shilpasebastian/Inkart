import {StyleSheet} from 'react-native';
import color from '../../../../Components/Common/colors';
const style = (width, height) =>
  StyleSheet.create({
    conatiner: {
      backgroundColor: color.secondaryGreen,
      borderRadius: 15,
      margin: 15,
      padding: 15,
    },
    head: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      marginBottom: 10,
    },
    contentView: {
      backgroundColor: color.white,
      padding: 15,
      marginRight: 15,
      borderRadius: 15,
    },
    image: {
      width: 40,
      height: 40,
      resizeMode: 'center',
    },
  });

export default style;
