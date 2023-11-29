import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import color from '../Common/colors';
const {width, height} = Dimensions.get('screen');
const style = (width, height, isPortrait) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: isPortrait ? width * 0.12 : width * 0.05,
    height: isPortrait ? width * 0.175 : width * 0.1,
    backgroundColor: color.white_level_1,
    paddingHorizontal: width * 0.03,
  },
  sideicon: {
    resizeMode: 'contain',
    height: height * 0.1,
    width: width * 0.1,
  },
  logo: {
    resizeMode: 'contain',
    height: height * 0.15,
    width: width * 0.4,
  },
});
export default style;
