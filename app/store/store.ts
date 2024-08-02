import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import {Bean, Coffee, StoreState} from '../types/general';

interface CartItem {
  newProduct: Coffee | Bean;
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

      addProductToCart: (newProduct: Coffee | Bean) => {
        set(state => {
          const existingItemIndex = state.CartList.findIndex(
            item => item.newProduct && item.newProduct.id === newProduct.id,
          );

          if (existingItemIndex > -1) {
            // product is already in cart
            const updatedCartList = state.CartList.map((item, index) => {
              if (index === existingItemIndex) {
                return {...item, quantity: item.quantity + 1};
              }
              return item;
            });
            return {CartList: updatedCartList};
          } else {
            // if not in cart, add it
            const newItem: CartItem = {
              newProduct,
              quantity: 1,
            };
            console.log('Adding new item to CartList:', newItem);
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
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
