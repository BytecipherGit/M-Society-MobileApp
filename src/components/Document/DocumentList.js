import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {COLORS, globalStyle, shadow} from '../../assets/theme';
import AppHeader from '../../ReUsableComponents/AppHeader';
import FullCardBackground from '../../ReUsableComponents/FullCardBackground';
import DocumentSvg from '../../assets/images/DocumentIcon.svg';
import TitleText from "../../ReUsableComponents/Text's/TitleText";
import DescriptionText from "../../ReUsableComponents/Text's/DescriptionText";
import {API_URL, GetData} from '../../assets/services';
import moment from 'moment';
import AppLoaderSrceen from '../../ReUsableComponents/AppLoaderSrceen';

const DocumentList = ({navigation}) => {
  const [documents, setDocuments] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    getDocuments();
  }, []);

  const getDocuments = async () => {
    setError('');
    const payload = {
      url: API_URL + 'document/resident/all',
    };
    try {
      const Result = await GetData(payload);
      console.log(Result.data);
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

  return (
    <Fragment>
      <SafeAreaView style={globalStyle.cntWithTheme}>
        <AppHeader navigation={navigation} title="Document" />
        <FullCardBackground
          styles={{backgroundColor: COLORS.themeBackground, padding: 16}}
          RenderUI={() => (
            <>
              <TitleText
                style={{color: '#384252', marginBottom: '5%'}}
                text="Documents"
              />
              <FlatList
                data={documents}
                ListEmptyComponent={() => (
                  <AppLoaderSrceen loader={loader} error={error} />
                )}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DocumentDetail', {item: item})
                    }
                    style={{
                      ...shadow,
                      shadowOpacity: 0.4,
                      shadowRadius: 1.5,
                      padding: 15,
                      borderRadius: 4,
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '3%',
                      marginHorizontal: 1,
                    }}>
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 1000,
                        backgroundColor: '#E9F5F8',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <DocumentSvg height={20} width={20} />
                    </View>
                    <View style={{width: '85%'}}>
                      <DescriptionText
                        style={{
                          fontSize: 16,
                          color: '#202937',
                          marginBottom: '1%',
                        }}
                        text={item.documentName}
                      />
                      <DescriptionText
                        style={{color: '#384252'}}
                        text={moment(`${item.createdDate}`).format(
                          'DD/MMM/YYYY',
                        )}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                extraData={item => item._id}
              />
            </>
          )}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: COLORS.themeBackground}} />
    </Fragment>
  );
};

export default DocumentList;
