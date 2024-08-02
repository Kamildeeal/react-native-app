import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import GradientBGIcon from './detailsHeaderCompontents.tsx/GradoemtBGIcon';

interface HeaderBarProps {
  title?: string;
}

const DetailHeader = ({title}: HeaderBarProps) => {
  return (
    <View>
      <View style={styles.HeaderContainer}>
        <GradientBGIcon
          name="left"
          color={COLORS.primaryLightGreyHex}
          size={FONTSIZE.size_16}
        />
        <Text>{title}</Text>
        <GradientBGIcon
          name="like"
          // color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
          color={COLORS.primaryRedHex}
          size={FONTSIZE.size_16}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
    maxWidth: 250,
  },
});

export default DetailHeader;
