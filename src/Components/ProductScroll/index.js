import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useDimensionContext} from '../../context';
import style from './style';
import color from '../Common/colors';
import CommonSectionHeader from '../CommonSectionHeader';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateCartCount, updateWishIds} from '../../storage/action';
import Snackbar from 'react-native-snackbar';

const ProductScroll = props => {
  const {isNavigationNeeded} = props;
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const [products, setProducts] = useState([]);
  const {userId, cartCount} = useSelector(state => state);
  const dispatch = useDispatch();
  const wishIds = useSelector(state => state.wishIds);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              const responseData = {id: doc.id, ...doc?.data()};
              result.push(responseData);
            }
          });
          setProducts(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addToCart = async item => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', item.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: item.description,
            name: item.name,
            price: item.price,
            quantity: 1,
            userId: userId,
            productId: item.id,
            image: item.image,
          });
          dispatch(updateCartCount(cartCount + 1));
        } else {
          firestore()
            .collection('Cart')
            .doc(snapshot?.docs[0].id)
            .update({
              quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
            });
        }
      });
  };

  // const products = [
  //   {
  //     id: 0,
  //     name: 'Lemon',
  //     content: 'Fresh lemons direct from farm',
  //     price: 10,
  //     image: require('../../assets/images/lemon.png'),
  //   },
  //   {
  //     id: 1,
  //     name: 'Computer Chair',
  //     content: 'Comfortable Chair',
  //     price: 3000,
  //     image: require('../../assets/images/lemon.png'),
  //   },
  //   {
  //     id: 2,
  //     name: 'Sony TV',
  //     content: 'Experience new era of Television',
  //     price: 20000,
  //     image: require('../../assets/images/lemon.png'),
  //   },
  //   {
  //     id: 3,
  //     name: 'Lemon',
  //     content: 'Fresh lemons direct from farm',
  //     price: 10,
  //     image: require('../../assets/images/lemon.png'),
  //   },
  //   {
  //     id: 4,
  //     name: 'Lemon',
  //     content: 'Fresh lemons direct from farm',
  //     price: 10,
  //     image: require('../../assets/images/lemon.png'),
  //   },
  // ];
  const navigation = useNavigation();
  const route = useRoute();

  const handleProduct = item => {
    if (route.name === 'ProductDetails') {
      isNavigationNeeded(true, item);
    } else {
      navigation.navigate('ProductDetails', {product: item});
    }
  };

  const addToWishList = productDetails => {
    firestore()
      .collection('WishList')
      .where('userId', '==', userId)
      .where('productId', '==', productDetails.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore()
            .collection('WishList')
            .add({
              created: Date.now(),
              updated: Date.now(),
              description: productDetails.description,
              name: productDetails.name,
              price: productDetails.price,
              userId: userId,
              image: productDetails.image,
              categoryId: productDetails.categoryId,
              productId: productDetails.id,
            })
            .then(resp => {
              dispatch(updateWishIds([...wishIds, productDetails.id]));
              Snackbar.show({
                text: 'Item added to wishlist',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: color.primaryGreen,
                textColor: color.white,
              });
            });
        } else {
          Snackbar.show({
            text: 'Item is in wishlist',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: color.primaryGreen,
            textColor: color.white,
          });
        }
      });
  };
  return (
    <View style={responsiveStyle.container}>
      <CommonSectionHeader
        head={'Newly Added'}
        content={'Pay less Get more,'}
        rightText={'See All'}
      />
      <View>
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleProduct(item)}
                style={{
                  width: 150,
                  height: 275,
                  padding: 15,
                  marginRight: 15,
                  marginVertical: 15,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: color.primaryGreen,
                }}>
                <TouchableOpacity onPress={() => addToWishList(item)}>
                  <Image
                    source={
                      wishIds.includes(item.id)
                        ? require('../../assets/images/wishRed.png')
                        : require('../../assets/images/wishlist.png')
                    }
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      alignSelf: 'flex-end',
                    }}
                  />
                </TouchableOpacity>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: 75,
                    height: 75,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}
                />
                <Text
                  style={{fontFamily: 'Lato-Bold', fontSize: 20}}
                  numberOfLines={1}>
                  {item.name}
                </Text>
                <Text
                  style={{fontFamily: 'Lato-Regular', fontSize: 18}}
                  numberOfLines={2}>
                  {item.description}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontFamily: 'Lato-Regular', fontSize: 20}}>
                    {item.price}
                  </Text>
                  <TouchableOpacity
                    onPress={() => addToCart(item)}
                    style={{
                      padding: 5,
                      backgroundColor: color.primaryGreen,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        fontSize: 20,
                        color: color.white,
                      }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ProductScroll;
