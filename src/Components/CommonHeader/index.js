import {View, Text, Image, TouchableOpacity} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import {useDimensionContext} from '../../context';

const CommonHeader = () => {
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  return (
    <View style={responsiveStyle.container}>
      <TouchableOpacity onPress={() => console.warn('Pressed Sider')}>
        <Image
          source={require('../../assets/images/drawer.png')}
          style={responsiveStyle.sideicon}
        />
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/logo-icon.jpeg')}
        style={responsiveStyle.logo}
      />
    </View>
  );
};
export default CommonHeader;
