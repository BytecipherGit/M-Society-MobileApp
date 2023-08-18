import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import LeftAerrowGrey from '../../assets/images/LeftAerrowGrey.svg';

const FaqScreen = ({navigation, route}) => {
  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader navigation={navigation} title={'FAQ'} />
        <FullCardBackground
          styles={{padding: 16, backgroundColor: COLORS.themeBackground}}
          RenderUI={() => (
            <View style={{flex: 1}}>
              <DescriptionText
                style={{
                  fontSize: 16,
                  color: COLORS.titleFont,
                  marginBottom: '4%',
                }}
                text="About"
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('FaqDetailScreen')}
                style={{
                  ...shadow,
                  shadowOpacity: 0.4,
                  shadowRadius: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: '2%',
                  marginHorizontal: '.5%',
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#6B737F',
                    fontSize: 14,
                    fontWeight: '500',
                    marginVertical: '1%',
                  }}>
                  About Society
                </Text>
                <LeftAerrowGrey />
              </TouchableOpacity>
              <View style={{flex: 1}} />
              <DescriptionText
                style={{
                  fontSize: 14,
                  color: COLORS.titleFont,
                  alignSelf: 'center',
                }}
                text="Version 7.18.1"
              />
            </View>
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
  );
};

export default FaqScreen;
