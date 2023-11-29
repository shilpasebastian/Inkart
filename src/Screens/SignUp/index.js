import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import style from './style';
import CustomTextInput from '../../Components/CoustomTextInput/index.js';
import CustomButton from '../../Components/CoustomButton';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {
  validateEmail,
  validatePhoneNumber,
} from '../../Components/Common/validation';
import Snackbar from 'react-native-snackbar';
import color from '../../Components/Common/colors';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '21235843618-caq2o1nkeabh9t1lu0om0gaheeo1p5pm.apps.googleusercontent.com',
    });
  });

  const navigation = useNavigation();
  const handleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  };

  const handleGoToLogIn = () => {
    navigation.goBack();
  };
  const handleSignUp = async () => {
    if (
      username.trim() !== '' &&
      email.trim() !== '' &&
      mobile.trim() !== '' &&
      password.trim() !== '' &&
      cpassword.trim() !== ''
    ) {
      if (validateEmail(email.trim())) {
        if (validatePhoneNumber(mobile.trim())) {
          if (password.trim() === cpassword.trim()) {
            await firestore()
              .collection('Users')
              .where('username', '==', username.trim())
              .where('email', '==', email.trim())
              .get()
              .then(async snapshot => {
                if (snapshot.empty) {
                  if (validateEmail(email.trim())) {
                    if (validatePhoneNumber(mobile.trim())) {
                      const userData = {
                        username: username.trim(),
                        email: email.trim(),
                        mobilenumber: mobile.trim(),
                        password: password.trim(),
                        create: String(new Date()),
                        update: String(new Date()),
                      };
                      await firestore()
                        .collection('Users')
                        .add(userData)
                        .then(resp => {
                          console.warn(resp);
                          Snackbar.show({
                            text: 'A new account is created for you',
                            textColor: color.white,
                            backgroundColor: color.primaryGreen,
                            duration: Snackbar.LENGTH_LONG,
                          });
                          navigation.navigate('Home');
                        })
                        .catch(err => {
                          console.warn(err);
                        });
                    } else {
                      setError('Give Number is not valid');
                    }
                  } else {
                    setError('Give Email is not valid');
                  }
                } else {
                  Snackbar.show({
                    text: 'This email is already existing on our system,try using an other one or  go to login',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.red,
                    textColor: color.white,
                  });
                }
              });
          } else {
            setError('Give password are not matching');
          }
        } else {
          setError('Give mobile number is not valid');
        }
      } else {
        setError('Give email is not valid');
      }
    } else {
      setError('Fill up all the fields to continue');
    }
  };

  return (
    <View style={style.container}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={style.topBg}
      />
      <ScrollView style={style.ScrollView} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={style.logo}
        />
        <Text style={style.loginText}>Sign Up Account</Text>
        {error != null ? (
          <View style={style.errorView}>
            <Text style={style.errorText}>{error}</Text>
          </View>
        ) : null}
        <CustomTextInput
          handleText={text => setUsername(text)}
          placeholder="Username"
        />
        <CustomTextInput
          type="email"
          handleText={text => setEmail(text)}
          placeholder="Email Address"
        />
        <CustomTextInput
          type="phone"
          handleText={text => setMobile(text)}
          placeholder="Mobile Number"
        />
        <CustomTextInput
          type="password"
          handleText={text => setPassword(text)}
          placeholder="Password"
        />
        <CustomTextInput
          type="password"
          handleText={text => setCpassword(text)}
          placeholder="Confirm Password"
        />
        <CustomButton
          handleButtonPress={handleSignUp}
          buttonText={'Sign Up'}
          type="primary"
        />
        <View style={style.dottedLineContainer}>
          <View style={style.overflow}>
            <View style={style.dashedLine} />
          </View>
          <View style={style.textContainer}>
            <Text style={style.dashedText}>Or Login with</Text>
          </View>
        </View>
        <CustomButton
          handleButtonPress={handleButtonPress}
          buttonText={'Sign Up with Google'}
          type="secondary"
          icon={require('../../assets/images/google.png')}
        />

        <Text onPress={handleGoToLogIn} style={style.createNew}>
          Go To LogIn
        </Text>
      </ScrollView>
    </View>
  );
};

export default SignUp;
