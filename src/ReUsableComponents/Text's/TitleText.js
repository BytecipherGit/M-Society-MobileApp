import {View, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/theme';

const TitleText = ({text, style, numberOfLines}) => {
  return (
    <View>
      <Text
        style={[
          {
            fontSize: 16,
            fontFamily: 'Inter-Medium',
            color: COLORS.inputtext,
          },
          style && style,
        ]}
        numberOfLines={numberOfLines ? numberOfLines : null}>
        {text}
      </Text>
    </View>
  );
};

export default TitleText;
