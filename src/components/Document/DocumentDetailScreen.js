import {View, Text, SafeAreaView} from 'react-native';
import React, {Fragment} from 'react';
import {globalStyle} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import WebView from 'react-native-webview';

const DocumentDetailScreen = ({navigation, route}) => {
  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader navigation={navigation} title="Society Document" />
        <View
          style={{
            flex: 1,
            backgroundColor: '#1C86A0',
          }}>
          <WebView
            source={{uri: route?.params?.item?.documentImageFile}}
            style={{margin: '10%', marginHorizontal: '3%'}}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: '#1C86A0'}} />
    </Fragment>
  );
};

export default DocumentDetailScreen;
