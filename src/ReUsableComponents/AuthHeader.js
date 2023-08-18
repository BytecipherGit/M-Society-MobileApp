import {View, Text, Image} from 'react-native';
import React from 'react';

const AuthHeader = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{width: '100%', height: '30%'}}>
        <Image
          source={require('../assets/images/registerTop.png')}
          style={{height: '100%', width: '100%'}}
        />
      </View>
      <View style={{alignSelf: 'center', marginTop: '-2%'}}>
        <Image
          style={{
            height: 133.01,
            width: 87,
          }}
          source={require('../assets/images/MsocietyLogo.png')}
        />
      </View>
    </View>
  );
};

export default AuthHeader;
