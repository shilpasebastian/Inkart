import {View, Text, ScrollView} from 'react-native';
import style from './style';
import CustomSearch from '../../Components/CustomSearch';
import Trending from './compondents/Trending';
import OfferProducts from '../../Components/OfferProducts';
const Search = () => {
  return (
    <View style={style.main}>
      <ScrollView
        style={style.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <Trending />
        <OfferProducts />
      </ScrollView>
    </View>
  );
};
export default Search;
