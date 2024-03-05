import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
// import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
// import LinkAerrow from '../../assets/images/LinkAerrow.svg';
import {GET_MAINTANCE_USER_REQUEST} from '../../redux/Actions';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
// import TitleText from "../../ReUsableComponents/Text's/TitleText";
// import AppTextInput from '../../ReUsableComponents/AppTextInput';

// const searchIcon = 'https://cdn-icons-png.flaticon.com/512/54/54481.png';

const TakePaymentScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(({PaymentReducer}) => PaymentReducer);

  useEffect(() => {
    dispatch({type: GET_MAINTANCE_USER_REQUEST});
  }, []);

  return (
    <View style={[globalStyle.cnt, {backgroundColor: 'white'}]}>
      <AppHeader title={'Take Payment'} navigation={navigation} />
      <View style={{flex: 1}}>
        {/* <AppTextInput
          item={{title: 'Search'}}
          renderIcon={() => (
            <AntDesign
              name="search1"
              style={{
                fontSize: 20,
                marginRight: 10,
                color: COLORS.descFont,
              }}
            />
          )}
          cntStyle={{marginHorizontal: '4%', marginTop: '7%'}}
        />
        <TitleText style={styles.title} text="Results" /> */}

        <FlatList
          data={users?.data}
          style={{flex: 1}}
          ListEmptyComponent={() => (
            <AppLoaderSrceen loader={users?.loader} error={users?.error} />
          )}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MainTainUserPayment', {user: item})
              }
              activeOpacity={0.5}
              style={{backgroundColor: 'white'}}>
              <View style={styles.cardContainer}>
                <Image
                  style={styles.profilePic}
                  source={{
                    uri: item?.profileImage ? item?.profileImage : undefined,
                  }}
                />
                <View style={{width: '75%'}}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userHouse}>
                    House Number {item.houseNumber}
                  </Text>
                </View>
                <AntDesign
                  name="right"
                  style={{
                    fontSize: 12,
                    color: COLORS.descFont,
                  }}
                />
              </View>
              <View style={styles.bottomBorder} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default TakePaymentScreen;

const styles = StyleSheet.create({
  container: {
    ...shadow,
    shadowOpacity: 0.4,
    shadowRadius: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: Platform.OS === 'ios' ? 15 : 0,
    paddingHorizontal: 15,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  searchIcon: {
    height: 16.01,
    width: 16.01,
    tintColor: COLORS.themeColor,
    marginRight: '2%',
  },
  title: {
    color: '#A7A7A7',
    marginTop: '8%',
    margin: 16,
    fontFamily: 'Axiforma-SemiBold',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  profilePic: {
    backgroundColor: COLORS.themeColor,
    height: 45,
    width: 45,
    borderRadius: 1000,
  },
  userName: {
    fontFamily: 'Axiforma-Medium',
    fontSize: 18,
    color: '#262626',
    lineHeight: 29,
  },
  userHouse: {
    fontFamily: 'Axiforma-Regular',
    fontSize: 12,
    color: '#ABACB0',
  },
  bottomBorder: {
    borderWidth: 0.5,
    borderColor: '#D2D5DC',
  },
});
