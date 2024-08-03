export type StoreState = {
  CartList: any[];
  CoffeeList: Coffee[];
  BeanList: Bean[];
  CartPrice: number;
  FavoritesList: any[];
  OrderHistoryList: any[];
  addProductToCart: (
    product: Coffee | Bean,
    size: string,
    price: string,
    currency: string,
  ) => void;
  removeAllProducts: (product: Coffee | Bean) => void;
  toggleToFavoritesList: (product: Coffee | Bean) => void;
};

export type CartItem = {
  newProduct: Coffee | Bean;
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
  prices: {size: string; price: string; currency: string}[];
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
  prices: {size: string; price: string; currency: string}[];
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
