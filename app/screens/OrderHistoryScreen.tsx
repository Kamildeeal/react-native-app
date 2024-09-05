import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';
import {OrderHistoryItem} from '../types/general';

const OrderHistoryScreen = () => {
  const orderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const removeOrderHistoryList = useStore(
    (state: any) => state.removeOrderHistory,
  );
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={removeOrderHistoryList}>
        <Text style={styles.header}>Clear order history</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Order History</Text>
      {orderHistoryList.length === 0 ? (
        <Text style={styles.emptyMessage}>No orders found</Text>
      ) : (
        orderHistoryList.map((order: OrderHistoryItem, index: number) => (
          <View key={index} style={styles.orderContainer}>
            <Text style={styles.orderDate}>{order.OrderDate}</Text>
            {order.CartList.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.cartItem}>
                <Text style={styles.productName}>{item.product.name}</Text>
                <Text style={styles.productQuantity}>
                  Quantity Size0: {item.quantitySize0}, Size1:{' '}
                  {item.quantitySize1}, Size2: {item.quantitySize2}
                </Text>
              </View>
            ))}
            <Text style={styles.totalPrice}>
              Total Price: ${order.CartListPrice}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  orderContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
});

export default OrderHistoryScreen;
