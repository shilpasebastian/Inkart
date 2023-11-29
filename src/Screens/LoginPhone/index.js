import React, {useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import style from './style';
import CustomTextInput from '../../Components/CoustomTextInput/index.js';
import CustomButton from '../../Components/CoustomButton';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import color from '../../Components/Common/colors';
import {validateOtp, validatePhone} from './controller';
import {useDimensionContext} from '../../context';

const LoginPhone = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showOtp, setShowOptFiled] = useState(false);
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  const handleButtonPress = async () => {
    try {
      setError(null);
      if (validatePhone(phone.trim())) {
        const confirmation = await auth().signInWithPhoneNumber(phone);
        if (confirmation) {
          Snackbar.show({
            text: 'Varification code is send to your mobile number,please verify',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.primaryGreen,
            textColor: color.black,
          });
          setConfirm(confirmation);
          setShowOptFiled(true);
        }
      } else {
        setError('Given phone number is incorrect');
      }
    } catch (error) {
      setError('Given phone number is incorrect');
    }
  };

  const handleVerifytop = async () => {
    if (otp.trim() !== '' && validateOtp(otp.trim())) {
      const res = await confirm.confirm(otp.trim());
      if (res) {
        Snackbar.show({
          text: 'Your phone number is verified,Login successful',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.primaryGreen,
          textColor: color.black,
        });
        navigation.navigate('Home');
      }
    } else {
      setError('Entered otp not valid');
    }
  };

  const handleGoToLogIn = () => {
    navigation.goBack();
  };

  return (
    <View style={responsiveStyle.container}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={responsiveStyle.topBg}
      />
      <ScrollView
        style={responsiveStyle.ScrollView}
        showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={responsiveStyle.logo}
        />
        <Text style={responsiveStyle.loginText}>Sign Up</Text>
        {error != null ? (
          <Text style={responsiveStyle.errorText}>{error}</Text>
        ) : null}
        <CustomTextInput
          handleText={text => setPhone(text)}
          placeholder="Phone Number"
          type="phone"
        />

        {showOtp ? (
          <CustomTextInput
            handleText={text => setOtp(text)}
            placeholder="Enter OTP"
            type="phone"
          />
        ) : null}
        <CustomButton
          handleButtonPress={showOtp ? handleVerifytop : handleButtonPress}
          buttonText={showOtp ? 'Verify OTP' : 'Sign in with Phone'}
          type="primary"
        />
        <Text onPress={handleGoToLogIn} style={responsiveStyle.createNew}>
          Go To LogIn
        </Text>
      </ScrollView>
    </View>
  );
};

export default LoginPhone;
