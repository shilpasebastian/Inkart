import {StyleSheet, Dimensions} from 'react-native';
import color from '../../Components/Common/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const {width, height} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {height: height},
  topBg: {
    height: height * 0.2,
    width: width,
    resizeMode: 'cover',
  },
  ScrollView: {
    flex: 1,
    backgroundColor: color.white,
    marginTop: -width * 0.2,
    borderTopRightRadius: width * 0.05,
    borderTopLeftRadius: width * 0.05,
    overflow: 'hidden',
    paddingLeft: width * 0.03,
    paddingRight: width * 0.03,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  loginText: {
    fontFamily: 'Lato-Bold',
    fontSize: 23,
    color: color.steel,
  },
  createNew: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: color.steel,
    textAlign: 'center',
    marginVertical: width * 0.025,
    paddingBottom: width * 0.09,
  },
  footer: {
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.secondaryGreen,
  },
  dottedLineContainer: {
    marginVertical: 15,
  },
  overflow: {overflow: 'hidden'},
  dashedLine: {
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: color.gery,
    margin: -2,
    marginBottom: 0,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: -13,
    backgroundColor: color.white_level_2,
    width: 110,
  },
  dashedText: {
    textAlign: 'center',
    color: color.black_level_3,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  errorText: {
    color: color.red,
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  errorView: {
    marginTop: 15,
  },
});

export default style;
