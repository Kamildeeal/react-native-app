import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/header/HeaderBar';
import SingleQuantityCartItem from '../components/cartScreen/SingleQuantityCartItem';
import MultiQuantityCartItem from '../components/cartScreen/MultiQuantityCartItem';
import PaymentFooter from '../components/cartScreen/FooterCartScreen';
import EmptyListAnimation from '../components/cartScreen/EmptyListAnimation';
import {CartItem} from '../types/general';

const CartScreen = () => {
  // const removeAll = useStore(state => state.removeAllProducts);
  const cartList = useStore(state => state.CartList);

  const checkIfOnlyOneNonZeroQuantity = (item: CartItem) => {
    const quantities = [
      item.quantitySize0,
      item.quantitySize1,
      item.quantitySize2,
    ];
    const nonZeroQuantities = quantities.filter(quantity => quantity > 0);
    return nonZeroQuantities.length === 1;
  };

  const countCartPrice = useStore(state => state.countCartPrice);

  useEffect(() => {
    countCartPrice();
  }, [cartList, countCartPrice]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* <Button title="Remove All Products" onPress={() => removeAll()} /> */}
        <HeaderBar title={`Cart`} />

        {cartList.length == 0 ? (
          <EmptyListAnimation title={'Cart is Empty'} />
        ) : (
          <>
            {cartList.map(item => {
              const isOnlyOneNonZeroQuantity =
                checkIfOnlyOneNonZeroQuantity(item);
              return (
                <ScrollView key={item.product.id}>
                  {isOnlyOneNonZeroQuantity ? (
                    <SingleQuantityCartItem
                      item={item}
                      isOnlyOneNonZeroQuantity={isOnlyOneNonZeroQuantity}
                    />
                  ) : (
                    <MultiQuantityCartItem
                      item={item}
                      isOnlyOneNonZeroQuantity={isOnlyOneNonZeroQuantity}
                    />
                  )}
                </ScrollView>
              );
            })}
          </>
        )}

        <PaymentFooter
          buttonPressHandler={undefined}
          buttonTitle={'Add to cart'}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
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
    justifyContent: 'space-evenly',
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
