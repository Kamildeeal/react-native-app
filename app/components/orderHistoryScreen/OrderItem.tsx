import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

const OrderItem = ({item, itemIndex, order}: any) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryDarkGreyHex]}
      style={styles.singleCartContainer}>
      {/* upper view */}
      <View key={itemIndex} style={styles.cartItem}>
        <View style={styles.productInfoContainer}>
          <Image
            source={item.product.imagelink_square}
            style={styles.cartItemImage}
          />
          <View style={{marginRight: 'auto', marginLeft: 12}}>
            <Text style={styles.CardTitle}>{item.product.name}</Text>
            <Text style={styles.CardSubtitle}>
              {item.product.special_ingredient}
            </Text>
          </View>
          <Text style={styles.CardCurrency}>
            $<Text style={styles.CardPrice}> {order.CartListPrice}</Text>
          </Text>
        </View>

        {/* bottom view */}
        <View style={{marginTop: 8}}>
          {item.quantitySize0 > 0 && (
            <View style={[styles.productInfoContainer, {marginTop: 10}]}>
              <View style={styles.sizePriceDetailsContainer}>
                <Text style={styles.sizeContainer}>
                  <Text style={{fontSize: 15, fontWeight: '600'}}>
                    {item.size0}
                  </Text>
                </Text>
                <View style={styles.verticalLine} />
                <View style={styles.priceContainer}>
                  <Text style={styles.priceOrnage}>$ </Text>
                  <Text style={styles.price}>
                    {item.product.prices[0].price}
                  </Text>
                </View>
              </View>

              <Text style={styles.price}>
                <Text style={styles.priceOrnage}>X</Text> {item.quantitySize0}
              </Text>
              <Text style={styles.priceOrnage}>
                {(
                  item.quantitySize0 * parseFloat(item.product.prices[0].price)
                ).toFixed(2)}
              </Text>
            </View>
          )}
          {item.quantitySize1 > 0 && (
            <View style={[styles.productInfoContainer, {marginTop: 10}]}>
              <View style={styles.sizePriceDetailsContainer}>
                <Text style={styles.sizeContainer}>
                  <Text style={{fontSize: 15, fontWeight: '600'}}>
                    {item.size1}
                  </Text>
                </Text>
                <View style={styles.verticalLine} />
                <View style={styles.priceContainer}>
                  <Text style={styles.priceOrnage}>$ </Text>
                  <Text style={styles.price}>
                    {item.product.prices[1].price}
                  </Text>
                </View>
              </View>

              <Text style={styles.price}>
                <Text style={styles.priceOrnage}>X</Text> {item.quantitySize1}
              </Text>
              <Text style={styles.priceOrnage}>
                {(
                  item.quantitySize1 * parseFloat(item.product.prices[1].price)
                ).toFixed(2)}
              </Text>
            </View>
          )}
          {item.quantitySize2 > 0 && (
            <View style={[styles.productInfoContainer, {marginTop: 10}]}>
              <View style={styles.sizePriceDetailsContainer}>
                <Text style={styles.sizeContainer}>
                  <Text style={{fontSize: 15, fontWeight: '600'}}>
                    {item.size2}
                  </Text>
                </Text>
                <View style={styles.verticalLine} />
                <View style={styles.priceContainer}>
                  <Text style={styles.priceOrnage}>$ </Text>
                  <Text style={styles.price}>
                    {item.product.prices[2].price}
                  </Text>
                </View>
              </View>

              <Text style={styles.price}>
                <Text style={styles.priceOrnage}>X</Text> {item.quantitySize2}
              </Text>
              <Text style={styles.priceOrnage}>
                {(
                  item.quantitySize2 * parseFloat(item.product.prices[2].price)
                ).toFixed(2)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginVertical: 10,
  },
  singleCartContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 15,
    marginHorizontal: 4,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: COLORS.primaryDarkGreyHex,
  },
  headerTitle: {
    fontSize: 16,
    color: COLORS.primaryWhiteHex,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.primaryWhiteHex,
  },
  headerPrice: {
    fontSize: 18,
    color: COLORS.primaryOrangeHex,
  },
  cartItem: {
    marginBottom: 8,
  },
  productInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemImage: {
    height: 70,
    width: 70,
    borderRadius: 20,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CardCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  CardPrice: {
    color: COLORS.primaryWhiteHex,
  },
  sizePriceDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
    paddingHorizontal: 18,
    paddingVertical: 3,
    borderRadius: 15,
    height: 'auto',
  },
  sizeContainer: {
    width: 43,
    height: 'auto',
    color: COLORS.primaryWhiteHex,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
  },
  verticalLine: {
    width: 2,
    alignSelf: 'stretch',
    marginHorizontal: 6,
    backgroundColor: COLORS.primaryGreyHex,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 3,
  },
  priceOrnage: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 20,
    color: COLORS.primaryOrangeHex,
  },

  price: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 20,
    color: COLORS.primaryWhiteHex,
    marginRight: 4,
  },
});

export default OrderItem;