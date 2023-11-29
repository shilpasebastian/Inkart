import {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import style from './style';
import CustomSearch from '../../Components/CustomSearch';
import {useDimensionContext} from '../../context';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import color from '../../Components/Common/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import {useSelector} from 'react-redux';
const Categories = () => {
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const route = useRoute();

  const [active, setActive] = useState(0);
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const [products, setProducts] = useState([]);
  const categories = useSelector(state => state.categories);
  const {catIndex = 0} = route?.params ?? {};
  useEffect(() => {
    if (catIndex) {
      setActive(catIndex);
    }
  }, [catIndex]);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
    // getCategories();
    getProducts();
  }, []);

  // const getCategories = async () => {
  //   await firestore()
  //     .collection('Categories')
  //     .get()
  //     .then(snapshot => {
  //       if (!snapshot.empty) {
  //         const result = [];
  //         snapshot.docs.forEach(doc => {
  //           if (doc.exists) {
  //             result.push(doc.data());
  //           }
  //         });
  //         setCategories(result);
  //         setActive(0);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

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
          setProducts(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCategoryTouch = index => {
    setActive(index);
  };

  const handleProduct = item => {
    navigation.navigate('ProductDetails', {product: item});
  };
  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <View style={responsiveStyle.rowStyle}>
          <View>
            <FlatList
              data={categories}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={responsiveStyle.catFlatStyle}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      responsiveStyle.catTouch,
                      {
                        backgroundColor:
                          index === active ? color.white : 'transparent',
                      },
                    ]}
                    onPress={() => handleCategoryTouch(index)}>
                    <Image
                      source={{uri: item.image}}
                      style={responsiveStyle.catImage}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
              source={require('../../assets/images/home1bg.jpg')}
              style={responsiveStyle.backImage}>
              <Text style={responsiveStyle.catName} numberOfLines={1}>
                {categories[active]?.name}
              </Text>
              <Text style={responsiveStyle.catDes} numberOfLines={3}>
                {categories[active]?.description}
              </Text>
            </ImageBackground>
            <FlatList
              numColumns={3}
              data={products}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={responsiveStyle.proStyle}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={responsiveStyle.proContainer}
                    onPress={() => handleProduct(item)}>
                    <View style={responsiveStyle.imageBg}>
                      <Image
                        source={{uri: item.image}}
                        style={responsiveStyle.proImage}
                      />
                    </View>
                    <Text style={responsiveStyle.proName}>{item.name}</Text>
                    <Text style={responsiveStyle.proDes}>₹ {item.price}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
export default Categories;
