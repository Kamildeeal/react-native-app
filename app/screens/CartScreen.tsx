import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/header/HeaderBar';
import LinearGradient from 'react-native-linear-gradient';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import CustomIcon from '../components/CustomIcon';
import CartQuantity from '../components/cartScreen/CartQuantity';

const CartScreen = () => {
  const cartList = useStore(state => state.CartList);
  const removeAll = useStore(state => state.removeAllProducts);
  const tabBarHeight = useBottomTabBarHeight();

  const checkSize = (size: string) => {
    switch (size) {
      case 'S':
        return 0;
      case 'M':
        return 1;
      case 'L':
        return 2;
      default:
        return 0;
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      {/* <Button title="Remove All Products" onPress={() => removeAll()} /> */}
      <HeaderBar title={`Cart`} />
      {cartList.map(item => (
        <ScrollView key={item.product.id}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[COLORS.primaryGreyHex, COLORS.primaryDarkGreyHex]}
            style={styles.CartContaier}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={item.product.imagelink_square}
                style={styles.CartItemImage}
              />
              <View style={{marginLeft: 20, paddingTop: 5}}>
                <Text style={styles.ProductName}>{item.product.name}</Text>
                <Text style={styles.PriceText}>
                  {item.product.special_ingredient}
                </Text>
                <View style={styles.IconsTextContainer}>
                  <Text style={styles.TypeText}>{item.product.roasted}</Text>
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
                  />
                )}
                {item.size1 && (
                  <CartQuantity
                    item={item}
                    sizeIndex={1}
                    size={item.size1}
                    quantity={item.quantitySize1}
                  />
                )}
                {item.size2 && (
                  <CartQuantity
                    item={item}
                    sizeIndex={2}
                    size={item.size2}
                    quantity={item.quantitySize2}
                  />
                )}
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      ))}
    </ScrollView>
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
