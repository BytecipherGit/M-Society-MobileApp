import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/theme';
import TitleText from "./Text's/TitleText";
import LinearGradient from 'react-native-linear-gradient';

const AppButton = ({
  btnLoader,
  buttonTitle,
  onPress,
  buttonStyle,
  TextStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#FF7334', '#FFA13C']}
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 1.0}}
        locations={[0.0, 1.0]}
        style={[
          {
            height: 50,
            width: '100%',
            backgroundColor: COLORS.buttonColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: '1%',
          },
          buttonStyle && buttonStyle,
        ]}>
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
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AppButton;
