import {View, Text} from 'react-native';
import React from 'react';
import {globalStyle} from '../assets/theme';
import AppHeader from './AppHeader';
import WebView from 'react-native-webview';

const AppWebview = ({navigation, route}) => {
  console.log(route.params.url);
  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title={route?.params?.screenName} />
      <WebView source={{uri: route.params.url}} style={{flex: 1}} />
    </View>
  );
};

export default AppWebview;
