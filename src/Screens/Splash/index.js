import {Image, View} from 'react-native';
import color from '../../Components/Common/colors';
const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: color.white,
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/images/logo.jpeg')}
        style={{width: 150, height: 150, resizeMode: 'contain'}}
      />
    </View>
  );
};
export default Splash;
