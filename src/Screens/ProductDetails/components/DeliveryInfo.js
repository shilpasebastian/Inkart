import {View, Text} from 'react-native';
// import color from '../../../Components/Common/colors';
import {useDimensionContext} from '../../../context';
import style from './style';
import CustomTextInput from '../../../Components/CoustomTextInput';

const DeliveryInfo = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  return (
    <View>
      <Text style={responsiveStyle.deliveryHead}>Check Delivery</Text>
      <Text style={responsiveStyle.commonText}>
        Enter pincode to check delivery date/option.
      </Text>
      <CustomTextInput
        type={'default'}
        check={true}
        handleText={() => console.log('hello')}
        placeholder={'Pin code'}
      />
      <Text style={responsiveStyle.commonText}>
        Free Delivery on orders above 200.00.
      </Text>
      <Text style={responsiveStyle.commonText}>
        Cash on delivery available.
      </Text>
      <Text style={responsiveStyle.commonText}>
        Easy 21 days return and exchange.
      </Text>
    </View>
  );
};

export default DeliveryInfo;
