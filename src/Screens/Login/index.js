import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import style from './style';
import CustomTextInput from '../../Components/CoustomTextInput/index.js';
import CustomButton from '../../Components/CoustomButton';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import color from '../../Components/Common/colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDimensionContext} from '../../context';
import {validateEmail} from '../../Components/Common/validation';
import {useDispatch} from 'react-redux';
import {login} from '../../storage/action';

const Login = () => {
  const dimensions = useDimensionContext();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  function onAuthStateChanged(user) {
    console.warn(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleLogin = async () => {
    if (email.trim() !== '' && password.trim() !== '') {
      if (validateEmail(email.trim())) {
        await firestore()
          .collection('Users')
          .where('email', '==', email.trim().toLocaleLowerCase())
          .get()
          .then(async snapshot => {
            if (snapshot.empty) {
              Snackbar.show({
                text: 'This user is not registered with us,try creating a new account.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.red,
                textColor: color.white,
              });
            } else {
              snapshot.forEach(documentSnapshot => {
                const respData = documentSnapshot.data();
                if (password.trim() === respData.password) {
                  Snackbar.show({
                    text: 'Logon Successful',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.primaryGreen,
                    textColor: color.white,
                  });
                  dispatch(
                    login({
                      userId: documentSnapshot.id,
                      firstName: respData.firstName,
                      lastName: respData.lastName,
                      email: respData.email,
                      mobileNumber: respData.mobileNumber,
                      profileImage: respData.profileImage,
                    }),
                  );
                  //  navigation.navigate('AppDrawer');
                } else {
                  Snackbar.show({
                    text: 'The Password you entered is wrong',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.red,
                    textColor: color.primaryGreen,
                  });
                }
              });
            }
          })
          .catch(err => console.warn(err));
      } else {
        Snackbar.show({
          text: 'Enter a valid Email',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.red,
          textColor: color.white,
        });
      }
    } else {
      Snackbar.show({
        text: 'Fill up the fields to continue',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.red,
        textColor: color.white,
      });
    }
  };

  const handleButtonPress = () => {
    console.warn('pressed');
  };

  const handleGoToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleGoToLoginPhone = () => {
    navigation.navigate('LoginPhone');
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
        <Text style={responsiveStyle.loginText}>Login Account</Text>
        <CustomTextInput
          type="email"
          handleText={text => setEmail(text)}
          placeholder="Email Address"
        />
        <CustomTextInput
          type="password"
          handleText={text => setPassword(text)}
          placeholder="Password"
        />
        <CustomButton
          handleButtonPress={handleLogin}
          buttonText={'Sign In'}
          type="primary"
        />
        <Text onPress={handleGoToSignUp} style={responsiveStyle.createNew}>
          If you are new,Create Here
        </Text>
        <View style={responsiveStyle.dottedLineContainer}>
          <View style={responsiveStyle.overflow}>
            <View style={responsiveStyle.dashedLine} />
          </View>
          <View style={responsiveStyle.textContainer}>
            <Text style={responsiveStyle.dashedText}>Or Login with</Text>
          </View>
        </View>

        <CustomButton
          handleButtonPress={handleGoToLoginPhone}
          buttonText={'Sign In with Phone'}
          type="secondary"
          icon={require('../../assets/images/smartphone.png')}
        />
        <CustomButton
          handleButtonPress={handleButtonPress}
          buttonText={'Sign In with Google'}
          type="secondary"
          icon={require('../../assets/images/google.png')}
        />
      </ScrollView>
      <View style={responsiveStyle.footer}>
        <Text style={responsiveStyle.footerText}>Login in as Guest</Text>
      </View>
    </View>
  );
};

export default Login;
