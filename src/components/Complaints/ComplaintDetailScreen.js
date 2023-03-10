import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {Fragment} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import DocumentIcon from '../../assets/images/DocumentIcon.svg';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import AppButton from '../../ReUsableComponents/AppButton';

const ComplaintDetailScreen = ({navigation, route}) => {
  const {attachedFile, complainTitle, applicantName, description} =
    route?.params?.data;
  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader navigation={navigation} title="Water Problem" />
        <FullCardBackground
          styles={{backgroundColor: COLORS.themeBackground}}
          RenderUI={() => (
            <>
              <View style={{flex: 1}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderTopRightRadius: 16,
                    borderTopLeftRadius: 16,
                    padding: 16,
                    ...shadow,
                    shadowRadius: 2,
                    marginBottom: '1%',
                  }}>
                  <FlatList
                    data={[1]}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    renderItem={() => (
                      <>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              height: 40,
                              width: 40,
                              backgroundColor: 'rgba(233, 245, 248, 1)',
                              borderRadius: 1000,
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginRight: '3%',
                            }}>
                            <DocumentIcon height={20} width={15} />
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <TitleText
                              style={{color: COLORS.themeColor}}
                              text={complainTitle}
                            />
                            <DescriptionText
                              style={{color: COLORS.titleFont}}
                              text={applicantName}
                            />
                          </View>
                        </View>
                        <DescriptionText
                          style={{
                            paddingVertical: 15,
                            lineHeight: 19.5,
                            textAlign: 'justify',
                          }}
                          text={description}
                        />
                        <FlatList
                          data={[1]}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={{alignSelf: 'flex-end'}}
                          renderItem={({item, index}) => (
                            <View
                              style={{
                                height: 60,
                                width: 60,
                                backgroundColor: COLORS.themeColor,
                                marginLeft: 10,
                                marginTop: 20,
                                borderRadius: 8,
                              }}>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('ImageViewScreen', {
                                    img: attachedFile,
                                  })
                                }>
                                <Image
                                  source={{
                                    uri: attachedFile,
                                  }}
                                  style={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: 8,
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                          extraData={({item, index}) => index}
                        />
                      </>
                    )}
                  />
                </View>
              </View>
              <View style={{padding: 16}}>
                <AppButton
                  buttonStyle={{padding: 16}}
                  buttonTitle="Ok"
                  onPress={() => navigation.goBack()}
                />
              </View>
            </>
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
  );
};

export default ComplaintDetailScreen;
