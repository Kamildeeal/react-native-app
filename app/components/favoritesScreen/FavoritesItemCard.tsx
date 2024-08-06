import {StyleSheet, Text, View, ImageProps} from 'react-native';
import React from 'react';
import ImageBackgroundInfo from '../favoritesScreen/ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import {useStore} from '../../store/store';

interface FavoritesItemCardProps {
  imagelink_portrait: ImageProps;
  name: string;
  special_ingredient: string;
  type: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  description: string;
  favourite: boolean;
}

const FavoritesItemCard: React.FC<any> = ({product}) => {
  const toggleFavorites = useStore(state => state.toggleToFavoritesList);

  return (
    <View style={styles.CardContainer}>
      <ImageBackgroundInfo
        imagelink_portrait={product.imagelink_portrait}
        type={product.type}
        favourite={product.favourite}
        name={product.name}
        special_ingredient={product.special_ingredient}
        ingredients={product.ingredients}
        average_rating={product.average_rating}
        ratings_count={product.ratings_count}
        roasted={product.roasted}
        product={product}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.ContainerLinearGradient}>
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{product.description}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },
  ContainerLinearGradient: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
  },
  DescriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});

export default FavoritesItemCard;
