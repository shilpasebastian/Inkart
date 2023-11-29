import {StyleSheet} from 'react-native';
import color from '../../Components/Common/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const style = (width, height) =>
  StyleSheet.create({
    container: {height: height},
    topBg: {
      height: height * 0.2,
      width: width,
      resizeMode: 'cover',
    },
    ScrollView: {
      flex: 1,
      backgroundColor: color.white,
      marginTop: -width * 0.1,
      borderTopRightRadius: width * 0.05,
      borderTopLeftRadius: width * 0.05,
      overflow: 'hidden',
      padding: width * 0.02,
      marginBottom: width * 0.09,

      // paddingLeft: width * 0.03,
      // paddingRight: width * 0.03,
    },
    logo: {
      width: width * 0.4,
      height: width * 0.2,
      resizeMode: 'contain',
    },
    loginText: {
      fontFamily: 'Lato-Bold',
      fontSize: 23,
      color: color.steel,
    },
    createNew: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: color.steel,
      textAlign: 'center',
      marginVertical: width * 0.025,
    },
    footer: {
      padding: 15,
      marginBottom: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.secondaryGreen,
    },
    errorText: {
      fontFamily: 'Lato-Italic',
      fontSize: 15,
      color: color.red,
      marginTop: 20,
    },
  });

export default style;
