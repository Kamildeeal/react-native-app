import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/header/HeaderBar';
import EmptyListAnimation from '../components/cartScreen/EmptyListAnimation';
import FavoritesItemCard from '../components/favoritesScreen/FavoritesItemCard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Product, RootStackParamList} from '../types/general';

const FavoritesScreen = () => {
  const FavoritesList = useStore(state => state.FavoritesList);
  const tabBarHeight = useBottomTabBarHeight();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'DetailScreen'>
    >();

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Favorites" />

            {FavoritesList.length == 0 ? (
              <EmptyListAnimation title={'No Favorites'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {FavoritesList.map((item: Product) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('DetailScreen', {item});
                    }}
                    key={item.id}>
                    <FavoritesItemCard product={item} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default FavoritesScreen;
