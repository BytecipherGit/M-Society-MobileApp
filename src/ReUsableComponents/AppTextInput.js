import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/theme';

const AppTextInput = ({item, value, setValue, style, stopEditable}) => {
  return (
    <TextInput
      placeholder={`Enter ${item.title}`}
      editable={stopEditable ? false : true}
      keyboardType={item.keyboardType}
      secureTextEntry={item.secureTextEntry}
      placeholderTextColor={COLORS.inputtext}
      defaultValue={value}
      onChangeText={text => setValue(text)}
      style={[
        {
          marginVertical: 10,
          fontSize: 14,
          fontWeight: '400',
          color: COLORS.inputtext,
        },
        style && style,
      ]}
    />
  );
};

export default AppTextInput;
