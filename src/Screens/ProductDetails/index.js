import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useDimensionContext} from '../../context';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState, useRef} from 'react';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import CommonHeaderRight from '../../Components/CommonHeaderRight';
import color from '../../Components/Common/colors';
import Iconicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating-widget';
import MoreInfo from './components/moreInfo';
import ExtraInfo from './components/ExtraInfo';
import ProductReview from './components/ProductReview';
import DeliveryInfo from './components/DeliveryInfo';
import ProductScroll from '../../Components/ProductScroll';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {updateCartCount, updateWishIds} from '../../storage/action';
import Snackbar from 'react-native-snackbar';

const ProductDetails = props => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const route = useRoute();
  const {product} = route.params;
  const navigation = useNavigation();
  const [productDetailsObj, setProductDetails] = useState({});
  const scrollRef = useRef(null);
  const [qun, setQun] = useState(1);
  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);

  const dispatch = useDispatch();
  const wishIds = useSelector(state => state.wishIds);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type="back" />,
      headerRight: () => <CommonHeaderRight cart={true} share={true} />,
      title: '',
    });
  });

  useEffect(() => {
    setProductDetails(product);
  }, [product]);
  const [rating, setRating] = useState(5);

  const navigationNeeded = (val, item) => {
    if (val) {
      scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
      setProductDetails(item);
    }
  };

  const handleQuantity = type => {
    if (type === 'plus') {
      setQun(qun + 1);
    } else {
      if (qun === 1) {
        return;
      } else {
        setQun(qun - 1);
      }
    }
  };

  const handleAddToCart = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', productDetailsObj.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: productDetailsObj.description,
            name: productDetailsObj.name,
            price: productDetailsObj.price,
            quantity: qun,
            userId: userId,
            productId: productDetailsObj.id,
            image: productDetailsObj.image,
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
    <View>
      <ScrollView ref={scrollRef}>
        <View style={responsiveStyle.heart}>
          <TouchableOpacity onPress={() => addToWishList(productDetailsObj)}>
            <Image
              source={
                wishIds.includes(productDetailsObj.id)
                  ? require('../../assets/images/wishRed.png')
                  : require('../../assets/images/wishlist.png')
              }
              style={{
                width: 40,
                height: 40,
                resizeMode: 'contain',
                alignSelf: 'flex-end',
                marginRight: 15,
              }}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={{uri: productDetailsObj.image}}
          style={responsiveStyle.proImage}
        />
        <View style={responsiveStyle.mainView}>
          <View style={responsiveStyle.padding}>
            <Text style={responsiveStyle.name}>{productDetailsObj.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <StarRating rating={rating} onChange={setRating} />
              <Text
                style={{
                  color: color.gery,
                  marginLeft: 10,
                  fontFamily: 'Lato-Regular',
                  fontSize: 18,
                }}>
                (1 rating)
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={responsiveStyle.price}>
                ₹{parseFloat(productDetailsObj.price).toFixed(2)}
              </Text>
              <Text
                style={{
                  color: color.primaryGreen,
                  marginLeft: 10,
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                }}>
                25% off
              </Text>
            </View>
            <MoreInfo />
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: color.gery,
                paddingVertical: 10,
              }}>
              <Text style={responsiveStyle.descriptionHead}>
                Product Details
              </Text>
              <Text style={responsiveStyle.description}>
                {productDetailsObj.description}
              </Text>
            </View>
            <ExtraInfo />
            <ProductReview product={product} />
            <DeliveryInfo />
          </View>
          <ProductScroll isNavigationNeeded={navigationNeeded} />
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
          padding: 8,
          borderRadius: 8,
          backgroundColor: color.primaryGreen,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '95%',
        }}>
        <View
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: color.white,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => handleQuantity('minus')}>
            <AntDesign name="minus" size={20} color={color.primaryGreen} />
          </TouchableOpacity>

          <Text
            style={{
              color: color.primaryGreen,
              fontFamily: 'Lato-Black',
              fontSize: 18,
              marginHorizontal: 10,
            }}>
            {qun}
          </Text>
          <TouchableOpacity onPress={() => handleQuantity('plus')}>
            <AntDesign name="plus" size={20} color={color.primaryGreen} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleAddToCart}>
          <Text>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ProductDetails;
