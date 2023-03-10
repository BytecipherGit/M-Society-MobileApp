import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, {Fragment} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import LeftAerrowGrey from '../../assets/images/LeftAerrowGrey.svg';

const data = [
  {
    id: 1,
    title: 'It is a long established fact that a reader will be distracted',
    desc: `It is a long established fact that a reader will be distracted by the readable content of a page when  at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
  },
];

const FaqDetailScreen = ({navigation, route}) => {
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
              <FlatList
                data={data}
                renderItem={({item, index}) => (
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text>•</Text>
                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: 14,
                          color: '#384252',
                          textAlign: 'justify',
                        }}>
                        {item.title}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#6B737F',
                        textAlign: 'justify',
                        padding: 9,
                      }}>
                      {item.desc}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
  );
};

export default FaqDetailScreen;
