import {useEffect, useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import style from './style';
import {useDimensionContext} from '../../../../context';
import color from '../../../../Components/Common/colors';
import {useSelector} from 'react-redux';
const Trending = () => {
  const dimension = useDimensionContext();
  const responsiveStyle = style(dimension.windowWidth, dimension.windowHeight);
  const categories = useSelector(state => state.categories);
  return (
    <View style={responsiveStyle.main}>
      <Text style={responsiveStyle.title}>Trending Category</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={responsiveStyle.flatList}
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
              : color.category1;
          return (
            <View
              style={[
                responsiveStyle.imageCon,
                {backgroundColor: categoriesColor},
              ]}>
              <Image source={{uri: item.image}} style={responsiveStyle.image} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Trending;
