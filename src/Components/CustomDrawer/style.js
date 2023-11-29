import {StyleSheet} from 'react-native';
import color from '../Common/colors';
const style = (width, height, isPortrait) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: color.white,
      marginVertical: 25,
      padding: 15,
      overflow: 'hidden',
    },
    drawerView: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      justifyContent: 'space-between',
    },
    drawerInnerView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
      marginRight: 14,
    },
    arrow: {
      backgroundColor: color.secondaryGreen,
      overflow: 'hidden',
      borderRadius: 15,
    },
    iconSecond: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
      backgroundColor: color.secondaryGreen,
      overflow: 'hidden',
      borderRadius: 25 / 2,
    },
    drawerText: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
    },
    logoutView: {
      borderColor: color.black_level_3,
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 9,
      backgroundColor: color.secondaryGreen,
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      borderRadius: 20,
      flexDirection: 'row',
    },
    logoutText: {fontFamily: 'Lato-Regular', fontSize: 18},
    supportView: {
      borderRadius: 20,
      backgroundColor: color.secondaryGreen,
      padding: 15,
      marginVertical: 15,
    },
    supportTouch: {
      borderRadius: 20,
      backgroundColor: color.primaryGreen,
      padding: 10,
      marginVertical: 15,
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    supportText: {
      fontFamily: 'Lato-Bold',
      fontSize: 10,
      color: color.white,
    },
    supportHead: {
      fontFamily: 'Lato-Black',
      fontSize: 20,
      lineHeight: 25,
    },
    supportContent: {
      fontFamily: 'Lato-Regular',
      fontSize: 15,
      lineHeight: 19,
    },
    image: {width: width * 0.2, height: width * 0.2, borderRadius: width * 0.2},
    accountTouch: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: color.black_level_3,
      paddingVertical: 15,
    },
    accountImageView: {
      width: 75,
      height: 75,
      borderRadius: 75 / 2,
      backgroundColor: color.white_level_3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    commonMergin: {marginVertical: 15},
    email: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: color.black_level_2,
    },
    name: {fontFamily: 'Lato-Bold', fontSize: 20, color: color.black_level_1},
    nameView: {marginLeft: 15, width: '65%'},
  });

export default style;
