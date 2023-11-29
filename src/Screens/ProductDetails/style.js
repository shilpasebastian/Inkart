import {StyleSheet} from 'react-native';
import color from '../../Components/Common/colors';
const style = (width, height, isPortrait) =>
  StyleSheet.create({
    proImage: {
      width: width,
      height: width * 0.7,
      resizeMode: 'contain',
      marginVertical: 25,
    },
    heart: {
      position: 'absolute',
      right: 0,
      marginTop: 10,
    },
    mainView: {
      backgroundColor: color.white,
      // padding: width * 0.1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      // shadowColor: color.black,
      // shadowOffset: {width: 2, height: 2},
      // shadowOpacity: 0.2,
      // shadowRadius: 5,
      elevation: 15,
      paddingBottomBottom: 100,
      marginBottom: 40,
    },
    padding: {
      padding: width * 0.1,
    },
    name: {
      fontFamily: 'Lato-Black',
      fontSize: 30,
      marginBottom: 10,
      color: color.black_level_3,
    },
    price: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      marginVertical: 10,
      color: color.black_level_3,
    },
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
  });

export default style;
