import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import CartQuantity from '../../components/cartScreen/CartQuantity';
import {COLORS, BORDERRADIUS, SPACING, FONTFAMILY} from '../../theme/theme';
import {CartItem} from '../../types/general';

interface MultiQuantityCartItemProps {
  item: CartItem;
  isOnlyOneNonZeroQuantity?: boolean;
}

const MultiQuantityCartItem = ({item}: MultiQuantityCartItemProps) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryDarkGreyHex]}
      style={styles.multiCartContainer}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={item.product.imagelink_square}
          style={styles.cartItemImage}
        />
        <View style={{marginLeft: 20, paddingTop: 5}}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <Text style={styles.priceText}>
            {item.product.special_ingredient}
          </Text>
          <View style={styles.iconsTextContainer}>
            <Text style={styles.typeText}>{item.product.roasted}</Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <View style={{width: '100%'}}>
          {item.size0 && (
            <CartQuantity
              item={item}
              sizeIndex={0}
              size={item.size0}
              quantity={item.quantitySize0}
              isOnlyOneNonZeroQuantity={false}
            />
          )}
          {item.size1 && (
            <CartQuantity
              item={item}
              sizeIndex={1}
              size={item.size1}
              quantity={item.quantitySize1}
              isOnlyOneNonZeroQuantity={false}
            />
          )}
          {item.size2 && (
            <CartQuantity
              item={item}
              sizeIndex={2}
              size={item.size2}
              quantity={item.quantitySize2}
              isOnlyOneNonZeroQuantity={false}
            />
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  multiCartContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  cartItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  productName: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 18,
    color: COLORS.primaryWhiteHex,
  },
  priceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 11,
    color: COLORS.secondaryLightGreyHex,
  },
  iconsTextContainer: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  typeText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 12,
    color: COLORS.primaryWhiteHex,
  },
});

export default MultiQuantityCartItem;
