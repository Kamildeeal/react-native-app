import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import {Product, CartItem, StoreState} from '../types/general';

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
            item => item.product.id === product.id,
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
            const newItem: CartItem = {
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
          // clear the CartList
          CartList: [],
        }));
      },

      toggleToFavoritesList: (product: Product) => {
        set(state => {
          const isFavorite = state.FavoritesList.some(
            item => item && item.id === product.id,
          );

          let updatedFavoritesList;
          if (isFavorite) {
            // remove product from favorites
            updatedFavoritesList = state.FavoritesList.filter(
              item => item.id !== product.id,
              console.log(updatedFavoritesList),
            );
          } else {
            // add product to favorites
            updatedFavoritesList = [...state.FavoritesList, product];
            console.log(updatedFavoritesList);
          }

          return {FavoritesList: updatedFavoritesList};
        });
      },

      increaseQuantity: (productId: string, size: string) => {
        set(state => {
          const updatedCartList = state.CartList.map(item => {
            if (item.product.id === productId) {
              const updatedItem = {...item};
              if (item.size0 === size) {
                updatedItem.quantitySize0 += 1;
              } else if (item.size1 === size) {
                updatedItem.quantitySize1 += 1;
              } else if (item.size2 === size) {
                updatedItem.quantitySize2 += 1;
              }
              return updatedItem;
            }
            // if there is no item with this id just retrun item
            return item;
          });
          return {CartList: updatedCartList};
        });
      },
      decreaseQuantity: (productId: string, size: string) => {
        set(state => {
          // map through CartList and update the quantities or remove items with quantity 0
          const updatedCartList = state.CartList.map(item => {
            if (item.product.id === productId) {
              const updatedItem = {...item};
              if (item.size0 === size) {
                updatedItem.quantitySize0 -= 1;
                if (updatedItem.quantitySize0 === 0) {
                  // Clear the size if quantity is 0
                  updatedItem.size0 = '';
                }
              } else if (item.size1 === size) {
                updatedItem.quantitySize1 -= 1;
                if (updatedItem.quantitySize1 === 0) {
                  updatedItem.size1 = '';
                }
              } else if (item.size2 === size) {
                updatedItem.quantitySize2 -= 1;
                if (updatedItem.quantitySize2 === 0) {
                  updatedItem.size2 = '';
                }
              }
              return updatedItem;
            }
            return item;
          });

          // Remove items that have all quantities as 0
          const filteredCartList = updatedCartList.filter(
            item =>
              item.quantitySize0 > 0 ||
              item.quantitySize1 > 0 ||
              item.quantitySize2 > 0,
          );

          return {CartList: filteredCartList};
        });
      },

      countCartPrice: () => {
        set(state => {
          const cartPrice = state.CartList.reduce((total, item) => {
            let itemPrice = 0;
            if (item.size0 && item.quantitySize0 > 0) {
              itemPrice +=
                parseFloat(
                  item.product.prices.find(
                    (p: {size: string}) => p.size === item.size0,
                  )?.price || '0',
                ) * item.quantitySize0;
            }
            if (item.size1 && item.quantitySize1 > 0) {
              itemPrice +=
                parseFloat(
                  item.product.prices.find(
                    (p: {size: string}) => p.size === item.size1,
                  )?.price || '0',
                ) * item.quantitySize1;
            }
            if (item.size2 && item.quantitySize2 > 0) {
              itemPrice +=
                parseFloat(
                  item.product.prices.find(
                    (p: {size: string}) => p.size === item.size2,
                  )?.price || '0',
                ) * item.quantitySize2;
            }
            return total + itemPrice;
          }, 0);
          //set calculated price
          return {CartPrice: cartPrice};
        });
      },
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
