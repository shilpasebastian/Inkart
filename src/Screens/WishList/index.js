import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import style from './style';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDimensionContext} from '../../context';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import color from '../../Components/Common/colors';
import {updateCartCount} from '../../storage/action';
import CommonHeaderRight from '../../Components/CommonHeaderRight';

const WishList = props => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);

  const [wishItems, setWishItems] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  // useEffect(() => {
  //   getWishList();
  // }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      getWishList();

      navigation.setOptions({
        headerRight: () => <CommonHeaderRight cart={true} />,
        headerLeft: () => <CommonHeaderLeft />,
      });
    }, [props.navigation]),
  );

  const getWishList = async () => {
    await firestore()
      .collection('WishList')
      .where('userId', '==', userId)
      .get()
      .then(snapShot => {
        console.warn(userId);
        if (snapShot.empty) {
          setWishItems([]);
        } else {
          const objArray = [];
          snapShot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setWishItems(objArray);
        }
      });
  };

  const addToCart = async itemToAdd => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', itemToAdd.id)
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: itemToAdd.description,
            name: itemToAdd.name,
            price: itemToAdd.price,
            quantity: 1,
            userId: userId,
            productId: itemToAdd.id,
            image: itemToAdd.image,
          });
          dispatch(updateCartCount(cartCount + 1));
        } else {
          firestore()
            .collection('Cart')
            .doc(snapShot?.docs[0].id)
            .update({
              quantity: parseInt(snapShot?.docs[0].data().quantity, 10) + 1,
            });
        }
      });
  };
  const removeItem = async itemToRemove => {
    await firestore()
      .collection('WishList')
      .doc(itemToRemove.id)
      .delete()
      .then(() => {
        const filteredWishList = wishItems.filter(
          ele => ele.id !== itemToRemove.id,
        );
        setWishItems(filteredWishList);
      });
  };

  const navigateToShop = () => {
    navigation.navigate('Shop', {type: 'all'});
  };

  // const wishItems = [
  //   {
  //     id: 1,
  //     image: require('../../assets/images/lemon.png'),
  //     title: 'Lemon',
  //     des: ' Fresh Direct From Farms',
  //     off: '50%',
  //     price: 13.0,
  //   },
  //   {
  //     id: 2,
  //     image: require('../../assets/images/lemon.png'),
  //     title: 'Lemon',
  //     des: ' Fresh Direct From Farms',
  //     off: '50%',
  //     price: 13.0,
  //   },
  //   {
  //     id: 3,
  //     image: require('../../assets/images/lemon.png'),
  //     title: 'Lemon',
  //     des: ' Fresh Direct From Farms',
  //     off: '50%',
  //     price: 13.0,
  //   },
  //   {
  //     id: 4,
  //     image: require('../../assets/images/lemon.png'),
  //     title: 'Lemon',
  //     des: ' Fresh Direct From Farms',
  //     off: '50%',
  //     price: 13.0,
  //   },
  //   {
  //     id: 5,
  //     image: require('../../assets/images/lemon.png'),
  //     title: 'Lemon',
  //     des: ' Fresh Direct From Farms',
  //     off: '50%',
  //     price: 13.0,
  //   },
  // ];
  return (
    <View style={responsiveStyle.container}>
      <FlatList
        data={wishItems}
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
                Your WishList is Empty
              </Text>
              <TouchableOpacity style={{padding: 15}} onPress={navigateToShop}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 16,
                    color: color.black,
                  }}>
                  Go To Shop
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <View style={responsiveStyle.productView}>
              <Image
                source={{uri: item.image}}
                style={responsiveStyle.productImage}
              />
              <View style={responsiveStyle.secondView}>
                <Text style={responsiveStyle.title} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={responsiveStyle.desc} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={responsiveStyle.bottomView}>
                  <Text style={responsiveStyle.price}>{item.price}</Text>

                  <TouchableOpacity
                    onPress={() => addToCart(item)}
                    style={responsiveStyle.cartView}>
                    <Text style={responsiveStyle.cartText}>Add To Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => removeItem(item)}
                style={responsiveStyle.removeView}>
                <Image
                  source={require('../../assets/images/delete-white.png')}
                  style={responsiveStyle.remove}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};
export default WishList;
