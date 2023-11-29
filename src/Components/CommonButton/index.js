import {View, Text, TouchableOpacity} from 'react-native';
import style from './style';
import {useDimensionContext} from '../../context';
const CommonButton = props => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  return (
    <TouchableOpacity
      style={responsiveStyle.container}
      onPress={props.onButtonPress}>
      <Text style={responsiveStyle.text}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};
export default CommonButton;
