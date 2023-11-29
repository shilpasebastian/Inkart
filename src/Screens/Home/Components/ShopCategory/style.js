import {StyleSheet} from 'react-native';
import color from '../../../../Components/Common/colors';
const style = (width, height) =>
  StyleSheet.create({
    container: {
      margin: 15,
    },
    head: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      textAlign: 'center',
    },
    flatList: {
      marginVertical: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
      marginBottom: 15,
    },
    itemName: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: color.black_level_2,
    },
    image: {
      width: 45,
      height: 45,
      resizeMode: 'contain',
    },
    imageView: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      padding: 10,
      marginBottom: 10,
    },
  });

export default style;
