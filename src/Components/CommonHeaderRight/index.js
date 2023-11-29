import {Image, TouchableOpacity, View, Text, Share} from 'react-native';
import {useDimensionContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import style from './style';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import color from '../Common/colors';
import {useSelector} from 'react-redux';

const CommonHeaderRight = props => {
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const {cartCount} = useSelector(state => state);

  const handleClick = async type => {
    if (type === 'cart') {
      navigation.navigate('Cart');
    } else if (type === 'share') {
      const result = await Share.share({
        message: 'Share',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    }
  };
  return (
    <View style={responsiveStyle.flexStyle}>
      {props.share ? (
        <TouchableOpacity
          style={responsiveStyle.padding}
          onPress={() => handleClick('share')}>
          <EvilIcons name="share-google" size={35} color={color.black} />
        </TouchableOpacity>
      ) : null}

      {props.plus ? (
        <TouchableOpacity
          style={responsiveStyle.padding}
          onPress={props.handlePlusIcon}>
          <FontAwesome name="plus-square-o" size={35} color={color.black} />
        </TouchableOpacity>
      ) : null}

      {props.cart ? (
        <TouchableOpacity
          style={responsiveStyle.padding}
          onPress={() => handleClick('cart')}>
          <>
            <View style={responsiveStyle.cartCount}>
              <Text style={responsiveStyle.count}>{cartCount}</Text>
            </View>
            <Image
              source={require('../../assets/images/cart.png')}
              style={responsiveStyle.image}
            />
          </>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default CommonHeaderRight;
