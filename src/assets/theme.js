import {View, Text, StyleSheet, Image} from 'react-native';
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
  inputTitleBlack: '#111827',
};

export const globalStyle = StyleSheet.create({
  cnt: {
    flex: 1,
    backgroundColor: COLORS.themeBackground,
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
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 5,
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
