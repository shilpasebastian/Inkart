import {View, Text, FlatList, Image} from 'react-native';
import {useDimensionContext} from '../../context';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import CustomSearch from '../../Components/CustomSearch';
import CommonHeaderRight from '../../Components/CommonHeaderRight';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import CommonEmpty from '../../Components/CommonEmpty';

const Shop = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const route = useRoute();
  const {type} = route.params;
  const categories = useSelector(state => state.categories);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
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
  useEffect(() => {
    if (type === 'all') {
      setSelectedCategory('Shop');
    }
  }, [type]);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type="back" />,
      headerRight: () => <CommonHeaderRight cart={true} />,
      title: selectedCategory,
    });
  }, [selectedCategory]);
  const handleCategories = async item => {
    setSelectedCategory(item.name);
    await firestore()
      .collection('Products')
      .where('categoryId', '==', item.id)
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
        } else {
          setProducts([]);
        }
      })
      .catch(err => {
        console.log(err);
      });

    // console.warn(item.id);
  };
  const handleRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => handleCategories(item)}
        style={responsiveStyle.catItemView}>
        <Text style={responsiveStyle.catItem}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const handleProduct = item => {
    navigation.navigate('ProductDetails', {product: item});
  };
  const handleProductRender = ({item, index}) => {
    return (
      <TouchableOpacity
        style={responsiveStyle.productView}
        onPress={() => handleProduct(item)}>
        <Image
          source={{uri: item.image}}
          style={responsiveStyle.productImage}
        />
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
              <Text style={responsiveStyle.qunText1}>-</Text>
              <Text style={responsiveStyle.qunText2}>0</Text>
              <Text style={responsiveStyle.qunText1}>+</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const emptyComponent = () => {
    return <CommonEmpty title={'No Products Available'} />;
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: 50}}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={handleRenderItem}
          style={responsiveStyle.categories}
          contentContainerStyle={responsiveStyle.contentStyle}
        />
      </View>
      <CustomSearch filter={true} />
      <View style={[responsiveStyle.commonPadding, {flex: 1}]}>
        <FlatList
          data={products}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={handleProductRender}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={emptyComponent}
        />
      </View>
    </View>
  );
};
export default Shop;
