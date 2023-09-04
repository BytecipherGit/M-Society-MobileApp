import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import AppButton from '../../ReUsableComponents/AppButton';
import * as Animatable from 'react-native-animatable';
import {API_URL, PostData, SnackError} from '../../assets/services';

const ReportList = ({navigation, route}) => {
  const [reportStatus, setReportStatus] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [comment, setComment] = useState('');
  const [blockLoader, setBlockLoader] = useState(false);
  const [showBlockInput, setShowBlockInput] = useState(
    route.params.showBlockInput,
  );

  const reportAnimation = {
    from: {
      flex: 0,
    },
    to: {
      flex: 1,
    },
  };

  const noReportAnimation = {
    from: {
      flex: 1,
    },
    to: {
      flex: 0,
    },
  };

  const addRequest = async () => {
    setBlockLoader(true);
    try {
      const Result = await PostData({
        url: API_URL + 'serviceProvider/blockRequiestAdd',
        body: {
          serviceProviderId: route.params.servicePorviderId,
          reason: comment,
        },
      });
      if (Result.response) {
        SnackError(Result.response.data.message);
      } else {
        console.log(Result.data);
        setShowBlockInput(true);
        setCommentError(false);
        setComment('');
      }
    } catch (e) {
      SnackError('Something Went Wrong Please Try Again Later.');
    }
    setBlockLoader(false);
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title={'Report List'} />
      <Animatable.View
        style={{
          flex: 1,
        }}
        animation={reportStatus ? noReportAnimation : reportAnimation}>
        <FlatList
          data={route.params.reportList}
          extraData={item => item._id}
          style={{flex: 1}}
          renderItem={({item, index}) => (
            <View style={style.card}>
              <View style={style.titleCnt}>
                <Entypo name="triangle-right" size={20} />
                <Text style={style.cardTitle}>{item.title}</Text>
              </View>
              <Text style={style.cardComment}>{item.comment}</Text>
              <Text style={style.userName}>- {item?.userId?.name}</Text>
            </View>
          )}
        />
      </Animatable.View>
      <SafeAreaView>
        <TouchableOpacity
          style={style.actionButton}
          activeOpacity={0.8}
          onPress={() => setReportStatus(!reportStatus)}>
          <Text style={style.actionButtonTitle}>
            {reportStatus ? 'Back To List' : 'Request To Block This Service'}
          </Text>
          <Entypo
            name={reportStatus ? 'chevron-down' : 'chevron-up'}
            size={20}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <Animatable.View
        style={{}}
        animation={reportStatus ? reportAnimation : noReportAnimation}>
        {showBlockInput ? (
          <View style={{flex: 1}}>
            <Text style={style.alreadyBlockTxt}>
              You Already Send Block Request To Super Admin.
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => Keyboard.dismiss()}
            style={{flex: 1}}
            activeOpacity={1}>
            <TextInput
              style={[
                style.blockInput,
                {borderColor: commentError ? 'red' : 'black'},
              ]}
              placeholder={
                commentError ? 'Please provide us more detail here.' : 'Comment'
              }
              //   multiline={true}
              placeholderTextColor={commentError ? 'red' : COLORS.descFont}
              value={comment}
              onChangeText={e => {
                setComment(e),
                  e.length > 0 ? setCommentError(false) : setCommentError(true);
              }}
            />
            <AppButton
              buttonStyle={style.blockButton}
              onPress={() => (comment.length > 0 ? addRequest() : null)}
              btnLoader={blockLoader}
              buttonTitle={'Request'}
            />
          </TouchableOpacity>
        )}
      </Animatable.View>
    </View>
  );
};

export default ReportList;

const style = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: COLORS.inputPlaceholder,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '93%',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    ...shadow,
  },
  titleCnt: {
    flexDirection: 'row',
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    marginRight: 15,
    marginTop: '.5%',
  },
  cardComment: {
    marginVertical: '2%',
    fontFamily: 'Inter-Medium',
    color: COLORS.softDescText,
  },
  userName: {
    alignSelf: 'flex-end',
    fontFamily: 'Inter-Regular',
  },
  actionButton: {
    backgroundColor: 'red',
    padding: 10,
    width: '97%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: '1%',
  },
  actionButtonTitle: {
    fontFamily: 'Inter-SemiBold',
    color: 'black',
  },
  alreadyBlockTxt: {
    fontFamily: 'Inter-Bold',
    marginTop: '5%',
    alignSelf: 'center',
    textAlign: 'center',
    width: '70%',
    color: 'black',
  },
  blockInput: {
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginVertical: '5%',
    fontFamily: 'Axiforma-Medium',
    color: COLORS.titleFont,
    fontSize: 16,
    marginTop: '10%',
  },
  blockButton: {
    width: '92%',
    alignSelf: 'center',
  },
});
