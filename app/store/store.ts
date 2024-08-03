import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import {Bean, Coffee, StoreState} from '../types/general';

interface CartItem {
  product: Coffee | Bean;
  size: string;
  price: string;
  currency: string;
  quantity: number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addProductToCart: (
        product: Coffee | Bean,
        size: string,
        price: string,
        currency: string,
      ) => {
        set(state => {
          const existingItemIndex = state.CartList.findIndex(
            item =>
              item.product &&
              item.product.id === product.id &&
              item.size === size,
          );

          if (existingItemIndex > -1) {
            // produkt jest już w koszyku
            const updatedCartList = state.CartList.map((item, index) => {
              if (index === existingItemIndex) {
                return {...item, quantity: item.quantity + 1};
              }
              return item;
            });
            return {CartList: updatedCartList};
          } else {
            // jeśli nie ma w koszyku, dodaj go
            const newItem: CartItem = {
              product,
              size,
              price,
              currency,
              quantity: 1,
            };
            return {CartList: [...state.CartList, newItem]};
          }
        });
      },
      removeAllProducts: () => {
        set(() => ({
          // Clear the CartList
          CartList: [],
        }));
      },
      toggleToFavoritesList: (product: Coffee | Bean) => {
        set(state => {
          const isFavorite = state.FavoritesList.some(
            item => item.id === product.id,
          );

          let updatedFavoritesList;
          if (isFavorite) {
            // remove product from favorites
            updatedFavoritesList = state.FavoritesList.filter(
              item => item.id !== product.id,
            );
          } else {
            // add product to favorites
            updatedFavoritesList = [...state.FavoritesList, product];
          }

          return {FavoritesList: updatedFavoritesList};
        });
      },
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
