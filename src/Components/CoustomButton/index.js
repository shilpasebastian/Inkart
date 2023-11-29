import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import style from './style';
import color from '../Common/colors';
const CustomButton = props => {
  const {handleButtonPress, buttonText, type, icon} = props;
  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      style={[
        style.button,
        {
          backgroundColor:
            type === 'primary' ? color.primaryGreen : color.secondaryGreen,
        },
      ]}>
      {type !== 'primary' ? <Image source={icon} style={style.icon} /> : null}
      <Text
        style={{
          color: type === 'primary' ? color.white : color.black_level_3,
          fontFamily:
            type === 'primary' ? 'Poppins-SemiBold' : 'Poppins-Regular',
          fontSize: type === 'primary' ? 20 : 14,
        }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
