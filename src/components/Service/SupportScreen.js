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
        onPress={() => Linking.openURL(`tel:8871865254`)}>
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
          <Feather name="phone" size={20} color={COLORS.titleFont} />
        </View>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Axiforma-Medium',
            color: COLORS.titleFont,
          }}>
          +91 8871865254
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{margin: 10, flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          const email = 'support@msociety.in';
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
          <Feather name="mail" size={20} color={COLORS.titleFont} />
        </View>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Axiforma-Medium',
            color: COLORS.titleFont,
          }}>
          support@msociety.in
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: 'red',
          alignSelf: 'center',
          fontFamily: 'Axiforma-SemiBold',
          marginTop: '5%',
        }}>
        Our team respond within 24 hours.
      </Text>
    </View>
  );
};

export default SupportScreen;
