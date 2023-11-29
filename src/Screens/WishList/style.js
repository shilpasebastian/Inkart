import {StyleSheet} from 'react-native';
import color from '../../Components/Common/colors';
const style = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white_level_3,
      padding: 15,
    },
    productView: {
      alignSelf: 'center',
      backgroundColor: color.white,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      width: width * 0.9,
      padding: 15,
      marginTop: 15,
    },
    cartIcon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
      marginRight: 15,
    },
    productImage: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
    },
    secondView: {
      borderLeftColor: color.gery,
      borderLeftWidth: 1,
      paddingLeft: 10,
      marginLeft: 10,
      width: width * 0.6,
      overflow: 'hidden',
    },
    title: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color: color.black,
    },
    desc: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: color.black_level_3,
    },
    bottomView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
    },
    offView: {
      borderRadius: 15,
      backgroundColor: color.primaryGreen,
      padding: 5,
      marginHorizontal: 5,
    },
    offText: {fontFamily: 'Lato-Regular', fontSize: 14, color: color.white},
    cartView: {
      borderRadius: 15,
      borderColor: color.primaryGreen,
      borderWidth: 1,
      padding: 3,
      marginVertical: 5,
    },
    cartText: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: color.primaryGreen,
    },
    price: {
      fontFamily: 'Lato-Bold',
      fontSize: 15,
      color: color.black,
    },
    removeView: {
      position: 'absolute',
      top: -10,
      right: 0,
      backgroundColor: color.red,
      borderRadius: 15,
      overflow: 'hidden',
      padding: 5,
    },
    remove: {
      marginLeft: 4,
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    cartCount: {
      position: 'absolute',
      right: 10,
      top: -10,
      backgroundColor: color.red,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      overflow: 'hidden',
      paddingHorizontal: 6,
      paddingVertical: 2,
      zIndex: 9,
    },
    count: {
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      color: color.white,
    },
  });
export default style;
