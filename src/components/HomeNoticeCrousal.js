import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {COLORS} from '../assets/theme';
import Calendor from '../assets/images/Caledor.svg';
import moment from 'moment';

const HomeNoticeCrousal = ({Notices, setActiveIndex, activeIndex}) => {
  return (
    <View style={{marginVertical: 25}}>
      <Text
        style={{
          fontFamily: 'Axiforma-Bold',
          fontSize: 18,
          color: COLORS.titleFont,
        }}>
        Society Notice
      </Text>
      <Carousel
        layout={'default'}
        ref={ref => null}
        data={Notices}
        sliderWidth={Dimensions.get('window').width / 1.02}
        itemWidth={Dimensions.get('window').width / 1}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                null;
              }}
              style={{
                width: Dimensions.get('window').width / 1.07,
                // height: 220,
                backgroundColor: 'white',
                marginTop: 15,
                borderRadius: 20,
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Calendor />
                <Text
                  style={{
                    fontFamily: 'Axiforma-Regular',
                    fontSize: 12,
                    color: '#ABACB0',
                  }}>
                  {moment(`${item.createdDate}`).format('DD/MMM/YYYY')}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Axiforma-Medium',
                    fontSize: 18,
                    color: '#262626',
                    marginVertical: '3%',
                    marginTop: '7%',
                  }}>
                  {item.title}
                </Text>
                <Text
                  numberOfLines={3}
                  styl={{
                    fontFamily: 'Axiforma-Regular',
                    fontSize: 16,
                    color: '#72767C',
                    lineHeight: 25,
                  }}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        onSnapToItem={setActiveIndex}
      />
      <Pagination
        dotsLength={Notices?.length}
        activeDotIndex={activeIndex}
        containerStyle={
          {
            // backgroundColor: 'rgba(0, 0, 0, 0.75)',
          }
        }
        dotStyle={{
          width: 12,
          height: 10,
          borderRadius: 1000,
          marginHorizontal: -5,
          backgroundColor: '#A9A9A9',
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
