import {StyleSheet, Dimensions} from 'react-native';
import color from '../../Components/Common/colors';
const {width, height} = Dimensions.get('screen');
const style = StyleSheet.create({
  main: {flex: 1},
  container: {backgroundColor: color.white_level_2},
});

export default style;
