import {StyleSheet} from 'react-native';
import color from '../../Components/Common/colors';
const style = (width, height) =>
  StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: color.homeSecondaryBg,
    },
    productView: {
      width: '100%',
      padding: 15,
      marginRight: 15,
      marginVertical: 15,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.white,
      overflow: 'hidden',
    },
    productImage: {
      width: 75,
      height: 75,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginVertical: 10,
    },
    nameView: {
      borderLeftWidth: 1,
      paddingHorizontal: 10,
      marginLeft: 10,
      width: width * 0.68,
    },
    name: {fontFamily: 'Lato-Bold', fontSize: 20, color: color.black},
    des: {fontFamily: 'Lato-Regular', fontSize: 15, color: color.black_level_3},
    priceView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 15,
      width: width * 0.6,
    },
    priceView2: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    price: {fontFamily: 'Lato-Bold', fontSize: 15, color: color.black},
    offView: {
      padding: 5,
      borderRadius: 15,
      backgroundColor: color.primaryGreen,
      marginHorizontal: 5,
    },
    offText: {
      fontFamily: 'Lato-Bold',
      fontSize: 15,
      color: color.white,
      marginHorizontal: 10,
    },
    qunView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: color.primaryGreen,
      overflow: 'hidden',
      paddingVertical: 5,
    },
    qunText1: {
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      color: color.black,
      marginHorizontal: 8,
    },
    qunText2: {
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      color: color.primaryGreen,
      marginHorizontal: 5,
    },
  });

export default style;
