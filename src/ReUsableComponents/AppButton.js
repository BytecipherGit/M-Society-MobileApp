import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/theme';
import TitleText from "./Text's/TitleText";

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
          height: 50,
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
        <TitleText
          text={buttonTitle}
          style={[
            {
              color: 'white',
            },
            TextStyle && TextStyle,
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
