//import useDimensionContext from '../../../context';
import {useState} from 'react';

import style from '../style';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import color from '../../../Components/Common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDimensionContext} from '../../../context';
import Accordion from 'react-native-collapsible/Accordion';
import StarRating from 'react-native-star-rating-widget';
import {useNavigation} from '@react-navigation/native';

const ProductReview = props => {
  const {product} = props;
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [rating, setRating] = useState(3);
  const navigation = useNavigation();
  const handleRedirect = () => {
    navigation.navigate('Review', {product: product});
  };
  return (
    <View style={{marginVertical: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <Text
          style={{
            color: color.black_level_3,
            fontFamily: 'Lato-Regular',
            fontSize: 18,
          }}>
          Product Review (1)
        </Text>
        <TouchableOpacity onPress={handleRedirect}>
          <Text
            style={{
              color: color.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 16,
            }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 15,
          backgroundColor: color.lightgGrey,
          borderRadius: 14,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={require('../../../assets/images/dummy.png')}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
              borderRadius: 25,
              overflow: 'hidden',
            }}
          />
          <View>
            <Text
              style={{
                color: color.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
                marginLeft: 10,
              }}>
              Rentric Henork
            </Text>
            <StarRating starSize={20} rating={rating} onChange={() => {}} />
          </View>
        </View>
        <Text
          style={{
            color: color.black_level_3,
            fontFamily: 'Lato-Regular',
            fontSize: 16,
          }}>
          The Collapse component in ReactJS is a versatile UI element that
          enables you to toggle the visibility of content, making it expandable
          or collapsible. Its commonly used to create accordions, collapsible
          menus, or any other sections that need to be hidden or shown based on
          user interaction
        </Text>
      </View>
    </View>
  );
};

export default ProductReview;
