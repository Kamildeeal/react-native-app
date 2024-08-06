import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import GradientBGIcon from './detailsHeaderCompontents.tsx/GradoemtBGIcon';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useStore} from '../../store/store';
import {Product, RootStackParamList} from '../../types/general';

interface HeaderBarProps {
  title?: string;
  product: Product;
}

const DetailHeader = ({title, product}: HeaderBarProps) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>
    >();
  const toggleFavorites = useStore(state => state.toggleToFavoritesList);
  const favoriteList = useStore(state => state.FavoritesList);

  if (!product) {
    return;
  }

  const isFavorite = favoriteList.some(item => item && item.id == product.id);

  return (
    <View>
      <View style={styles.HeaderContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <GradientBGIcon
            name="left"
            color={COLORS.primaryLightGreyHex}
            size={FONTSIZE.size_16}
          />
        </TouchableOpacity>
        <Text>{title}</Text>
        <TouchableOpacity
          onPress={() => {
            toggleFavorites(product);
            console.log(favoriteList);
          }}>
          <GradientBGIcon
            name="like"
            color={
              isFavorite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
            }
            size={FONTSIZE.size_16}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
    maxWidth: 250,
  },
});

export default DetailHeader;
