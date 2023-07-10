import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {COLORS, globalStyle} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import Feather from 'react-native-vector-icons/Feather';

const SupportScreen = ({navigation}) => {
  return (
    <View style={globalStyle.cnt}>
      <AppHeader title={'Support'} navigation={navigation} />
      <TouchableOpacity
        style={{margin: 10, flexDirection: 'row', alignItems: 'center'}}
        onPress={() => Linking.openURL(`tel:0000000011`)}>
        <View
          style={{
            backgroundColor: COLORS.themeColor,
            height: 45,
            width: 45,
            borderRadius: 1000,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '2%',
          }}>
          <Feather name="phone" size={20} />
        </View>
        <Text style={{fontSize: 15, fontFamily: 'Axiforma-Medium'}}>
          +91 0000000011
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{margin: 10, flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          const email = 'abc@gmail.com';
          const url = `googlegmail:///co?to=${email}`;
          Linking.canOpenURL(url)
            .then(supported => {
              if (!supported) {
                console.log('Gmail is not installed');
              } else {
                return Linking.openURL(url);
              }
            })
            .catch(err => console.error('An error occurred', err));
        }}>
        <View
          style={{
            backgroundColor: COLORS.themeColor,
            height: 45,
            width: 45,
            borderRadius: 1000,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '2%',
          }}>
          <Feather name="mail" size={20} />
        </View>
        <Text style={{fontSize: 15, fontFamily: 'Axiforma-Medium'}}>
          abc@gmail.com
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SupportScreen;
