import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import {Bean, Coffee, StoreState} from '../types/general';

type Product = {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: string;
  imagelink_portrait: string;
  ingredients: string;
  special_ingredient: string;
  prices: Array<{size: string; price: string; currency: string}>;
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
};

type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],

      addProductToCart: (product: Product, size: string) => {
        set(state => {
          const existingItemIndex = state.CartList.findIndex(
            item => item.product && item.product.id === product.id,
          );

          if (existingItemIndex > -1) {
            // Product is already in the cart, update the quantity for the selected size
            const updatedCartList = state.CartList.map((item, index) => {
              if (index === existingItemIndex) {
                const updatedItem = {...item};
                if (item.size0 === size) {
                  updatedItem.quantitySize0 += 1;
                } else if (item.size1 === size) {
                  updatedItem.quantitySize1 += 1;
                } else if (item.size2 === size) {
                  updatedItem.quantitySize2 += 1;
                } else {
                  // If the size doesn't exist, add it to the first empty slot
                  if (!item.size0) {
                    updatedItem.size0 = size;
                    updatedItem.quantitySize0 = 1;
                  } else if (!item.size1) {
                    updatedItem.size1 = size;
                    updatedItem.quantitySize1 = 1;
                  } else if (!item.size2) {
                    updatedItem.size2 = size;
                    updatedItem.quantitySize2 = 1;
                  }
                }
                return updatedItem;
              }
              return item;
            });
            return {CartList: updatedCartList};
          } else {
            // Add new product to the cart
            const newItem: any = {
              product,
              quantitySize0: size === product.prices[0].size ? 1 : 0,
              size0: size === product.prices[0].size ? size : '',
              quantitySize1: size === product.prices[1]?.size ? 1 : 0,
              size1: size === product.prices[1]?.size ? size : '',
              quantitySize2: size === product.prices[2]?.size ? 1 : 0,
              size2: size === product.prices[2]?.size ? size : '',
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
