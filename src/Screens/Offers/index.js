import {useEffect} from 'react';
import {View, Text, ScrollView, Dimensions, FlatList} from 'react-native';
import style from './style';
import CustomSearch from '../../Components/CustomSearch';
import color from '../../Components/Common/colors';
import {useDimensionContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
const Offers = () => {
  const dimensions = useDimensionContext();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
  },[]);
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const offersArray = [
    {
      offer: '41',
      head: 'Midnight Sale Offer',
      content: 'On all orders above Rs.900',
      code: 'PK568',
    },
    {
      offer: '50',
      head: 'Monsoon Sale Offer',
      content: 'On all orders above Rs.500',
      code: 'UY874',
    },
    {
      offer: '62',
      head: 'Christmas Sale Offer',
      content: 'On all orders above Rs.800',
      code: 'DF856',
    },
    {
      offer: '78',
      head: 'Diwali Sale Offer',
      content: 'On all orders above Rs.800',
      code: 'LIU895',
    },
    {
      offer: '74',
      head: 'Eid Sale Offer',
      content: 'On all orders above Rs.250',
      code: 'QW842',
    },
  ];
  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <View style={responsiveStyle.contentStyle}>
          <FlatList
            data={offersArray}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item, index}) => {
              return (
                <View style={responsiveStyle.renderValue}>
                  {/* start Design */}
                  <View style={responsiveStyle.offCircleValue}>
                    <View style={responsiveStyle.circleRight} />
                    <View style={responsiveStyle.circleRight} />
                    <View style={responsiveStyle.circleRight} />
                    <View style={responsiveStyle.circleRight} />
                    <View style={responsiveStyle.circleRight} />
                  </View>
                  <View
                    style={{
                      width: '64%',
                      height: 100,
                      backgroundColor: color.secondaryGreen,
                      padding: 20,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: 'Lato-Black',
                          color: color.primaryGreen,
                          fontSize: 50,
                        }}>
                        {item.offer}
                      </Text>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Lato-Regular',
                            color: color.primaryGreen,
                            fontSize: 14,
                          }}>
                          %
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Lato-Regular',
                            color: color.primaryGreen,
                            fontSize: 14,
                          }}>
                          OFF
                        </Text>
                      </View>
                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            fontFamily: 'Lato-Bold',
                            color: color.black,
                            fontSize: 16,
                          }}>
                          {item.head}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Lato-Regular',
                            color: color.black_level_3,
                            fontSize: 12,
                          }}>
                          {item.content}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      height: 100,
                      backgroundColor: color.secondaryGreen,
                    }}>
                    <View style={responsiveStyle.circleCenter} />
                    <View
                      style={[
                        responsiveStyle.circleCenter,
                        {marginBottom: -25 / 2},
                      ]}
                    />
                  </View>
                  <View
                    style={{
                      width: '25%',
                      height: 100,
                      backgroundColor: color.secondaryGreen,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingRight: 15,
                      paddingVertical: 15,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: color.black_level_3,
                        fontSize: 14,
                      }}>
                      Use Code
                    </Text>
                    <View
                      style={{
                        marginVertical: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        justifyContent: 'center',
                        borderRadius: 15,
                        backgroundColor: color.primaryGreen,
                        overflow: 'hidden',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: color.white,
                          textAlign: 'center',
                        }}>
                        {item.code}
                      </Text>
                    </View>
                  </View>
                  {/* end Design */}
                  <View style={{marginLeft: -25 / 2}}>
                    <View style={responsiveStyle.circleRight} />
                    <View style={responsiveStyle.circleRight} />
                    <View style={responsiveStyle.circleRight} />
                    <View style={responsiveStyle.circleRight} />
                    <View style={responsiveStyle.circleRight} />
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default Offers;
