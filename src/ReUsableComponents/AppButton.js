import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../assets/theme';
import TitleText from "./Text's/TitleText";
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getAsyncValue} from '../assets/services';

const AppButton = ({
  btnLoader,
  buttonTitle,
  onPress,
  buttonStyle,
  TextStyle,
  renderIcon = () => null,
  TouchableStyle = {},
  colorArray = [],
}) => {
  const state = useSelector(state => state.AuthReducer.userDetail);

  return (
    <TouchableOpacity onPress={onPress} style={TouchableStyle}>
      <LinearGradient
        colors={
          colorArray.length > 0
            ? colorArray
            : [
                state && state.data && state.data.societyId
                  ? state.data.societyId.buttonHoverBgColour
                  : '#FF7334',
                state && state.data && state.data.societyId
                  ? state.data.societyId.buttonHoverBgColour
                  : '#FFA13C',
              ]
        }
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
          <View style={{flexDirection: 'row'}}>
            {renderIcon()}
            <TitleText
              text={buttonTitle}
              style={[
                {
                  color:
                    state && state.data && state.data.societyId
                      ? state.data.societyId.fontColour
                      : 'white',
                },
                TextStyle && TextStyle,
              ]}
            />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AppButton;
