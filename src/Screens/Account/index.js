import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import {useDimensionContext} from '../../context';
import CustomTextInput from '../../Components/CoustomTextInput';
import CustomButton from '../../Components/CoustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';
import color from '../../Components/Common/colors';
import {
  validateEmail,
  validatePhoneNumber,
} from '../../Components/Common/validation';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {updateProfile} from '../../storage/action';
import {updateProfileImage} from './controller';

const Account = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
  }, []);
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const {userId, firstName, lastName, email, mobileNumber, profileImage} =
    useSelector(state => state);
  const [fName, setFirstName] = useState(firstName);
  const [secondName, setSecondName] = useState(lastName);
  const [stateEmail, setEmail] = useState(email);
  const [phoneNumber, setPhoneNumber] = useState(mobileNumber);
  const [modal, setModal] = useState(false);
  const [modalChoose, setModalChoose] = useState(false);
  const [userImage, setUserImage] = useState('');
  const dispatch = useDispatch();
  const handleOpenImage = () => {
    setModal(!modal);
  };
  const handleEditImage = () => {
    setModalChoose(true);
  };
  const handlePickFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        console.warn(image);
        setUserImage(image ?? '');
        setModalChoose(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handlePickFromCamera = () => {
    // setModalChoose(false);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdateProfile = async () => {
    if (validatePhoneNumber(phoneNumber.trim())) {
      if (validateEmail(stateEmail.trim())) {
        if (fName !== '' && secondName !== '') {
          let newUrl = profileImage;
          if (userImage !== '') {
            newUrl = await updateProfileImage(userImage);
          }
          await firestore()
            .collection('Users')
            .doc(userId)
            .update({
              firstName: fName,
              lastName: secondName,
              email: stateEmail,
              mobileNumber: phoneNumber,
              profileImage: newUrl,
            })
            .then(() => {
              dispatch(
                updateProfile({
                  firstName: fName,
                  lastName: secondName,
                  email: stateEmail,
                  mobileNumber: phoneNumber,
                  profileImage: newUrl,
                }),
              );
              Snackbar.show({
                text: 'Update Successfully',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: color.primaryGreen,
                textColor: color.white,
              });
            });
        } else {
          Snackbar.show({
            text: 'Fill up the fields to continue',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: color.red,
            textColor: color.white,
          });
        }
      } else {
        Snackbar.show({
          text: 'Given email address is not valid',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: color.red,
          textColor: color.white,
        });
      }
    } else {
      Snackbar.show({
        text: 'Given phone number is not valid',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: color.red,
        textColor: color.white,
      });
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={responsiveStyle.container}>
        <Text style={responsiveStyle.head}>
          {firstName} {secondName}
        </Text>
        <View style={responsiveStyle.userImage}>
          <TouchableOpacity onPress={handleOpenImage}>
            <Image
              style={responsiveStyle.image}
              source={
                userImage
                  ? {uri: `data:${userImage.mime};base64,${userImage.data}`,}
                  : profileImage
                  ? {uri: profileImage}
                  : require('../../assets/images/dummy.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={responsiveStyle.editTouch}
            onPress={handleEditImage}>
            <Image
              style={responsiveStyle.edit}
              source={require('../../assets/images/edit-green.png')}
            />
          </TouchableOpacity>
        </View>
        <CustomTextInput
          handleText={text => setFirstName(text)}
          value={fName}
          placeholder="First Name"
        />
        <CustomTextInput
          handleText={text => setSecondName(text)}
          value={secondName}
          placeholder="Last Name"
        />
        <CustomTextInput
          type="email"
          value={stateEmail}
          handleText={text => setEmail(text)}
          placeholder="Email Address"
        />
        <CustomTextInput
          handleText={text => setPhoneNumber(text)}
          value={phoneNumber}
          placeholder="Mobile Number"
        />
        <CustomButton
          type="primary"
          handleButtonPress={handleUpdateProfile}
          buttonText={'Updated Profile'}
        />
        <Modal
          visible={modal}
          onRequestClose={() => setModal(false)}
          transparent>
          <View style={responsiveStyle.modalBack}>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={responsiveStyle.close}>
              <Image
                style={responsiveStyle.edit}
                source={require('../../assets/images/close.png')}
              />
            </TouchableOpacity>
            <Image
              style={responsiveStyle.bigImage}
              source={
                userImage === ''
                  ? require('../../assets/images/dummy.png')
                  : {
                      uri: `data:${userImage.mime};base64,${userImage.data}`,
                    }
              }
            />
          </View>
        </Modal>

        <Modal
          visible={modalChoose}
          onRequestClose={() => setModalChoose(false)}
          transparent>
          <View style={responsiveStyle.modalBack}>
            <View style={responsiveStyle.selectBox}>
              <TouchableOpacity
                onPress={() => setModalChoose(false)}
                style={responsiveStyle.closeChoose}>
                <Image
                  style={responsiveStyle.edit}
                  source={require('../../assets/images/close.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={responsiveStyle.touch}
                onPress={handlePickFromGallery}>
                <Text style={responsiveStyle.pickText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={responsiveStyle.touch}
                onPress={handlePickFromCamera}>
                <Text style={responsiveStyle.pickText}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
export default Account;
