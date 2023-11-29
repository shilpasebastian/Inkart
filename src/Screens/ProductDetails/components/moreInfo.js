//import useDimensionContext from '../../../context';
import style from '../style';
import {View, Text} from 'react-native';
import color from '../../../Components/Common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDimensionContext} from '../../../context';

const MoreInfo = prop => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: dimensions.windowWidth * 0.39,
          justifyContent: 'center',
          backgroundColor: color.lightgGrey,
          padding: 15,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: color.black_level_3,
            fontFamily: 'Lato-Regular',
            fontSize: 18,
          }}>
          500g/24.00
        </Text>
        <AntDesign name="down" size={25} color={color.gery} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: dimensions.windowWidth * 0.39,
          justifyContent: 'center',
          backgroundColor: color.lightgGrey,
          padding: 15,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: color.black_level_3,
            fontFamily: 'Lato-Regular',
            fontSize: 18,
          }}>
          Delivery Time
        </Text>
        <AntDesign name="down" size={25} color={color.gery} />
      </View>
    </View>
  );
};

export default MoreInfo;
