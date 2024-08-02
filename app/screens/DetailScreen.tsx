import {
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import DetailHeader from '../components/detailScreen/DetailHeader';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Bean, Coffee} from '../types/general';

interface DetailsProps {
  item: Coffee | Bean;
}

type RouteParams = {
  params: DetailsProps;
};

const {height: screenHeight} = Dimensions.get('window');

const DetailScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const {item} = route.params;

  return (
    <View style={styles.ScreenContainer}>
      <ImageBackground
        source={item.imagelink_square}
        style={styles.ImageContainer}
        resizeMode="cover">
        <DetailHeader />
      </ImageBackground>
      <View style={{padding: 15}}>
        <Text style={styles.InfoTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{item?.description}</Text>
        <Text style={styles.InfoTitle}>Size</Text>
        <View style={styles.SizeContainer}>
          {item.prices.map(size => (
            <Button title={size.size} key={size.size} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ImageContainer: {
    height: screenHeight * 0.6,
  },
  ProductName: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
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
});

export default DetailScreen;
