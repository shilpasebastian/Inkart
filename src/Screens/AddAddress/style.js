import color from '../../Components/Common/colors';

const {StyleSheet} = require('react-native');

const style = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    textInput: {
      fontFamily: 'Lato-Regular',
      borderRadius: 8,
      fontSize: 16,
      borderWidth: 1,
      width: width * 0.9,
      height: 50,
      margin: 10,
      alignSelf: 'center',
      borderColor: color.primaryGreen,
      backgroundColor: color.secondaryGreen,
    },
    description: {
      fontSize: 16,
      fontFamily: 'Lato-Regular',
    },
    mapView: {
      height: height * 0.4,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    touchView: {
      padding: 15,
      marginVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    touchText: {
      fontSize: 18,
      fontFamily: 'Lato-Bold',
    },
    iconView: {
      borderRadius: 8,
      padding: 10,
      marginRight: 10,
      backgroundColor: color.primaryGreen,
    },
  });

export default style;
