import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import DocumentSvg from '../../assets/images/Document.svg';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import {API_URL, DeleteData, GetData, SnackError} from '../../assets/services';
import moment from 'moment';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';
import AppRoundAddActionButton from '../../ReUsableComponents/AppRoundAddActionButton';
import {useSelector} from 'react-redux';
import AppCrudActionButton from '../../ReUsableComponents/AppCrudActionButton';
import {useIsFocused} from '@react-navigation/native';

const DocumentList = ({navigation}) => {
  const [documents, setDocuments] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [deleteLoader, setDeleteLoader] = useState('');
  const {isAdmin} = useSelector(state => state.AuthReducer);
  const isFocus = useIsFocused();
  useEffect(() => {
    isFocus && getDocuments();
  }, [isFocus]);

  const getDocuments = async () => {
    setError('');
    const payload = {
      url: API_URL + (isAdmin ? 'document/all' : 'document/resident/all'),
    };
    try {
      const Result = await GetData(payload);

      if (Result.data.success) {
        setDocuments(Result.data.data);
        setError('');
      } else {
        setError(Result.data.message);
      }
    } catch (e) {
      setError('Something Went Wrong please try again later.');
    }
  };

  const doActions = async (item, type, index) => {
    //Edit,Delete

    if (type === 'Edit') {
      return navigation.navigate('EditDocument', {documentDetail: item});
    }
    setDeleteLoader(item._id);

    try {
      const Result = await DeleteData({
        url: API_URL + 'document/',
        body: {id: item._id},
      });

      if (Result.success === true) {
        let arr = documents;

        arr.splice(index, 1);
        setDocuments([...arr]);
      } else {
        SnackError(Result.message);
      }
    } catch (e) {
      SnackError('Something went wrong, please try again later.');
    }
    setDeleteLoader('');
  };

  return (
    <View style={globalStyle.cnt}>
      <AppHeader navigation={navigation} title="Document" />

      <FlatList
        data={documents}
        ListEmptyComponent={() => (
          <AppLoaderSrceen loader={loader} error={error} />
        )}
        renderItem={({item, index}) => (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DocumentDetail', {item: item})
              }
              style={{
                ...shadow,
                margin: 20,
                padding: 15,
                borderRadius: 10,
                backgroundColor: 'white',
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <DocumentSvg height={30} width={30} />

              <View style={{marginLeft: '3%'}}>
                <Text
                  style={{
                    fontFamily: 'Axiforma-Medium',
                    fontSize: 16,
                    color: '#262626',
                    lineHeight: 28,
                    marginBottom: '2%',
                  }}>
                  {item.documentName}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Axiforma-Light',
                    fontSize: 12,
                    color: '#ABACB0',
                  }}>
                  {moment(`${item.createdDate}`).format('DD/MMM/YYYY')}
                </Text>
              </View>
            </TouchableOpacity>
            <AppCrudActionButton
              item={item}
              index={index}
              loaderIndex={deleteLoader}
              doActions={doActions}
            />
          </>
        )}
        extraData={item => item._id}
      />
      <AppRoundAddActionButton
        onPress={() => navigation.navigate('CreateDocument')}
      />
    </View>
  );
};

export default DocumentList;
