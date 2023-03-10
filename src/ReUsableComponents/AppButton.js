import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/theme';

const AppButton = ({
  btnLoader,
  buttonTitle,
  onPress,
  buttonStyle,
  TextStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          height: 47,
          width: '100%',
          backgroundColor: COLORS.buttonColor,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          marginBottom: '1%',
        },
        buttonStyle && buttonStyle,
      ]}
      onPress={() => onPress()}>
      {btnLoader ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <Text
          style={[
            {fontSize: 16, fontWeight: '500', color: 'white'},
            TextStyle && TextStyle,
          ]}>
          {buttonTitle}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
