import {useEffect, useState} from 'react';

import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {useDimensionContext} from '../../../../context';
import style from './style';
import {useNavigation} from '@react-navigation/native';

const RecentBought = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const navigation = useNavigation();

  const [recentItem, setRecentItem] = useState([]);
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
              result.push(doc.data());
            }
          });
          setRecentItem(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // const recentItem = [
  //   {id: 0, image: require('../../../../assets/images/apple.png')},
  //   {id: 1, image: require('../../../../assets/images/strawberry.png')},
  //   {id: 2, image: require('../../../../assets/images/lemon.png')},
  //   {id: 3, image: require('../../../../assets/images/bananas.png')},
  //   {id: 4, image: require('../../../../assets/images/grapes.png')},
  // ];

  const handleProduct = item => {
    navigation.navigate('ProductDetails', {product: item});
  };
  return (
    <View style={responsiveStyle.conatiner}>
      <Text style={responsiveStyle.head}>Buy from Recently Bought</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recentItem}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={responsiveStyle.contentView}
              onPress={() => handleProduct(item)}>
              <Image source={{uri: item.image}} style={responsiveStyle.image} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default RecentBought;
