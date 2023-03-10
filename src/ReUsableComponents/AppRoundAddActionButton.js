import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/theme';
import AddSvg from '../assets/images/AddSvg.svg';

const AppRoundAddActionButton = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 60,
        width: 60,
        backgroundColor: COLORS.buttonColor,
        borderRadius: 1000,
        alignSelf: 'flex-end',
        position: 'absolute',
        right: '5%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AddSvg />
    </TouchableOpacity>
  );
};

export default AppRoundAddActionButton;
