import {ImageSourcePropType} from 'react-native';

export type StoreState = {
  CoffeeList: Product[];
  BeanList: Product[];
  FavoritesList: Product[];
  CartList: CartItem[];
  OrderHistoryList: CartItem[];
  CartPrice: number;
  addProductToCart: (product: Product, size: string) => void;
  removeAllProducts: () => void;
  countCartPrice: () => void;
  toggleToFavoritesList: (product: Product) => void;
  increaseQuantity: (productId: string, size: string) => void;
  decreaseQuantity: (productId: string, size: string) => void;
};

// add types to screens
export type RootStackParamList = {
  HomeScreen: undefined;
  DetailScreen: {item: Product};
  PaymentScreen: undefined;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: number | any;
  imagelink_portrait: number | any;
  ingredients: string;
  special_ingredient: string;
  prices: Array<{size: string; price: string; currency: string}>;
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
};

export type CartItem = {
  product: Product;
  quantitySize0: number;
  size0: string;
  quantitySize1: number;
  size1: string;
  quantitySize2: number;
  size2: string;
};

export type filteredCoffeeProps = {
  id: number | string;
  name: string;
};

export type Coffee = {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: number;
  imagelink_portrait: number;
  ingredients: string;
  special_ingredient: string;
  prices: Array<{size: string; price: string; currency: string}>;
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
};

export type Bean = {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: number;
  imagelink_portrait: number;
  ingredients: string;
  special_ingredient: string;
  prices: Array<{size: string; price: string; currency: string}>;
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
};
