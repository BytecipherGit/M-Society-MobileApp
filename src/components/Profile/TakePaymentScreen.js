import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import React, {Fragment, useEffect} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import LinkAerrow from '../../assets/images/LinkAerrow.svg';
import {useDispatch, useSelector} from 'react-redux';
import {GET_MAINTANCE_USER_REQUEST} from '../../redux/Actions';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import TitleText from "../../ReUsableComponents/Text's/TitleText";

const searchIcon = 'https://cdn-icons-png.flaticon.com/512/54/54481.png';

const TakePaymentScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.PaymentReducer);

  useEffect(() => {
    dispatch({type: GET_MAINTANCE_USER_REQUEST});
  }, []);

  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader title={'Take Payment'} navigation={navigation} />
        <FullCardBackground
          styles={{backgroundColor: COLORS.themeBackground}}
          RenderUI={() => (
            <View style={{}}>
              <View style={styles.container}>
                <Image
                  source={{
                    uri: searchIcon,
                  }}
                  style={styles.searchIcon}
                />
                <TextInput placeholder="Search" />
              </View>
              <TitleText style={styles.title} text="Results" />
              <FlatList
                data={users.data}
                ListEmptyComponent={() => (
                  <AppLoaderSrceen loader={users.loader} error={users.error} />
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
                        source={{uri: users.profileImage}}
                      />
                      <View style={{width: '70%'}}>
                        <Text style={styles.userName}>{item.name}</Text>
                      </View>
                      <LinkAerrow />
                    </View>
                    <View style={styles.bottomBorder} />
                  </TouchableOpacity>
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
    color: COLORS.titleFont,
    marginBottom: '4%',
    margin: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  profilePic: {
    backgroundColor: COLORS.themeColor,
    height: 60,
    width: 60,
    borderRadius: 1000,
  },
  userName: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
  bottomBorder: {
    borderWidth: 0.5,
    borderColor: '#D2D5DC',
  },
});
