import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import DetailHeader from '../components/detailScreen/DetailHeader';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Bean, Coffee} from '../types/general';
import CustomIcon from '../components/CustomIcon';
import {useStore} from '../store/store';

interface DetailsProps {
  item: Product;
}

type RouteParams = {
  params: DetailsProps;
};

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

const {height: screenHeight} = Dimensions.get('window');

const DetailScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();

  const {item} = route.params;
  const [selectedSize, setSelectedSize] = useState(item.prices[0]);
  const addProductToCart = useStore(state => state.addProductToCart);

  return (
    <ScrollView style={styles.ScreenContainer}>
      <ImageBackground
        source={item.imagelink_square as ImageSourcePropType}
        style={styles.ImageContainer}>
        <DetailHeader product={item} />
        <View style={styles.OpacityBgContainer}>
          <View>
            <Text style={styles.ProductName}>{item.name}</Text>
            <Text style={styles.PriceText}>{item.special_ingredient}</Text>
            <View style={styles.RateContainer}>
              <CustomIcon
                name="star"
                color={COLORS.primaryOrangeHex}
                style={{fontSize: 18, marginRight: 4}}></CustomIcon>
              <Text style={styles.RateText}>{item.average_rating}</Text>
              <Text style={styles.PriceText}>({item.ratings_count})</Text>
            </View>
          </View>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.IconsContainer}>
                <CustomIcon
                  color={COLORS.primaryOrangeHex}
                  style={{fontSize: 24}}
                  name="bean"
                />
                <Text style={styles.TypeText}>{item.type}</Text>
              </View>

              <View style={styles.IconsContainer}>
                <CustomIcon
                  color={COLORS.primaryOrangeHex}
                  style={{fontSize: 24}}
                  name="location"
                />
                <Text style={styles.TypeText}>{item.ingredients}</Text>
              </View>
            </View>
            <View style={styles.IconsTextContainer}>
              <Text style={styles.TypeText}>{item.roasted}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.InfoContainer}>
        <Text style={styles.InfoTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{item?.description}</Text>
        <Text style={styles.InfoTitle}>Size</Text>

        <View style={styles.SizeContainer}>
          {item.prices.map(size => (
            <TouchableOpacity
              key={size.size}
              onPress={() => setSelectedSize(size)}>
              <Text
                style={[
                  styles.ButtonSize,
                  selectedSize.size == size.size
                    ? {
                        color: COLORS.primaryOrangeHex,
                        borderColor: COLORS.primaryOrangeHex,
                      }
                    : {
                        color: COLORS.primaryWhiteHex,
                        borderColor: COLORS.primaryGreyHex,
                      },
                ]}>
                {size.size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.PriceButtonContainer}>
          <View style={styles.EachPriceContainer}>
            <Text style={styles.PriceText}>Price</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.CurrencyText}>{selectedSize.currency}</Text>
              <Text style={styles.EachPrice}>{selectedSize.price}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => addProductToCart(item, selectedSize.size)}>
            <Text style={styles.ButtonAddToCart}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ImageContainer: {
    height: screenHeight * 0.6,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  ProductName: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  InfoContainer: {
    padding: 15,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_15,
  },
  SizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ButtonSize: {
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 14,
    width: 100,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    textAlign: 'center',
    backgroundColor: COLORS.primaryGreyHex,
  },
  PriceButtonContainer: {
    color: COLORS.primaryWhiteHex,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
  EachPriceContainer: {
    alignItems: 'center',
  },
  EachPrice: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CurrencyText: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginRight: 4,
  },
  ButtonAddToCart: {
    color: COLORS.primaryWhiteHex,
    backgroundColor: COLORS.primaryOrangeHex,
    paddingHorizontal: 80,
    paddingVertical: 15,
    fontFamily: FONTFAMILY.poppins_semibold,
    borderRadius: 20,
  },
  OpacityBgContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    padding: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'space-between',
  },
  RateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  RateText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    marginRight: 4,
  },
  IconsContainer: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    padding: 4,
    paddingTop: 8,
    width: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconsTextContainer: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  TypeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 11,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default DetailScreen;
