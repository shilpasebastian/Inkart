import {useEffect, useState, useCallback} from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import style from './style';
import {useDimensionContext} from '../../context';
import color from '../../Components/Common/colors';
import OrderTotal from './components/OrderTotal';
import CommonButton from '../../Components/CommonButton';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {updateCartCount} from '../../storage/action';
import Snackbar from 'react-native-snackbar';

const Cart = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [charges, setCharges] = useState(50);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
  }, []);

  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);
  const email = useSelector(state => state.email);
  const mobileNumber = useSelector(state => state.mobileNumber);

  const updateArray = productInfo => {
    const result = cartProducts.filter(x => {
      return x.id !== productInfo.id;
    });
    setTotal(total - parseFloat(productInfo.price));
    setCartProducts(result);
    dispatch(updateCartCount(cartCount - 1));
  };

  const [cartProducts, setCartProducts] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getCartProducts();
    }
  }, isFocused);
  useEffect(() => {
    if (cartProducts.length > 0) {
      setCharges(50);
    } else {
      setCharges(0);
    }
  }, [cartProducts]);

  const getCartProducts = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          let totalAmount = 0;
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              const amount =
                parseFloat(doc?.data().price) * parseInt(doc?.data().quantity);
              totalAmount = totalAmount + amount;
              const responseData = {id: doc.id, ...doc?.data()};
              result.push(responseData);
            }
          });
          setTotal(totalAmount);
          setCartProducts(result);
        } else {
          setCartProducts([]);
          setTotal(0);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const onButtonPress = () => {
    if (cartProducts.length > 0) {
      if (email === '' || mobileNumber === '') {
        Snackbar.show({
          text: 'You have to complete your profile to continue',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: color.red,
          textColor: color.white,
        });
        navigation.navigate('Account');
      } else {
        navigation.navigate('AddAddress', {
          cartProducts: cartProducts,
          total: parseFloat(total + charges).toFixed(2),
        });
      }
    } else {
      Snackbar.show({
        text: 'Your cart is empty',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: color.red,
        textColor: color.white,
      });
    }
  };

  const handleTotal = (type, productInfo) => {
    if (type === 'add') {
      setTotal(total + parseFloat(productInfo.price));
    } else {
      setTotal(total - parseFloat(productInfo.price));
    }
  };

  return (
    <ScrollView>
      <View>
        <FlatList
          data={cartProducts}
          extraData={cartProducts}
          renderItem={({item, index}) => (
            <RenderItem
              item={item}
              index={index}
              updateArray={updateArray}
              handleTotal={handleTotal}
            />
          )}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  padding: 30,
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Black',
                    color: color.black,
                    fontSize: 25,
                  }}>
                  Cart is Empty
                </Text>
                <TouchableOpacity>
                  <Text>Go to shop</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          ListFooterComponent={() => (
            <>
              <View style={responsiveStyle.renderValue}>
                {/* start Design */}
                <View style={responsiveStyle.offCircleValue}>
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                </View>
                <View
                  style={{
                    width: '64%',
                    height: 100,
                    backgroundColor: color.secondaryGreen,
                    padding: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Black',
                        color: color.primaryGreen,
                        fontSize: 50,
                      }}>
                      50
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: color.primaryGreen,
                          fontSize: 14,
                        }}>
                        %
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: color.primaryGreen,
                          fontSize: 14,
                        }}>
                        OFF
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          fontFamily: 'Lato-Bold',
                          color: color.black,
                          fontSize: 16,
                        }}>
                        On your First Order
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: color.black_level_3,
                          fontSize: 12,
                        }}>
                        Order above 2500 rupees
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    height: 100,
                    backgroundColor: color.secondaryGreen,
                  }}>
                  <View style={responsiveStyle.circleCenter} />
                  <View
                    style={[
                      responsiveStyle.circleCenter,
                      {marginBottom: -25 / 2},
                    ]}
                  />
                </View>
                <View
                  style={{
                    width: '25%',
                    height: 100,
                    backgroundColor: color.secondaryGreen,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: 15,
                    paddingVertical: 15,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      color: color.black_level_3,
                      fontSize: 14,
                    }}>
                    Use Code
                  </Text>
                  <View
                    style={{
                      marginVertical: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      justifyContent: 'center',
                      borderRadius: 15,
                      backgroundColor: color.primaryGreen,
                      overflow: 'hidden',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: color.white,
                        textAlign: 'center',
                      }}>
                      YN458
                    </Text>
                  </View>
                </View>
                {/* end Design */}
                <View style={{marginLeft: -25 / 2}}>
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                </View>
              </View>
              <OrderTotal total={total} charges={charges} />
              <CommonButton
                buttonText={'Proceed to Checkout'}
                onButtonPress={onButtonPress}
              />
            </>
          )}
        />
      </View>
    </ScrollView>
  );
};

const RenderItem = ({item, index, updateArray, handleTotal}) => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const userId = useSelector(state => state.userId);
  const [qun, setQun] = useState(item.quantity);
  const navigation = useNavigation();

  useEffect(() => {
    setQun(item.quantity);
  }, [item]);

  const addToCart = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', item.productId)
      .get()
      .then(snapshot => {
        firestore()
          .collection('Cart')
          .doc(snapshot?.docs[0].id)
          .update({
            quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
          });
        handleTotal('add', item);
      });
  };

  const removeItem = async () => {
    if (qun <= 1) {
      await firestore()
        .collection('Cart')
        .doc(item.id)
        .delete()
        .then(() => {
          updateArray(item);
        });
    } else {
      const temp = qun - 1;
      setQun(temp);
      firestore().collection('Cart').doc(item.id).update({quantity: temp});
      //.update({quantity: parseInt(item.quantity, 10) - 1});
      handleTotal('minus', item);
    }
  };

  const redirectToProductDetails = () => {
    navigation.navigate('ProductDetails', {product: item});
  };

  return (
    <TouchableOpacity
      onPress={redirectToProductDetails}
      style={responsiveStyle.productView}>
      <Image source={{uri: item.image}} style={responsiveStyle.productImage} />
      <View style={responsiveStyle.nameView}>
        <Text style={responsiveStyle.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={responsiveStyle.des} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={responsiveStyle.priceView}>
          <View style={responsiveStyle.priceView2}>
            <Text style={responsiveStyle.price}>₹ {item.price}</Text>
            <View style={responsiveStyle.offView}>
              <Text style={responsiveStyle.offText}>50%</Text>
            </View>
          </View>
          <View style={responsiveStyle.qunView}>
            <TouchableOpacity onPress={removeItem}>
              <Text style={responsiveStyle.qunText1}>-</Text>
            </TouchableOpacity>
            <Text style={responsiveStyle.qunText2}>{qun}</Text>

            <TouchableOpacity
              onPress={() => {
                setQun(qun + 1);
                addToCart();
              }}>
              <Text style={responsiveStyle.qunText1}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Cart;
