// export const API_URL = 'https://bbcf-122-168-227-157.in.ngrok.io/api/';
export const API_URL = 'http://43.231.127.169:9001/api/';

// swagger https://e1b6-122-168-229-41.in.ngrok.io/api-docs/#/

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetData = async payload => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  return axios
    .get(
      payload.url,
      Token && {
        headers: {
          Authorization: 'Bearer ' + Token.accessToken,
        },
      },
    )
    .then(res => {
      return res;
    })
    .catch(e => {
      return e;
    });
};

export const PostData = async payload => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  return axios
    .post(
      payload.url,
      payload.body,
      Token && {
        headers: {
          Authorization: 'Bearer ' + Token.accessToken,
        },
      },
    )
    .then(res => {
      return res;
    })
    .catch(e => {
      return e;
    });
};

export const PutData = async payload => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  return axios
    .put(
      payload.url,
      payload.body,
      Token && {
        headers: {
          Authorization: 'Bearer ' + Token.accessToken,
        },
      },
    )
    .then(res => {
      return res;
    })
    .catch(e => {
      return e;
    });
};

export const DeleteData = async payload => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  console.log(payload.url);
  console.log(payload.body);
  console.log(Token);
  // return axios
  //   .delete(
  //     payload.url,
  //     payload.body,
  //     Token && {
  //       headers: {
  //         Authorization: 'Bearer ' + Token.accessToken,
  //       },
  //     },
  //   )
  //   .then(res => {
  //     return res;
  //   })
  //   .catch(e => {
  //     return e;
  //   });

  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + Token.accessToken);
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify(payload.body);

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(payload.url, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const postFormData = async (payload, type) => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  // var myHeaders = new Headers();
  // myHeaders.append('Authorization', 'Bearer ' + Token);

  var formData = new FormData();
  if (payload.body.attachedImage.length > 0) {
    const my_file = {
      uri: payload.body.attachedImage[0].uri,
      type: payload.body.attachedImage[0].type,
      name: payload.body.attachedImage[0].fileName,
    };
    formData.append('attachedImage', my_file);
  }
  if (type) {
    formData.append('id', payload.body.id);
    formData.append('status', payload.body.status);
  } else {
    formData.append('complainTitle', payload.body.complainTitle);
    formData.append('applicantName', payload.body.applicantName);
    formData.append('phoneNumber', payload.body.phoneNumber);
    formData.append('countryCode', payload.body.countryCode);
  }
  formData.append('description', payload.body.description);

  var requestOptions = {
    method: type ? type : 'POST',
    headers: {
      Authorization: 'Bearer ' + Token.accessToken,
    },
    body: formData,
    redirect: 'follow',
  };

  return fetch(payload.url, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

export const updatProfile = async payload => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  // var myHeaders = new Headers();
  // myHeaders.append('Authorization', 'Bearer ' + Token);

  var formData = new FormData();

  console.log(payload);

  if (payload.data.images.length > 0) {
    const my_file = {
      uri: payload.data.images[0].uri,
      type: payload.data.images[0].type,
      name: payload.data.images[0].fileName,
    };
    formData.append('profileImage', my_file);
  }
  formData.append('name', payload.data.name);
  formData.append('address', payload.data.address);
  formData.append('houseNumber', payload.data.houseNumber);
  formData.append('phoneNumber', payload.data.phoneNumber);
  formData.append('id', payload.data._id);

  console.log('form data ====>', formData);

  return axios
    .put(API_URL + 'user/', formData, {
      headers: {
        Authorization: 'Bearer ' + Token.accessToken,
      },
    })
    .then(res => {
      return res;
    })
    .catch(e => {
      return e;
    });
};

export const addVisitorFormData = async payload => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  // var myHeaders = new Headers();
  // myHeaders.append('Authorization', 'Bearer ' + Token);

  var formData = new FormData();
  formData.append('phoneNumber', payload.phoneNumber);
  formData.append('name', payload.name);
  formData.append('houseNumber', payload.houseNumber);
  formData.append('reasone', payload.reasone);
  formData.append('image', payload.image);

  var requestOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + Token.accessToken,
    },
    body: formData,
    redirect: 'follow',
  };

  return fetch(API_URL + 'visitor/', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

export const getAsyncValue = async key => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

export const StoreData = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const RemoveStoreData = async key => {
  await AsyncStorage.removeItem(key);
};