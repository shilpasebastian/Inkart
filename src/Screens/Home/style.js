import {StyleSheet, Dimensions} from 'react-native';
import color from '../../Components/Common/colors';
const {width, height} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {backgroundColor: color.white},
  main: {flex: 1},
  footText: {
    fontFamily: 'Lato-Bold',
    fontSize: 23,
    color: color.gery,
    padding: 15,
  },
  footButton: {
    padding: 10,
    backgroundColor: color.primaryGreen,
    width: '40%',
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    borderRadius: 8,
  },
  footButtonText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: color.white,
  },
});

export default style;
