import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {useStore} from '../store/store';

interface PaymentFooterProps {
  buttonTitle: string;
  priceText: string;
  handleRouteToPayment: () => void;
}

const FooterPayment = ({
  buttonTitle,
  priceText,
  handleRouteToPayment,
}: PaymentFooterProps) => {
  const cartPrice = useStore(state => state.CartPrice);

  // Ensure cartPrice is a number
  const displayPrice =
    typeof cartPrice === 'number' ? cartPrice.toFixed(2) : '0.00';

  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>{priceText}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.Price}>$</Text>
          <Text style={styles.PriceText}>{displayPrice}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.PayButton} onPress={handleRouteToPayment}>
        <Text style={styles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  PriceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_24,
    marginBottom: 42,
  },
  PriceContainer: {
    alignItems: 'center',
    alignContent: 'flex-start',
    width: 100,
  },
  PriceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 22,
    color: COLORS.primaryWhiteHex,
  },
  Price: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 22,
    color: COLORS.primaryOrangeHex,
    marginRight: 4,
  },
  PayButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});

export default FooterPayment;
