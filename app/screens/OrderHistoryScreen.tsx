import {
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';
import {OrderHistoryItem} from '../types/general';
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
import OrderItem from '../components/orderHistoryScreen/OrderItem';

const OrderHistoryScreen = () => {
  const orderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const removeOrderHistoryList = useStore(
    (state: any) => state.removeOrderHistory,
  );

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.ScrollViewFlex]}
        style={{marginBottom: tabBarHeight}}>
        <HeaderBar title="Order History" />
        {orderHistoryList.length > 0 && (
          <TouchableOpacity onPress={removeOrderHistoryList}>
            <Text style={styles.header}>Clear order history</Text>
          </TouchableOpacity>
        )}
        {orderHistoryList.length === 0 ? (
          <Text style={styles.emptyMessage}>No orders found</Text>
        ) : (
          orderHistoryList.map((order: OrderHistoryItem, index: number) => (
            <View key={index}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.HeaderTitle}>Order Date</Text>
                  <Text style={styles.HeaderSubtitle}>{order.OrderDate}</Text>
                </View>
                <View>
                  <Text style={styles.HeaderTitle}>Total Amount</Text>
                  <Text style={styles.HeaderPrice}>
                    $ {order.CartListPrice}
                  </Text>
                </View>
              </View>

              {order.CartList.map((item, itemIndex) => (
                <OrderItem item={item} itemIndex={itemIndex} order={order} />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: SPACING.space_20,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  header: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    borderRadius: 5,
    paddingTop: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
    backgroundColor: COLORS.primaryGreyHex,
    marginVertical: 8,
  },
  test: {
    color: 'white',
  },
  orderHeader: {
    display: 'flex',
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
  cartItemImage: {
    height: 70,
    width: 70,
    borderRadius: BORDERRADIUS.radius_20,
  },
  productInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeaderSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
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
  verticalLine: {
    width: 2,
    alignSelf: 'stretch',
    marginHorizontal: 6,
    backgroundColor: COLORS.primaryGreyHex,
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: 3,
  },
  HeaderTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  HeaderPrice: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
    alignSelf: 'flex-end',
    fontWeight: '400',
  },
  cartItem: {
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  priceOrnage: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 20,
    color: COLORS.primaryOrangeHex,
  },
  CardCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  CardPrice: {
    color: COLORS.primaryWhiteHex,
  },
  price: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 20,
    color: COLORS.primaryWhiteHex,
    marginRight: 4,
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
});

export default OrderHistoryScreen;
