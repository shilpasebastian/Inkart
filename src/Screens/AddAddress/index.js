import {useEffect, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDimensionContext} from '../../context';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import style from './style';
import CommonButton from '../../Components/CommonButton';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
navigator.geolocation = require('@react-native-community/geolocation');
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import color from '../../Components/Common/colors';
import Snackbar from 'react-native-snackbar';
import {request, PERMISSIONS} from 'react-native-permissions';
import RazorpayCheckout from 'react-native-razorpay';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {err} from 'react-native-svg/lib/typescript/xml';
import {updateCartCount} from '../../storage/action';

const AddAddress = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const {cartProducts} = route.params;
  const {total} = route.params;
  const [newPosition, setNewPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [address, setAddress] = useState('');

  const userId = useSelector(state => state.userId);
  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);
  const email = useSelector(state => state.email);
  const mobileNumber = useSelector(state => state.mobileNumber);
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentLocation();
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type={'back'} />,
    });
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        setNewPosition({
          latitude: info.coords?.latitude ?? 0,
          longitude: info.coords?.longitude ?? 0,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
        Snackbar.show({
          text: 'Current location is fetched',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: color.primaryGreen,
          textColor: color.white,
        });
      },
      error => {
        console.error('Error getting current location:', error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const handleCreateOrder = async paymentID => {
    const smallId = paymentID.slice(4, 12);
    await firestore()
      .collection('Orders')
      .add({
        orderId: String(smallId).toUpperCase(),
        created: Date.now(),
        updated: Date.now(),
        orderStatus: 'Ordered',
        totalAmount: total,
        address: address,
        userId: userId,
        paymentMethod: 'online',
        cartItems: cartProducts,
        userName: firstName + ' ' + lastName,
        userEmail: email,
        userPhone: mobileNumber,
        expDelDate: '',
      })
      .then(async resp => {
        await firestore()
          .collection('Cart')
          .where('userId', '==', userId)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref
                .delete()
                .then(() => {
                  setLoading(false);
                  dispatch(updateCartCount(0));
                  Snackbar.show({
                    text: 'Your Order is successfully Placed',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: color.primaryGreen,
                    textColor: color.white,
                  });
                  setTimeout(() => {
                    navigation.goBack();
                  }, 2000);
                })
                .catch(err => {
                  console.warn(err);
                });
            });
          });
      });
  };

  const onButtonPress = () => {
    var options = {
      description: 'Inkart Products Purchase',
      // image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_CXo5HbmQ83IYL0', // Your api key
      amount: parseInt(total, 10) * 100,
      name: 'Inkart',
      prefill: {
        email: email,
        contact: mobileNumber,
        name: `${firstName} ${lastName}`,
      },
      theme: {color: color.pg},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success

        setLoading(true);
        handleCreateOrder(data.razorpay_payment_id);

        // console.log('======================================');
        // console.log(`Success: ${data.razorpay_payment_id}`);
        // console.log('======================================');
      })
      .catch(error => {
        // handle failure
        Snackbar.show({
          text: 'Your Order is Failed',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: color.red,
          textColor: color.white,
        });
        navigation.goBack();
      });
  };

  return (
    <View style={responsiveStyle.container}>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'small'} color={color.white} />
        </View>
      </Modal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}>
        <GooglePlacesAutocomplete
          placeholder="Search Location"
          currentLocation={true}
          fetchDetails={true}
          // scrollEnabled={false}
          // nestedScrollEnabled={true}
          currentLocationLabel="Current Location"
          query={{
            key: 'AIzaSyArG1ymXV06j6DDwtyGcnHDQHlEZDe4DdU',
            language: 'en',
          }}
          styles={{
            textInput: responsiveStyle.textInput,
            predefinedPlacesDescription: responsiveStyle.description,
          }}
          onPress={(data, details) => {
            // console.warn(data, details);
            const location =
              data?.geometry?.location ?? details?.geometry?.location;
            const positionData = {
              latitude: location?.lat ?? 0,
              longitude: location?.lng ?? 0,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            };
            setNewPosition(positionData);
            setAddress(data?.name ?? data?.description);
          }}
          // onFail={fail => console.warn('fail', fail)}
          // onNotFound={notfoud => console.warn('not found', notfoud)}
        />

        {newPosition && (
          <MapView
            style={responsiveStyle.mapView}
            initialRegion={newPosition}
            region={newPosition}
            showsUserLocation={true}
            followsUserLocation={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            scrollEnabled={true}
            provider={PROVIDER_GOOGLE}
            showsMyLocationButton={true}>
            {address && (
              <Marker
                title={address ?? ''}
                description="This is your marker"
                coordinate={newPosition}
              />
            )}
          </MapView>
        )}

        {address && (
          <View style={{paddingHorizontal: 15, paddingTop: 15}}>
            <Text
              style={{
                color: color.black_level_3,
                fontFamily: 'Lato-Regular',
                fontSize: 18,
              }}>
              {address}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={responsiveStyle.touchView}
          onPress={getCurrentLocation}>
          <View style={responsiveStyle.iconView}>
            <FontAwesome name="location-arrow" size={20} color={color.white} />
          </View>
          <Text style={responsiveStyle.touchText}>Your Current Location</Text>
        </TouchableOpacity>
        <CommonButton
          buttonText={'Confirm Location & Proceed'}
          onButtonPress={onButtonPress}
        />
      </ScrollView>
    </View>
  );
};

export default AddAddress;
