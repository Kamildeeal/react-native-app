import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useStore} from '../store/store';
import {Bean, Coffee, filteredCoffeeProps, Product} from '../types/general';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/header/HeaderBar';
import HeroText from '../components/homeScreen/HeroText';
import SearchBar from '../components/homeScreen/SearchBar';
import CoffeeCard from '../components/homeScreen/CoffeCard';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import BeanCard from '../components/homeScreen/BeanCard';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const removeDuplicates = (data: Coffee[]) => {
  const uniqueNames = new Set();
  return data.filter(item => {
    if (!uniqueNames.has(item.name)) {
      uniqueNames.add(item.name);
      return true;
    }
    return false;
  });
};
const addAllOption = (data: Coffee[]) => {
  const uniqueData = removeDuplicates(data);
  return [{id: 'ALL', name: 'All'}, ...uniqueData];
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const coffeeData = useStore(state => state.CoffeeList);
  const beanData = useStore(state => state.BeanList);
  const addProductToCart = useStore(state => state.addProductToCart);
  const cartList = useStore(state => state.CartList);

  const filteredCoffeeCategories = addAllOption(coffeeData);
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: filteredCoffeeCategories[0],
  });
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee[]>(coffeeData);
  const flatListRef = useRef<FlatList>(null);

  const searchCoffee = (searchText: string) => {
    if (searchText != '') {
      flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
      setCategoryIndex({index: 0, category: filteredCoffeeCategories[0]});
      setSelectedCoffee([
        ...coffeeData.filter((item: Coffee) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      ]);
    }
  };

  const filterCoffeeByCategory = (category: filteredCoffeeProps) => {
    if (category.id === 'ALL') {
      return coffeeData;
    }
    return coffeeData.filter(coffee => coffee.name === category.name);
  };

  const tabBarHeight = useBottomTabBarHeight();

  const handleAddToCart = (product: Product, size: string) => {
    addProductToCart(product, size);
  };

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <HeaderBar />
        <HeroText />
        {/* SearchBar */}
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          searchCoffee={searchCoffee}
          setSelectedCoffee={setSelectedCoffee}
          coffeeData={coffeeData}
        />

        {/* Category scroller */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {filteredCoffeeCategories.map((coffee, index) => (
            <View key={index} style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  setCategoryIndex({
                    index: index,
                    category: filteredCoffeeCategories[index],
                  });
                  setSelectedCoffee(
                    filterCoffeeByCategory(filteredCoffeeCategories[index]),
                  );
                }}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index == index && {
                      color: COLORS.primaryOrangeHex,
                    },
                  ]}>
                  {coffee.name}
                </Text>

                {categoryIndex.index === index ? (
                  <View style={styles.ActiveCategory}></View>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffe FlatList */}
        <FlatList
          horizontal
          ref={flatListRef}
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee found!</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={selectedCoffee}
          contentContainerStyle={[styles.FlatListContainer, ,]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DetailScreen', {item});
                }}>
                <CoffeeCard coffee={item} handleAddToCart={handleAddToCart} />
              </TouchableOpacity>
            );
          }}
        />

        {/* Bean FlatList */}
        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={beanData}
          contentContainerStyle={[
            styles.FlatListContainer,
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DetailScreen', {item});
                }}>
                <BeanCard bean={item} handleAddToCart={handleAddToCart} />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 2,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default HomeScreen;
