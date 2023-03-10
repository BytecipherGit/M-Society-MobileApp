import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/theme';

const AppLoaderSrceen = ({loader, error}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      {/*  */}
      {loader ? (
        <ActivityIndicator color={COLORS.themeColor} />
      ) : (
        <Text
          style={{fontFamily: 'Inter-Bold', color: 'red', letterSpacing: 0.5}}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default AppLoaderSrceen;
