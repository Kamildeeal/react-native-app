import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import GradientBGIcon from './headerCompontents/GradoemtBGIcon';
import ProfilePic from './headerCompontents/ProfilePic';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/general';

interface HeaderBarProps {
  title?: string;
}

const HeaderBar = ({title}: HeaderBarProps) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>
    >();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}
        style={styles.HeaderContainer}>
        <GradientBGIcon
          name="menu"
          color={COLORS.primaryLightGreyHex}
          size={FONTSIZE.size_16}
        />
        <Text style={styles.HeaderText}>{title}</Text>
        <ProfilePic />
      </TouchableOpacity>
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
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
});

export default HeaderBar;
