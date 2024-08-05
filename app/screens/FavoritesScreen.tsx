import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';

const FavoritesScreen = () => {
  const Favorites = useStore(state => state.FavoritesList);
  const removeAll = useStore(state => state.removeAllProducts);

  return (
    <View>
      <Text>FavoritesScreen</Text>
      <Button title="Remove All Products" onPress={() => removeAll()} />
      {Favorites.map(e => (
        <Text>{e.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default FavoritesScreen;
