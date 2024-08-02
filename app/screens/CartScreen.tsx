import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';

const CartScreen = () => {
  const cartList = useStore(state => state.CartList);
  const removeAll = useStore(state => state.removeAllProducts);

  return (
    <View style={styles.container}>
      <Button
        title="Remove All Products"
        onPress={removeAll} // Correctly call the removeAllProducts function
      />
      {cartList.map(item => (
        <Text key={item.id}>
          {item.newProduct.name} + {item.quantity}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CartScreen;
