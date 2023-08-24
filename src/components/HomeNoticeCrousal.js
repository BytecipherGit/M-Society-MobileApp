import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {COLORS} from '../assets/theme';
import Calendor from '../assets/images/Caledor.svg';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const HomeNoticeCrousal = ({Notices, setActiveIndex, activeIndex}) => {
  const stateForTheme = useSelector(state => state.AuthReducer.userDetail);
  const [publishNotices, setPublishNotices] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    let arr = [];

    Notices.map((item, index) => {
      if (item.status !== 'draft') {
        arr.push(item);
      }
    });
    setPublishNotices([...arr]);
  }, [Notices]);

  return (
    <View style={{marginVertical: 25}}>
      <Text
        style={[
          style.headerTitle,
          stateForTheme &&
            stateForTheme.data &&
            stateForTheme.data.societyId && {
              color:
                stateForTheme &&
                stateForTheme.data &&
                stateForTheme.data.societyId &&
                stateForTheme.data.societyId.fontColour,
            },
        ]}>
        Society Notice
      </Text>
      <Carousel
        layout={'default'}
        ref={ref => null}
        data={publishNotices}
        sliderWidth={Dimensions.get('window').width / 1.02}
        itemWidth={Dimensions.get('window').width / 1}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('NoticeScreen', {
                  screen: 'NoticeDetailScreen',
                  params: {item: item},
                });
              }}
              style={style.cardCnt}>
              <View style={style.cardIconAndDate}>
                <Calendor />
                <Text style={style.cardDate}>
                  {moment(`${item.createdDate}`).format('DD/MMM/YYYY')}
                </Text>
              </View>
              <View>
                <Text style={style.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text numberOfLines={1} styl={style.cardDesc}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        onSnapToItem={setActiveIndex}
      />
      <Pagination
        dotsLength={publishNotices?.length}
        activeDotIndex={activeIndex}
        containerStyle={
          {
            // backgroundColor: 'rgba(0, 0, 0, 0.75)',
          }
        }
        dotStyle={{
          width: 15,
          height: 7,
          borderRadius: 1000,
          marginHorizontal: -5,
          backgroundColor:
            stateForTheme && stateForTheme.data && stateForTheme.data.societyId
              ? stateForTheme.data.societyId.primaryColour
              : 'white',
        }}
        activeDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.8}
        inactiveDotScale={0.5}
      />
    </View>
  );
};

export default HomeNoticeCrousal;

const style = StyleSheet.create({
  headerTitle: {
    fontFamily: 'Axiforma-Bold',
    fontSize: 18,
    color: COLORS.titleFont,
  },
  cardCnt: {
    width: Dimensions.get('window').width / 1.07,
    // height: 230,
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 20,
    padding: 20,
  },
  cardIconAndDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDate: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 12,
    color: '#ABACB0',
  },
  cardTitle: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 18,
    color: '#262626',
    marginVertical: '3%',
    marginTop: '7%',
  },
  cardDesc: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 16,
    color: '#72767C',
    lineHeight: 25,
  },
});
