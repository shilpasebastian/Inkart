import {StyleSheet, Dimensions} from 'react-native';
import color from '../../Components/Common/colors';
const style = (width, height) =>
  StyleSheet.create({
    main: {flex: 1},
    container: {backgroundColor: color.white_level_2},
    catImage: {
      width: width * 0.2,
      height: height * 0.2,
      resizeMode: 'contain',
      margin: 10,
    },
    catFlatStyle: {
      padding: 10,
      backgroundColor: color.secondaryGreen,
      width: width * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    catTouch: {
      borderBottomColor: color.black_level_3,
      borderBottomWidth: 0.8,
    },
    rowStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    backImage: {
      width: width * 0.65,
      height: height * 0.175,
      resizeMode: 'contain',
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 15,
      overflow: 'hidden',
      padding: 15,
    },
    catName: {
      fontFamily: 'Lato-Black',
      fontSize: 22,
    },
    catDes: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
    },
    proName: {
      fontFamily: 'Lato-Bold',
      fontSize: 14,
    },
    proDes: {
      justifyContent: 'center',
      fontSize: 10,
    },
    proStyle: {
      justifyContent: 'center',
      padding: 10,
    },
    proContainer: {
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    proImage: {
      width: width * 0.15,
      height: height * 0.15,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    imageBg: {
      backgroundColor: color.secondaryGreen,
      padding: 10,
      justifyContent: 'center',
      borderRadius: 15,
      marginBottom: 5,
    },
  });

export default style;
