import {Image, Dimensions, SafeAreaView, View} from 'react-native';
import React, {Fragment} from 'react';
import ImageZoom from 'react-native-image-pan-zoom';
import {COLORS, globalStyle} from '../assets/theme';
import {VERSION} from '@angular/cli';
import AppHeader from '../ReUsableComponents/AppHeader';

const ImageViewScreen = ({navigation, route}) => {
  return (
    <View style={globalStyle.cnt}>
      {/* Header */}
      <AppHeader
        navigation={navigation}
        // cntStyle={{backgroundColor: '#135A6B'}}
        title="Image"
      />
      <View style={{flex: 1, backgroundColor: COLORS.themeColor}}>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height / 1.25}
          imageWidth={Dimensions.get('window').width}
          imageHeight={400}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: route.params.img,
            }}
            resizeMode="cover"
          />
        </ImageZoom>
      </View>
    </View>
  );
};

export default ImageViewScreen;
