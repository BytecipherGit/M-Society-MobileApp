import {View, Text, SafeAreaView, ScrollView, FlatList} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import {guardDetailOptions} from '../../assets/Jsons';
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import AppButton from '../../ReUsableComponents/AppButton';
import {API_URL, GetData} from '../../assets/services';
import {useSelector} from 'react-redux';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import moment from 'moment';

const GuardEditProfile = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const state = useSelector(state => state.AuthReducer);
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      const payload = {
        url: API_URL + `guard/${state.userDetail.data._id}`,
      };
      setError('');
      const Result = await GetData(payload);
      console.log(Result.data);
      if (Result.data.success) {
        setData(Result.data.data);
      } else {
        setError(Result.data);
      }
    } catch (e) {
      setError('Something went wrong please try again later');
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader navigation={navigation} title="Your Details" />
        <View style={{flex: 1, backgroundColor: COLORS.themeBackground}}>
          <FlatList
            data={guardDetailOptions}
            style={{padding: 6}}
            ListFooterComponent={() => (
              <View>
                {error && (
                  <TitleText
                    text={error}
                    style={{
                      alignSelf: 'center',
                      marginTop: '10%',
                      color: 'red',
                    }}
                  />
                )}
              </View>
            )}
            renderItem={({item, index}) => (
              <View style={{margin: 10}}>
                <DescriptionText
                  text={item.title}
                  style={{fontSize: 16, color: '#384252'}}
                />
                <View
                  style={{
                    ...shadow,
                    shadowRadius: 2,
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: 'white',
                    borderRadius: 7,
                    marginTop: '4%',
                    alignItems: 'center',
                  }}>
                  <DescriptionText
                    style={{color: '#6B737F', flex: 1}}
                    text={
                      item.id === 1 || item.id === 4
                        ? moment(`${data[item.param]}`).format('DD/MMM/YYYY')
                        : data[item.param]
                    }
                  />
                  {item.icon}
                </View>
              </View>
            )}
            extraData={item => item.id}
          />
          <AppButton
            buttonStyle={{width: '90%', alignSelf: 'center'}}
            buttonTitle="Ok"
            onPress={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
  );
};

export default GuardEditProfile;