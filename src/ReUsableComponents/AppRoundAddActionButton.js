import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/theme';
import AddSvg from '../assets/images/AddSvg.svg';
import LinearGradient from 'react-native-linear-gradient';

const AppRoundAddActionButton = ({onPress = () => null}) => {
  return (
    <LinearGradient
      // onPress={onPress}
      colors={['#FFA13C', '#FF7334']}
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 0.0}}
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
        bottom: '3%',
      }}>
      <TouchableOpacity onPress={onPress}>
        <AddSvg />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default AppRoundAddActionButton;
