import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import CustomIcon from '../CustomIcon';

const CartScreen = ({item, sizeIndex, size, quantity}: any) => {
  return (
    <View style={styles.CartItemSingleSizeValueContainer}>
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
      <Text style={styles.SizeCurrency}>
        <Text style={{color: COLORS.primaryOrangeHex}}>$</Text>
        {item.product.prices[sizeIndex].price}
      </Text>
      <View style={styles.CartItemSizeValueContainer}>
        <TouchableOpacity style={styles.CartItemIcon} onPress={() => {}}>
          <CustomIcon
            name="minus"
            color={COLORS.primaryWhiteHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
        <View style={styles.CartItemQuantityContainer}>
          <Text style={styles.CartItemQuantityText}>{quantity}</Text>
        </View>
        <TouchableOpacity style={styles.CartItemIcon} onPress={() => {}}>
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
  CartItemSingleSizeValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
    width: 80,
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
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default CartScreen;
