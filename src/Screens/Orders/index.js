import {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import style from './style';
import {useDimensionContext} from '../../context';
import CustomSearch from '../../Components/CustomSearch';
import color from '../../Components/Common/colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

const Orders = () => {
  const dimension = useDimensionContext();
  const responsiveStyle = style(dimension.windowWidth, dimension.windowHeight);
  const navigation = useNavigation();
  const userId = useSelector(state => state.userId);
  const [ordersArray, setOrdersArray] = useState([]);
  const isFocused = useIsFocused();
  // const ordersArray = [
  //   {
  //     id: '0',
  //     orderId: '#AWD4235',
  //     orderDate: '11/12/2023, 4:09 PM',
  //     address1: '1800 Elis St,San Fransisco,CA',
  //     address2: '94115,USA',
  //     price: '879',
  //     quantity: '3',
  //   },
  //   {
  //     id: '1',
  //     orderId: '#AWD4235',
  //     orderDate: '11/12/2023, 4:09 PM',
  //     address1: '1800 Elis St,San Fransisco,CA',
  //     address2: '94115,USA',
  //     price: '879',
  //     quantity: '3',
  //   },
  //   {
  //     id: '2',
  //     orderId: '#AWD4235',
  //     orderDate: '11/12/2023, 4:09 PM',
  //     address1: '1800 Elis St,San Fransisco,CA',
  //     address2: '94115,USA',
  //     price: '879',
  //     quantity: '3',
  //   },
  //   {
  //     id: '3',
  //     orderId: '#AWD4235',
  //     orderDate: '11/12/2023, 4:09 PM',
  //     address1: '1800 Elis St,San Fransisco,CA',
  //     address2: '94115,USA',
  //     price: '879',
  //     quantity: '3',
  //   },
  //   {
  //     id: '4',
  //     orderId: '#AWD4235',
  //     orderDate: '11/12/2023, 4:09 PM',
  //     address1: '1800 Elis St,San Fransisco,CA',
  //     address2: '94115,USA',
  //     price: '879',
  //     quantity: '3',
  //   },
  // ];

  useEffect(() => {
    if (isFocused) {
      getOrders();
    }
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
  }, []);
  const getOrders = async () => {
    await firestore()
      .collection('Orders')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setOrdersArray([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document?.data()};
              objArray.push(result);
            }
          });
          setOrdersArray(objArray);
        }
      });
  };
  const handleSearch = async text => {
    console.warn(text);
    console.warn(userId);

    await firestore()
      .collection('Orders')
      .where('userId', '==', userId)
      .orderBy('orderId') // in the orderby value is same as text,because we are search by based o that
      .startAt(String(text))
      .endAt(String(text) + '\uf8ff') // /uf8ff indicate words or elements os after the text
      .get()
      .then(snapshot => {
        console.warn(snapshot);

        if (snapshot.empty) {
          setOrdersArray([]);
          // Snackbar.show({
          //   text: 'Order not found',
          //   duration: Snackbar.LENGTH_SHORT,
          //   backgroundColor: color.red,
          //   textColor: color.white,
          // });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document?.data()};
              objArray.push(result);
            }
          });
          setOrdersArray(objArray);
        }
      });
  };

  const navigateToDetails = item => {
    navigation.navigate('OrderDetails', {item: item});
  };
  return (
    <View style={responsiveStyle.container}>
      <CustomSearch
        filter={true}
        placeholder={'Search using order id'}
        mike={false}
        onChangeText={handleSearch}
      />
      <FlatList
        data={ordersArray}
        extraData={ordersArray}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                padding: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                  color: color.primaryGreen,
                }}>
                No Data
              </Text>
            </View>
          );
        }}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigateToDetails(item)}
              style={responsiveStyle.flatView}>
              <View style={responsiveStyle.innerView}>
                <View>
                  <Text style={responsiveStyle.orderId}>
                    ID: {item.orderId}
                  </Text>
                  <Text style={responsiveStyle.orderDate}>
                    Ordered on: {item.created}
                  </Text>
                  <Text style={responsiveStyle.address}>{item.address1}</Text>
                  <Text style={responsiveStyle.address}>{item.address2}</Text>
                  <Text style={responsiveStyle.paidText}>
                    Paid:{' '}
                    <Text style={responsiveStyle.greenText}>
                      {item.totalAmount}
                    </Text>
                    ,Items:
                    <Text style={responsiveStyle.greenText}>
                      {item.cartItems.length}
                    </Text>
                  </Text>
                </View>

                <Image
                  source={require('../../assets/images/map.webp')}
                  style={responsiveStyle.mapImg}
                />
              </View>
              <View style={responsiveStyle.bottomView}>
                <Text style={responsiveStyle.bottomText}>Order Shipped</Text>
                <Text style={responsiveStyle.bottomText}>
                  Rate & Review Products
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
};
export default Orders;
