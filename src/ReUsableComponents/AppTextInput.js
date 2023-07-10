import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../assets/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';

const AppTextInput = ({
  item,
  value,
  setValue,
  style,
  stopEditable,
  renderIcon,
  showEyeIcon,
  onPressEye,
  countryCode,
  cntStyle,
  countryCodeStyles,
  multiline = false,
  onSelectCountry = () => null,
}) => {
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          // paddingVertical: 8,
          backgroundColor: COLORS.inputBackground,
          borderRadius: 10,
          marginVertical: 2,
          height: 50,
        },
        cntStyle,
      ]}>
      {renderIcon && renderIcon()}
      {countryCode && (
        <Text
          onPress={() => setCountryPickerVisible(true)}
          style={[
            {
              fontFamily: 'Axiforma-Regular',
              fontSize: 14,
              color: COLORS.titleFont,
            },
            countryCodeStyles && countryCodeStyles,
          ]}>
          +{countryCode}{' '}
        </Text>
      )}
      {countryCode && (
        <CountryPicker
          theme={DARK_THEME}
          placeholder=""
          visible={countryPickerVisible}
          onClose={() => setCountryPickerVisible(false)}
          onSelect={e => {
            setCountryPickerVisible(false), onSelectCountry(e);
          }}
        />
      )}
      <TextInput
        placeholder={`${item.title}`}
        editable={stopEditable ? false : true}
        keyboardType={item.keyboardType}
        secureTextEntry={item.secureTextEntry}
        placeholderTextColor={COLORS.inputPlaceholder}
        defaultValue={value}
        multiline={multiline}
        onChangeText={setValue}
        style={[
          {
            // marginVertical: 10,
            fontSize: 14,
            color: COLORS.titleFont,
            flex: 1,
            fontFamily: 'Axiforma-Regular',
            // height: 50,
          },
          style && style,
        ]}
      />
      {showEyeIcon && (
        <TouchableOpacity onPress={onPressEye}>
          <Ionicons
            name={
              item.secureTextEntry ? 'md-eye-off-outline' : 'ios-eye-outline'
            }
            style={{
              fontSize: 20,
              color: COLORS.descFont,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppTextInput;
