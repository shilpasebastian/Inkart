import {Text, View, Image, ScrollView} from 'react-native';
import color from '../Common/colors';
import {useDimensionContext} from '../../context';
import style from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {signout} from '../../storage/action';
const CustomDrawer = () => {
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const dispatch = useDispatch();

  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);
  const email = useSelector(state => state.email);
  const profileImage = useSelector(state => state.profileImage);

  const contents = [
    {
      itemId: 0,
      itemName: 'Home',
      navigateTo: 'AppFooter',
      icon: require('../../assets/images/home.png'),
    },
    {
      itemId: 1,
      itemName: 'Shop By Category',
      navigateTo: 'Categories',
      icon: require('../../assets/images/drawer.png'),
    },
    {
      itemId: 2,
      itemName: 'Orders',
      navigateTo: 'Orders',
      icon: require('../../assets/images/orders.png'),
    },
    {
      itemId: 3,
      itemName: 'Your WishList',
      navigateTo: 'WishList',
      icon: require('../../assets/images/wishlist.png'),
    },
    {
      itemId: 4,
      itemName: 'Your Account',
      navigateTo: 'Account',
      icon: require('../../assets/images/user.png'),
    },
  ];
  const handleSignOut = () => {
    dispatch(signout());
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={responsiveStyle.mainContainer}>
        <TouchableOpacity
          style={responsiveStyle.accountTouch}
          onPress={() => navigation.navigate('Account')}>
          <View style={responsiveStyle.accountImageView}>
            <Image
              style={responsiveStyle.image}
              source={
                profileImage === ''
                  ? require('../../assets/images/dummy.png')
                  : {uri: profileImage}
              }
            />
          </View>
          <View style={responsiveStyle.nameView}>
            <Text style={responsiveStyle.name}>
              {firstName} {lastName}
            </Text>
            <Text style={responsiveStyle.email}>{email}</Text>
          </View>
        </TouchableOpacity>
        <View style={responsiveStyle.commonMergin}>
          <View>
            {contents.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.itemId}
                  onPress={() =>
                    item.navigateTo === 'Categories'
                      ? navigation.navigate(item.navigateTo, {catIndex: 0})
                      : navigation.navigate(item.navigateTo)
                  }
                  // onPress={() => navigation.navigate(item.navigateTo)}
                  style={responsiveStyle.drawerView}>
                  <View style={responsiveStyle.drawerInnerView}>
                    <Image source={item.icon} style={responsiveStyle.icon} />
                    <Text style={responsiveStyle.drawerText}>
                      {item.itemName}
                    </Text>
                  </View>
                  <Image
                    source={require('../../assets/images/arrow-right.png')}
                    style={responsiveStyle.iconSecond}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* Logout */}

        <View>
          <TouchableOpacity
            onPress={handleSignOut}
            style={responsiveStyle.logoutView}>
            <Image
              source={require('../../assets/images/arrow-right.png')}
              style={[responsiveStyle.icon, responsiveStyle.arrow]}
            />
            <Text style={responsiveStyle.logoutText}>Sign Out</Text>
          </TouchableOpacity>
          {/* contact support */}
          <View style={responsiveStyle.supportView}>
            <Text style={responsiveStyle.supportHead}>Contact Support</Text>
            <Text style={responsiveStyle.supportContent}>
              If you have any problem with the app, feel free to contact our 24
              hours support system
            </Text>
          </View>
          <View style={responsiveStyle.supportTouch}>
            <Text style={responsiveStyle.supportText}>Contact</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CustomDrawer;
