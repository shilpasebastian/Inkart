import {ScrollView, View, Text} from 'react-native';
import style from './style';
import CommonHeader from '../../Components/CommonHeader';
import CustomSearch from '../../Components/CustomSearch';
import Banner from './Components/Banner';
import RecentBought from './Components/RecentBought';
import ShopCategory from './Components/ShopCategory';
import ProductScroll from '../../Components/ProductScroll';
import OfferProducts from '../../Components/OfferProducts';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {updateWishIds} from '../../storage/action';
import {useIsFocused} from '@react-navigation/native';

const Home = () => {
  const userId = useSelector(state => state.userId);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      scrollRef.current.scrollTo({y: 0, animated: true});
    }
  }, [isFocused]);

  useEffect(() => {
    getWishIds();
  }, []);

  const getWishIds = async () => {
    await firestore()
      .collection('WishList')
      .where('userId', '==', userId)
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          dispatch(updateWishIds([]));
        } else {
          const idArray = [];
          snapShot?.docs.forEach(document => {
            idArray.push(document?.data().productId);
          });
          dispatch(updateWishIds([idArray]));
        }
      });
  };
  return (
    <View style={style.main}>
      <CommonHeader />
      <ScrollView
        ref={scrollRef}
        style={style.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <Banner />
        <RecentBought />
        <ShopCategory />
        <ProductScroll />
        <OfferProducts />
        <Text style={style.footText}>
          Didn't find what you are looking for?
        </Text>
        <View style={style.footButton}>
          <Text style={style.footButtonText}>Browse Category</Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default Home;
