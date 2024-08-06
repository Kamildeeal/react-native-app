import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import {useStore} from '../../store/store';
import {CartItem} from '../../types/general';

interface CartQuantityProps {
  item: CartItem;
  sizeIndex: number;
  size: string;
  quantity: number;
  isOnlyOneNonZeroQuantity: boolean;
}

const CartQuantity = ({
  item,
  sizeIndex,
  size,
  quantity,
  isOnlyOneNonZeroQuantity,
}: CartQuantityProps) => {
  const increaseQuantity = useStore(state => state.increaseQuantity);
  const decreaseQuantity = useStore(state => state.decreaseQuantity);
  return (
    <View
      style={[
        styles.CartItemContainer,
        {
          flexDirection: isOnlyOneNonZeroQuantity ? 'column' : 'row',
          marginLeft: isOnlyOneNonZeroQuantity ? 20 : 0,
        },
      ]}>
      <View
        style={[
          styles.LeftContainer,
          {
            alignItems: isOnlyOneNonZeroQuantity ? 'center' : 'center',
            flex: isOnlyOneNonZeroQuantity ? 1 : 0,
            marginBottom: isOnlyOneNonZeroQuantity ? 8 : 0,
            justifyContent: isOnlyOneNonZeroQuantity
              ? 'center'
              : 'space-between',
          },
        ]}>
        <View style={styles.SizeBox}>
          <Text
            style={[
              styles.SizeText,
              {
                fontSize:
                  item.product.type == 'Bean'
                    ? FONTSIZE.size_12
                    : FONTSIZE.size_16,
              },
            ]}>
            {size}
          </Text>
        </View>
        <View
          style={[
            styles.SizeCurrency,
            {marginLeft: isOnlyOneNonZeroQuantity ? 6 : 8},
          ]}>
          <Text
            style={[
              styles.CurrencySymbol,
              {
                fontSize: isOnlyOneNonZeroQuantity ? 22 : FONTSIZE.size_18,
              },
            ]}>
            $
          </Text>
          <Text
            style={[
              styles.CurrencyPrice,
              {
                fontSize: isOnlyOneNonZeroQuantity ? 22 : FONTSIZE.size_18,
              },
            ]}>
            {item.product.prices[sizeIndex].price}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.CartItemSizeValueContainer,
          {paddingRight: isOnlyOneNonZeroQuantity ? 10 : 0},
        ]}>
        <TouchableOpacity
          style={styles.CartItemIcon}
          onPress={() => decreaseQuantity(item.product.id, size)}>
          <CustomIcon
            name="minus"
            color={COLORS.primaryWhiteHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
        <View style={styles.CartItemQuantityContainer}>
          <Text style={styles.CartItemQuantityText}>{quantity}</Text>
        </View>
        <TouchableOpacity
          style={styles.CartItemIcon}
          onPress={() => increaseQuantity(item.product.id, size)}>
          <CustomIcon
            name="add"
            color={COLORS.primaryWhiteHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.primaryBlackHex,
  },
  CartContaier: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  itemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  CartItemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  LeftContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  ProductName: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 18,
    color: COLORS.primaryWhiteHex,
  },
  CartItemSingleLinearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_12,
    gap: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 11,
    color: COLORS.secondaryLightGreyHex,
  },
  TypeText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 12,
    color: COLORS.primaryWhiteHex,
  },
  CartItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  IconsTextContainer: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  CartItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  CartItemQuantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    width: 60,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    paddingVertical: SPACING.space_4,
  },
  CartItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  CartItemSizeValueContainer: {
    width: 165,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 6,
  },
  CurrencyPrice: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
  SizeBox: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 40,
    width: 80,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  CurrencySymbol: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_medium,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartQuantity;
