import {View, Text, SafeAreaView} from 'react-native';
import React, {Fragment} from 'react';
import {COLORS, globalStyle} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import WebView from 'react-native-webview';

const DocumentDetailScreen = ({navigation, route}) => {
  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title="Society Document" />
      <View
        style={{
          flex: 1,
        }}>
        <WebView
          source={{uri: route?.params?.item?.documentImageFile}}
          style={{
            margin: '10%',
            marginHorizontal: '5%',
            backgroundColor: COLORS.themeColor,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLORS.blackFont,
          }}
        />
      </View>
    </View>
  );
};

export default DocumentDetailScreen;
