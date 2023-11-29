import React, {useState} from 'react';
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import style from './style';
import color from '../Common/colors';
import {useDimensionContext} from '../../context';
const CustomTextInput = props => {
  const {
    type,
    handleText,
    placeholder,
    value,
    check = false,
    multiline = false,
  } = props;
  const [show, setShow] = useState(false);
  const keyboardType =
    type === 'email'
      ? 'email-address'
      : type === 'password'
      ? 'default'
      : type === 'phone'
      ? 'phone-pad'
      : 'default';
  const secureTextEntry = type === 'password' ? (show ? false : true) : false;
  const icon =
    type === 'email'
      ? require('../../assets/images/email.png')
      : type === 'password'
      ? show
        ? require('../../assets/images/view.png')
        : require('../../assets/images/hide.png')
      : false;
  const handlePassword = () => {
    setShow(!show);
  };
  const dimensions = useDimensionContext();
  return (
    <View style={style.container}>
      <TextInput
        style={[
          style.textInput,
          {
            height:
              Platform.Os === 'ios'
                ? multiline
                  ? dimensions.windowHeight * 0.12
                  : dimensions.dimensions.windowHeight * 0.04
                : multiline
                ? dimensions.windowHeight * 0.1
                : dimensions.windowHeight * 0.02,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={color.gery}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        selectionColor={color.primaryGreen}
        onChangeText={handleText}
        value={value}
        multiline={multiline}
      />
      {check ? <Text style={style.checkText}>Check</Text> : null}
      {!icon ? null : (
        <TouchableOpacity
          onPress={handlePassword}
          disabled={type !== 'password' ? true : false}>
          <Image style={style.icon} source={icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;
