import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Fragment, useEffect} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import {useDispatch, useSelector} from 'react-redux';
import {API_URL, GetData} from '../../assets/services';
import {SOCIETY_DETAIL_REQUEST} from '../../redux/Actions';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import moment from 'moment';
import {SocietyInfoArray} from '../../assets/Jsons';

const SocietyInfo = ({navigation, route}) => {
  const SocietyId = useSelector(
    state => state.AuthReducer.userDetail.data.societyId,
  );
  const data = useSelector(state => state.SocietyReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: SOCIETY_DETAIL_REQUEST, payload: SocietyId});
  }, []);

  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader navigation={navigation} title="Society Information" />
        <FullCardBackground
          styles={styles.cnt}
          RenderUI={() => (
            <FlatList
              data={[1]}
              showsVerticalScrollIndicator={false}
              renderItem={() => (
                <View>
                  <TitleText text={'Society Information'} />
                  {data.loader || data.error ? (
                    <AppLoaderSrceen loader={data.loader} error={data.error} />
                  ) : (
                    <>
                      <View style={styles.detailCardCnt}>
                        {SocietyInfoArray.map((item, index) => {
                          return (
                            <View key={index} style={styles.detailSubCnt}>
                              <View
                                style={[
                                  styles.leftSideDetailCnt,
                                  {
                                    backgroundColor:
                                      index === 0
                                        ? COLORS.buttonColor
                                        : 'white',
                                    borderTopLeftRadius: index === 0 ? 17 : 0,
                                    borderBottomLeftRadius:
                                      index === 9 ? 17 : 0,
                                  },
                                ]}>
                                {index === 0 ? (
                                  <TitleText
                                    style={styles.firstLeftTitle}
                                    text={item.title}
                                  />
                                ) : (
                                  <DescriptionText
                                    style={styles.leftTitle}
                                    text={item.title}
                                  />
                                )}
                              </View>
                              <View
                                style={[
                                  styles.rightTitleCnt,
                                  {
                                    backgroundColor:
                                      index === 0
                                        ? COLORS.buttonColor
                                        : 'white',
                                    borderTopRightRadius: index === 0 ? 17 : 0,
                                    borderBottomRightRadius:
                                      index === 9 ? 17 : 0,
                                  },
                                ]}>
                                {index === 0 ? (
                                  <TitleText
                                    style={styles.rightFirstTitle}
                                    numberOfLines={1}
                                    text={
                                      data?.data?.society &&
                                      data?.data?.society[item.value]
                                    }
                                  />
                                ) : (
                                  <DescriptionText
                                    style={styles.rightTitle}
                                    numberOfLines={1}
                                    text={
                                      item.value === 'createdDate'
                                        ? data?.data?.society &&
                                          moment(
                                            `${data.data.society[item.value]}`,
                                          ).format('DD/MM/YYYY')
                                        : data?.data?.society &&
                                          data?.data?.society[item.value]
                                    }
                                  />
                                )}
                              </View>
                            </View>
                          );
                        })}
                      </View>
                      {data.data.society && data.data.society.description && (
                        <View style={styles.descContainer}>
                          <TitleText
                            text={'Society Description'}
                            style={{color: '#202937'}}
                          />
                          <DescriptionText
                            text={data.data.society.description}
                            style={styles.descTxt}
                          />
                        </View>
                      )}
                      <View style={{marginVertical: '3%', marginTop: '5%'}}>
                        <TitleText
                          text={'Society Images'}
                          style={{color: '#202937'}}
                        />
                        <View style={styles.container}>
                          {data.data.society &&
                            data.data.society.images.map((item, index) => {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() =>
                                    navigation.navigate('ImageViewScreen', {
                                      img: item,
                                    })
                                  }
                                  style={styles.box}>
                                  <Image
                                    style={{flex: 1, borderRadius: 7}}
                                    source={{uri: item}}
                                  />
                                </TouchableOpacity>
                              );
                            })}
                        </View>
                      </View>
                    </>
                  )}
                </View>
              )}
            />
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
  );
};

export default SocietyInfo;

const styles = StyleSheet.create({
  cnt: {backgroundColor: COLORS.themeBackground, padding: 16},
  detailCardCnt: {
    backgroundColor: 'white',
    borderRadius: 17,
    marginTop: '5%',
    ...shadow,
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  detailSubCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSideDetailCnt: {
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 0.3,
    padding: 10,
    borderColor: 'grey',
  },
  firstLeftTitle: {
    fontSize: 14,
    color: 'white',
  },
  leftTitle: {
    color: '#384252',
  },
  rightTitleCnt: {
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 0.3,
    padding: 10,
    borderColor: 'grey',
  },
  rightFirstTitle: {
    fontSize: 14,
    color: 'white',
  },
  rightTitle: {
    color: '#384252',
  },
  descContainer: {
    padding: 15,
    backgroundColor: '#FAFEFF',
    marginVertical: '8%',
    borderRadius: 8,
    marginHorizontal: 2,
    ...shadow,
  },
  descTxt: {
    textAlign: 'justify',
    lineHeight: 19.5,
    marginTop: '3%',
    color: '#384252',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '5%',
  },
  box: {
    width: 76,
    height: 72,
    margin: '1%',
    marginHorizontal: '1.90%',
    borderRadius: 7,
    backgroundColor: COLORS.themeColor,
    marginBottom: '3%',
    ...shadow,
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});
