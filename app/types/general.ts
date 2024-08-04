import {ImageSourcePropType} from 'react-native';

export type StoreState = {
  CartList: any[];
  CoffeeList: Product[];
  BeanList: Product[];
  CartPrice: number;
  FavoritesList: any[];
  OrderHistoryList: any[];
  addProductToCart: (product: Product, size: string) => void;
  removeAllProducts: (product: Coffee | Bean) => void;
  toggleToFavoritesList: (product: Coffee | Bean) => void;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: any;
  imagelink_portrait: any;
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
  newProduct: Product;
  quantity: number;
};

export type Coffee = {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: any;
  imagelink_portrait: any;
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
  imagelink_square: any;
  imagelink_portrait: any;
  ingredients: string;
  special_ingredient: string;
  prices: Array<{size: string; price: string; currency: string}>;
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
};

export type filteredCoffeeProps = {
  id: number | string;
  name: string;
};
