import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';

const FavoritesScreen = () => {
  const Favorites = useStore(state => state.FavoritesList);

  return (
    <View>
      <Text>FavoritesScreen</Text>
      {Favorites.map(e => (
        <Text>{e.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default FavoritesScreen;
