import {StyleSheet} from 'react-native';
import color from '../Common/colors';
const style = (width, height) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 15,
    },
    newContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 15,
    },
    search: {
      borderWidth: 1,
      borderColor: color.primaryGreen,
      backgroundColor: color.secondaryGreen,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      paddingLeft: 5,
      paddingRight: 5,
      // padding: 3,
      width: width * 0.95,
    },
    newStyle: {
      borderWidth: 1,
      borderColor: color.primaryGreen,
      backgroundColor: color.secondaryGreen,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      paddingLeft: 5,
      paddingRight: 5,
      // padding: 3,
      width: width * 0.775,
    },

    innerView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    textInput: {
      flex: 1,
      fontFamily: 'Lato-Regular',
      fontSize: 15,
      marginLeft: 15,
      color: color.primaryGreen,
    },
    filter: {
      fontFamily: 'Lato-Regular',
      fontSize: 13,
      color: color.primaryGreen,
    },
  });
export default style;
