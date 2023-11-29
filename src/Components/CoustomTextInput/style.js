import {StyleSheet, Dimensions} from 'react-native';
import color from '../Common/colors';
const {width, height} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.secondaryGreen,
    padding: width * 0.02,
    borderRadius: 8,
    marginVertical: 13,
    borderWidth: 1,
    borderColor: color.gery,
  },
  textInput: {
    flex: 1,
    color: color.black_level_3,
    fontSize: 16,
    fontFamily: 'Lato_Regular',
    // height: Platform.OS === 'ios' ? height * 0.04 : height * 0.02,
  },
  icon: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
  },
  checkText: {
    fontFamily: 'Lato-Regular',
    color: color.primaryGreen,
    fontSize: 18,
  },
});
export default style;
