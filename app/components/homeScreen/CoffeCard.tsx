import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import {Product, Coffee} from '../../types/general';
import BGIcon from './BGIcon';

interface CoffeeCardProps {
  coffee: Product;
  handleAddToCart: (coffee: Product, size: string) => void;
}

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const CoffeeCard = ({coffee, handleAddToCart}: CoffeeCardProps) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={coffee.imagelink_square as ImageSourcePropType} // If it's a URL
        style={styles.CardImageBG}
        resizeMode="cover">
        <View style={styles.CardRatingContainer}>
          <CustomIcon
            name={'star'}
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.CardRatingText}>{coffee.average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{coffee.name}</Text>
      <Text style={styles.CardSubtitle}>{coffee.special_ingredient}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          $ <Text style={styles.CardPrice}>{coffee.prices[2].price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => handleAddToCart(coffee, coffee.prices[2].size)}>
          <BGIcon
            name={'add'}
            color={COLORS.primaryWhiteHex}
            size={FONTSIZE.size_10}
            BGColor={COLORS.primaryOrangeHex}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  CardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15,
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  CardPrice: {
    color: COLORS.primaryWhiteHex,
  },
});

export default CoffeeCard;

// import React from 'react';
// import {
//   Dimensions,
//   Image,
//   ImageBackground,
//   ImageProps,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//   BORDERRADIUS,
//   COLORS,
//   FONTFAMILY,
//   FONTSIZE,
//   SPACING,
// } from '../../theme/theme';
// import CustomIcon from '../CustomIcon';
// import {Product, Coffee} from '../../types/general';
// import BGIcon from './BGIcon';

// interface CoffeeCardProps {
//   coffee: Product;
//   handleAddToCart: (coffee: Product, size: string) => void;
// }

// const CARD_WIDTH = Dimensions.get('window').width * 0.32;

// const CoffeeCard = ({coffee, handleAddToCart}: CoffeeCardProps) => {
//   return (
//     <LinearGradient
//       start={{x: 0, y: 0}}
//       end={{x: 1, y: 1}}
//       style={styles.CardLinearGradientContainer}
//       colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
//       <View style={styles.CardImageContainer}>
//         <Image
//           source={coffee.imagelink_square}
//           style={styles.CardImage}
//           resizeMode="cover"
//         />
//         <View style={styles.CardRatingContainer}>
//           <CustomIcon
//             name={'star'}
//             color={COLORS.primaryOrangeHex}
//             size={FONTSIZE.size_16}
//           />
//           <Text style={styles.CardRatingText}>{coffee.average_rating}</Text>
//         </View>
//       </View>
//       <Text style={styles.CardTitle}>{coffee.name}</Text>
//       <Text style={styles.CardSubtitle}>{coffee.special_ingredient}</Text>
//       <View style={styles.CardFooterRow}>
//         <Text style={styles.CardPriceCurrency}>
//           $ <Text style={styles.CardPrice}>{coffee.prices[2].price}</Text>
//         </Text>
//         <TouchableOpacity
//           onPress={() => handleAddToCart(coffee, coffee.prices[2].size)}>
//           <BGIcon
//             name={'add'}
//             color={COLORS.primaryWhiteHex}
//             size={FONTSIZE.size_10}
//             BGColor={COLORS.primaryOrangeHex}
//           />
//         </TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   CardLinearGradientContainer: {
//     padding: SPACING.space_15,
//     borderRadius: BORDERRADIUS.radius_25,
//   },
//   CardImageContainer: {
//     width: CARD_WIDTH - SPACING.space_30,
//     height: CARD_WIDTH - SPACING.space_30,
//     borderRadius: BORDERRADIUS.radius_20,
//     overflow: 'hidden',
//     marginBottom: SPACING.space_15,
//   },
//   CardImage: {
//     width: '100%',
//     height: '100%',
//   },
//   CardImageBG: {
//     width: CARD_WIDTH,
//     height: CARD_WIDTH,
//     borderRadius: BORDERRADIUS.radius_20,
//     marginBottom: SPACING.space_15,
//     overflow: 'hidden',
//   },
//   CardRatingContainer: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.primaryBlackRGBA,
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: SPACING.space_10,
//     paddingHorizontal: SPACING.space_15,
//     position: 'absolute',
//     borderBottomLeftRadius: BORDERRADIUS.radius_20,
//     borderTopRightRadius: BORDERRADIUS.radius_20,
//     top: 0,
//     right: 0,
//   },
//   CardRatingText: {
//     fontFamily: FONTFAMILY.poppins_medium,
//     color: COLORS.primaryWhiteHex,
//     lineHeight: 22,
//     fontSize: FONTSIZE.size_14,
//   },
//   CardTitle: {
//     fontFamily: FONTFAMILY.poppins_medium,
//     color: COLORS.primaryWhiteHex,
//     fontSize: FONTSIZE.size_16,
//   },
//   CardSubtitle: {
//     fontFamily: FONTFAMILY.poppins_light,
//     color: COLORS.primaryWhiteHex,
//     fontSize: FONTSIZE.size_10,
//   },
//   CardFooterRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: SPACING.space_15,
//   },
//   CardPriceCurrency: {
//     fontFamily: FONTFAMILY.poppins_semibold,
//     color: COLORS.primaryOrangeHex,
//     fontSize: FONTSIZE.size_18,
//   },
//   CardPrice: {
//     color: COLORS.primaryWhiteHex,
//   },
// });

// export default CoffeeCard;
