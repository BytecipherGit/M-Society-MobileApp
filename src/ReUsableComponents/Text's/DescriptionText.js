import {View, Text} from 'react-native';
import React from 'react';

const DescriptionText = ({text, style, numberOfLines}) => {
  return (
    <Text
      style={[
        {
          fontSize: 14,
          fontFamily: 'Inter-Regular',
          color: '#6B737F',
          letterSpacing: 0.5,
        },
        style && style,
      ]}
      numberOfLines={numberOfLines ? numberOfLines : null}>
      {text}
    </Text>
  );
};

export default DescriptionText;
