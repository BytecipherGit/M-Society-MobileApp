import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {images} from './images/image';

export const COLORS = {
  primary: '#177085',
  titleFont: '#4C4C4C',
  descFont: '#9B9B9B',
  inputBorder: '#9CA2AD',
  inputtext: '#384252',
  bluetext: '#0038FF',
  buttonColor: '#FFAA00',
  themeColor: '#CAE7FF',
  themeBackground: '#F6FDFF',
  listCardBackTheme: '#E9F5F8',
  blackFont: '#262626',
  greyFont: '#72767C',
  inputTitleBlack: '#111827',
  inputBackground: '#F4F6F8',
  inputPlaceholder: '#BABABA',
  softDescText: '#656565',
  white: '#ffffff',
};

export const globalStyle = StyleSheet.create({
  cnt: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  cntWithTheme: {
    flex: 1,
    backgroundColor: COLORS.themeColor,
  },
});

export const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.1,
  shadowRadius: 1.84,
  elevation: Platform.OS === 'ios' ? 5 : 2,
};

export const AuthThemeImage = () => {
  return (
    <View style={{height: 169, width: 181}}>
      <Image
        source={images.authThemeImage}
        style={{height: '100%', width: '100%'}}
      />
    </View>
  );
};
