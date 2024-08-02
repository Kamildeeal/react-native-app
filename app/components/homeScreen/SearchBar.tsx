import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import CustomIcon from '../CustomIcon';
import {Coffee} from '../../types/general';

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  searchCoffee: (text: string) => void;
  setSelectedCoffee: (coffes: Coffee[]) => void;
  coffeeData: Coffee[];
}

const SearchBar = ({
  setSearchText,
  searchText,
  searchCoffee,
  setSelectedCoffee,
  coffeeData,
}: SearchBarProps) => {
  return (
    <View style={styles.InputContainerComponent}>
      <TouchableOpacity
        onPress={() => {
          searchCoffee(searchText);
        }}>
        <CustomIcon
          style={styles.InputIcon}
          name="search"
          size={FONTSIZE.size_18}
          color={
            searchText.length > 0
              ? COLORS.primaryOrangeHex
              : COLORS.primaryLightGreyHex
          }
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Find Your Coffee..."
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          searchCoffee(text);
        }}
        placeholderTextColor={COLORS.primaryLightGreyHex}
        style={styles.TextInputContainer}
      />
      {searchText.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            setSearchText('');
            setSelectedCoffee(coffeeData);
          }}>
          <CustomIcon
            style={styles.InputIcon}
            name="close"
            size={FONTSIZE.size_16}
            color={COLORS.primaryLightGreyHex}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: 60,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});
