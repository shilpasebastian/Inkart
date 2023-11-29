import {StyleSheet} from 'react-native';
import color from '../../Components/Common/colors';
const style = (width, height) =>
  StyleSheet.create({
    container: {flex: 1},
    ScrollView: {padding: width * 0.04},
    contentContainsStyle: {paddingBottom: height * 0.15},
    greenBox: {
      marginVertical: width * 0.04,
      backgroundColor: color.primaryGreen,
      borderRadius: width * 0.04,
      padding: 20,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },
    greenTextBox: {marginLeft: width * 0.04},
  });
export default style;
