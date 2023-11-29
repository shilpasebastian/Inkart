import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import style from './style';
import {useDimensionContext} from '../../../../context';
import color from '../../../../Components/Common/colors';
import firestore from '@react-native-firebase/firestore';

const Banner = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const [bannerItems, setBannerItems] = useState([]);
  useEffect(() => {
    getBanner();
  }, []);
  const getBanner = async () => {
    await firestore()
      .collection('Banners')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              result.push(doc.data());
            }
          });
          setBannerItems(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View>
      <FlatList
        data={bannerItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          return (
            // <Image source={item.image} style={responsiveStyle.banner} />
            <ImageBackground
              source={{uri: item.image}}
              style={responsiveStyle.banner}>
              <View style={responsiveStyle.innerView}>
                <Text style={responsiveStyle.head}>{item.head}</Text>
                <Text style={responsiveStyle.content}>{item.description}</Text>
                <TouchableOpacity style={responsiveStyle.touch}>
                  <Text style={responsiveStyle.touchText}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};

export default Banner;
