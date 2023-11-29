import {useEffect, useState} from 'react';
import {View, Text, ScrollView, Modal, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import color from '../../Components/Common/colors';
import CustomButton from '../../Components/CoustomButton';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {useDimensionContext} from '../../context';
import style from './style';

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;
  const [loading, setLoading] = useState(false);
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CommonHeaderLeft
          type={'back'}
          action={() => navigation.navigate('Orders')}
        />
      ),
      title: 'Order Summery',
    });
  }, []);

  const reOrder = async () => {
    try {
      setLoading(true);
      const smallId = Math.random();
      await firestore()
        .collection('Orders')
        .add({
          orderId: String(smallId).toUpperCase(),
          created: Date.now(),
          updated: Date.now(),
          orderStatus: 'Ordered',
          totalAmount: item.totalAmount,
          address: item.address,
          userId: item.userId,
          paymentMethod: 'online',
          cartItems: item.cartItems,
          userName: item.userName,
          userEmail: item.userEmail,
          userPhone: item.userPhone,
          expDelDate: '',
        })
        .then(async resp => {
          if (resp) {
            setTimeout(() => {
              Snackbar.show({
                text: 'Your Order is successfully Placed',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: color.primaryGreen,
                textColor: color.white,
              });
              setLoading(false);
            }, 1000);
          }
        });
    } catch (error) {
      console.log('==========================');

      console.log(error);
      console.log('==========================');
    }
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
        style={responsiveStyle.ScrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={responsiveStyle.contentContainsStyle}>
        <View style={responsiveStyle.greenBox}>
          <Feather name="box" size={50} color={color.white} />
          <View style={responsiveStyle.greenTextBox}>
            <Text
              style={{
                color: color.white,
                fontFamily: 'Lato-Regular',
                fontSize: 16,
              }}>
              Order Id:#{item?.orderId ?? 'ANKJUI'}
            </Text>
            <Text
              style={{
                color: color.white,
                fontFamily: 'Lato-Bold',
                fontSize: 20,
              }}>
              {item?.orderStatus ?? ''}
            </Text>
          </View>
        </View>

        <View style={{marginVertical: 20}}>
          <Text
            style={{
              color: color.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Items:
          </Text>
          {item.cartItems &&
            item.cartItems.map((ele, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <View
                    style={{
                      backgroundColor: color.primaryGreen,
                      paddingVertical: 15,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                      marginRight: 15,
                    }}>
                    <Text
                      style={{
                        color: color.white,
                        fontFamily: 'Lato-Bold',
                        fontSize: 18,
                      }}>
                      {ele.quantity}
                    </Text>
                  </View>
                  <FontAwesome5
                    name="star-of-life"
                    size={16}
                    color={color.black_level_1}
                  />
                  <View
                    style={{width: '55%', overflow: 'hidden', marginLeft: 10}}>
                    <Text
                      style={{
                        color: color.black,
                        fontFamily: 'Lato-Regular',
                        fontSize: 18,
                      }}>
                      {ele.name}
                    </Text>
                    <Text
                      style={{
                        color: color.black_level_3,
                        fontFamily: 'Lato-Light',
                        fontSize: 16,
                      }}>
                      {ele.description}
                    </Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <Text
                      style={{
                        color: color.black_level_3,
                        fontFamily: 'Lato-Regular',
                        fontSize: 15,
                      }}>
                      ₹{ele.price}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: color.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Payment Details
          </Text>
          <View
            style={{
              marginVertical: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 20,
              borderBottomColor: color.black_level_3,
              borderBottomWidth: 1,
            }}>
            <View>
              <Text
                style={{
                  lineHeight: 25,
                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                Bag Total
              </Text>
              <Text
                style={{
                  lineHeight: 25,

                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                Coupon Discount
              </Text>
              <Text
                style={{
                  lineHeight: 25,

                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                Delivery
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  lineHeight: 25,

                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                ₹134
              </Text>
              <Text
                style={{
                  lineHeight: 25,

                  color: color.red,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                Apply Coupon
              </Text>
              <Text
                style={{
                  lineHeight: 25,

                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                ₹50.00
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: color.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
              Total Amount
            </Text>
            <Text
              style={{
                color: color.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
              ₹ {item.totalAmount}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginVertical: 15,
          }}>
          <Text
            style={{
              color: color.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Address:
          </Text>
          <Text
            style={{
              color: color.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            Rick Nelson
          </Text>
          <Text
            style={{
              color: color.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            HKL Appartment,678
          </Text>
          <Text
            style={{
              color: color.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            NK.09. US,8975689
          </Text>
        </View>
        <View
          style={{
            marginVertical: 15,
          }}>
          <Text
            style={{
              color: color.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Payment Method{' '}
          </Text>
          <View
            style={{
              marginVertical: 15,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <FontAwesome name="cc-visa" size={30} color={color.black} />
            <View style={{marginLeft: 15}}>
              <Text
                style={{
                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                **** **** **** 7879
              </Text>
              <Text
                style={{
                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                {item?.paymentMethod ?? ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: 15,
          backgroundColor: color.white,
        }}>
        <CustomButton
          type="primary"
          handleButtonPress={reOrder}
          buttonText={'Reorder'}
        />
      </View>
    </View>
  );
};

export default OrderDetails;
