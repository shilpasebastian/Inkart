import {StyleSheet, Dimensions} from 'react-native';
import color from '../../Components/Common/colors';
const style = (width, height) =>
  StyleSheet.create({
    container: {backgroundColor: color.white_level_3, flex: 1},
    flatView: {
      backgroundColor: color.secondaryGreen,
      borderRadius: 15,
      padding: 15,
      overflow: 'hidden',
      marginTop: 15,
      marginHorizontal: 15,
    },
    innerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: color.gery,
      borderBottomWidth: 1,
      paddingBottom: 15,
    },
    orderId: {
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      color: color.primaryGreen,
    },
    orderDate: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: color.primaryGreen,
    },
    address: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: color.gery,
    },
    paidText: {
      fontFamily: 'Lato-Regular',
      fontSize: 14,
      color: color.black,
    },
    greenText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: color.primaryGreen,
    },
    bottomText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: color.black_level_3,
    },
    bottomView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 15,
    },
    mapImg: {
      width: 75,
      height: 75,
      borderRadius: 15,
      overflow: 'hidden',
      resizeMode: 'cover',
    },
  });

export default style;
