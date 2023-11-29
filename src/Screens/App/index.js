import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Login';
import SignUp from '../SignUp';
import LoginPhone from '../LoginPhone';
import Home from '../Home';
import {DimensionContextProvider} from '../../context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Categories from '../Categories';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from '../Cart';
import CustomDrawer from '../../Components/CustomDrawer';
import CustomFooter from '../../Components/CustomFooter';
import Search from '../Search';
import Offers from '../Offers';
import Orders from '../Orders';
import WishList from '../WishList';
import Account from '../Account';
import style from './style';
import {store} from '../../storage/store';
import {Provider, useSelector} from 'react-redux';
import Splash from '../Splash';
import Shop from '../Shop';
import ProductDetails from '../ProductDetails';
import Review from '../Review';
import AddAddress from '../AddAddress';
import {enableLatestRenderer} from 'react-native-maps';
import OrderDetails from '../OrderDetails';
import Calculator from '../Calculator';

const Drawer = createDrawerNavigator();
const AppDrawer = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="AppFooter"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitleAlign: 'left',
        headerTitleStyle: style.title,
        // headerStyle: {
        //   height: 50,
        // },
      }}>
      <Drawer.Screen
        name="AppFooter"
        component={AppFooter}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Categories" component={Categories} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="OrderDetails" component={OrderDetails} />
      <Drawer.Screen name="WishList" component={WishList} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Shop" component={Shop} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="Review" component={Review} />
      <Drawer.Screen name="AddAddress" component={AddAddress} />
    </Drawer.Navigator>
  );
};
const Footer = createBottomTabNavigator();
const AppFooter = () => {
  return (
    <Footer.Navigator
      tabBar={props => <CustomFooter {...props} />}
      screenOptions={{
        headerLeft: props => {
          return (
            <TouchableOpacity
              style={{padding: 15}}
              onPress={() => props.navigation.goBack()}>
              <Image
                source={require('../../assets/images/left-arrow.png')}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          );
        },
        headerTitleAlign: 'left',
        headerTitleStyle: {fontFamily: 'Lato-Bold', fontSize: 22},
      }}>
      <Footer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Footer.Screen name="Categories" component={Categories} />
      <Footer.Screen name="Search" component={Search} />
      <Footer.Screen name="Offers" component={Offers} />
      <Footer.Screen name="Cart" component={Cart} />
    </Footer.Navigator>
  );
};
const AppStack = createNativeStackNavigator();
const AppNavigation = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isLoggedIn]);
  console.warn(isLoggedIn);
  return (
    <DimensionContextProvider>
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown: false}}>
          {loading ? (
            <AppStack.Screen name="Splash" component={Splash} />
          ) : (
            <>
              {isLoggedIn ? (
                <AppStack.Screen name="AppDrawer" component={AppDrawer} />
              ) : (
                <>
                  <AppStack.Screen name="Login" component={Login} />
                  <AppStack.Screen name="SignUp" component={SignUp} />
                  <AppStack.Screen name="LoginPhone" component={LoginPhone} />
                </>
              )}
            </>
          )}
        </AppStack.Navigator>
      </NavigationContainer>
    </DimensionContextProvider>
  );
};

const App = () => {
  // useEffect(() => {
  //   enableLatestRenderer();
  // }, []);
  // return (
  //   <Provider store={store}>
  //     <AppNavigation />
  //   </Provider>
  // );

  return <Calculator />;
};
export default App;
