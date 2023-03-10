import {View, Text} from 'react-native';
import React from 'react';
import {shadow} from '../assets/theme';

const FullCardBackground = ({RenderUI, styles}) => {
  return (
    <View
      style={[
        {
          ...shadow,
          flex: 1,
          backgroundColor: 'white',
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          marginTop: '2%',
        },
        styles && styles,
      ]}>
      {RenderUI()}
    </View>
  );
};

export default FullCardBackground;
