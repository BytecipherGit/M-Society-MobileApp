import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import WebView from 'react-native-webview';
import AppButton from '../../ReUsableComponents/AppButton';
import Pdf from 'react-native-pdf';

const DocumentDetailScreen = ({navigation, route}) => {
  let fileType = '';
  fileType = route?.params?.item?.documentImageFile.slice(
    route?.params?.item?.documentImageFile.length - 3,
    route?.params?.item?.documentImageFile.length - 0,
  );

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title="Society Document" />
      <View
        style={{
          flex: 1,
        }}>
        {Platform.OS === 'android' && fileType === 'pdf' ? (
          <View
            style={{
              margin: '10%',
              marginHorizontal: '5%',
              backgroundColor: COLORS.themeColor,
              borderRadius: 10,
              borderColor: COLORS.blackFont,
              flex: 1,
            }}>
            <Pdf
              source={{
                uri: route?.params?.item?.documentImageFile,
              }}
              trustAllCerts={false}
              style={{
                flex: 1,
                borderWidth: 1,
                borderRadius: 10,
              }}
            />
          </View>
        ) : (
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
        )}
      </View>
    </View>
  );
};

export default DocumentDetailScreen;
