import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';

const HeroText = () => {
  return (
    <Text style={styles.HeaderText}>Find the best {'\n'}coffee for you</Text>
  );
};

const styles = StyleSheet.create({
  HeaderText: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
});

export default HeroText;
