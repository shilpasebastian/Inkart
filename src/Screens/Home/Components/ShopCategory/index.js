import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import style from './style';
import {useDimensionContext} from '../../../../context';
import color from '../../../../Components/Common/colors';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {categories} from '../../../../storage/action';
import {useNavigation} from '@react-navigation/native';

const ShopCategory = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [categorie, setCategoryItems] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await firestore()
      .collection('Categories')
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
          setCategoryItems(result);
          dispatch(categories(result));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCategories = index => {
    navigation.navigate('Categories', {catIndex: index});
  };
  return (
    <View style={responsiveStyle.container}>
      <Text style={responsiveStyle.head}>Shop By Category</Text>
      <FlatList
        data={categorie}
        numColumns={4}
        contentContainerStyle={responsiveStyle.flatList}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          const categoriesColor =
            index % 4 === 0
              ? color.category1
              : index % 4 === 1
              ? color.category2
              : index % 4 === 2
              ? color.category3
              : index % 4 === 3
              ? color.category4
              : color.category5;
          return (
            <TouchableOpacity
              style={responsiveStyle.innerView}
              onPress={() => handleCategories(index)}>
              <View
                //its is called as inline style
                style={[
                  responsiveStyle.imageView,
                  {backgroundColor: categoriesColor},
                ]}>
                <Image
                  style={responsiveStyle.image}
                  source={{uri: item.image}}
                />
              </View>
              <Text style={responsiveStyle.itemName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ShopCategory;
