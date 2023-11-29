import {useEffect, useState, useRef} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDimensionContext} from '../../context';
import style from './style';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import CommonHeaderRight from '../../Components/CommonHeaderRight';
import color from '../../Components/Common/colors';
import StarRating from 'react-native-star-rating-widget';
import ActionSheet from 'react-native-actions-sheet';
import CustomTextInput from '../../Components/CoustomTextInput';
import CustomButton from '../../Components/CoustomButton';

const Review = () => {
  const dimensions = useDimensionContext();
  const navigation = useNavigation();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [rating, setRating] = useState(3);
  const actionSheetRef = useRef(null);
  const openActionSheet = () => {
    actionSheetRef.current.show();
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type="back" />,
      headerRight: () => (
        <CommonHeaderRight plus={true} handlePlusIcon={openActionSheet} />
      ),
      title: 'Reviews',
    });
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={responsiveStyle.container}>
      <View style={responsiveStyle.reviewBox}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={require('../../assets/images/dummy.png')}
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
            <StarRating starSize={20} rating={rating} onChange={setRating} />
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
      <ActionSheet ref={actionSheetRef}>
        <View style={{padding: 20}}>
          <Text style={{fontFamily: 'Lato-Bold', fontSize: 22, lineHeight: 50}}>
            Write a Review
          </Text>
          <StarRating starSize={40} rating={rating} onChange={setRating} />
          <CustomTextInput placeholder="Write here" multiline={true} />
          <CustomButton buttonText={'Submit Review'} type="primary" />
        </View>
      </ActionSheet>
    </ScrollView>
  );
};
export default Review;
