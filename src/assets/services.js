import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
// export const API_URL = 'https://bbae-122-175-237-30.ngrok-free.app/api/';
export const API_URL = 'http://192.168.1.165:5000/api/';

export const GetData = async payload => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  console.log('token', Token?.accessToken);
  let config = {
    method: 'GET',
    url: payload?.url,
    headers: {
      Authorization: `Bearer ${Token?.accessToken ? Token?.accessToken : null}`,
      'Content-Type': 'application/json',
    },
  };
  console.log('config+++> get', config);
  return axios(config)
    .then(res => {
      console.log('response+++> get', payload, ' res', res);
      return res;
    })
    .catch(e => {
      console.log('error+++> get', payload, ' res', e);
      return e;
    });
};

export const PostData = async payload => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  let config = {
    method: 'POST',
    url: payload?.url,
    headers: {
      Authorization: `Bearer ${Token?.accessToken ? Token?.accessToken : null}`,
      'Content-Type': 'application/json',
    },
    data: payload?.body,
  };
  // console.log('config', config);
  return axios(config)
    .then(res => {
      // console.log('response+++> post', config, ' res', res);
      return res;
    })
    .catch(e => {
      // console.log('response+++> post error', config, ' error', e);
      return e;
    });
};

export const PutData = async payload => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  // console.log('config+++> put', payload);
  return axios
    .put(payload.url, payload.body, {
      headers: {
        Authorization: `Bearer ${
          Token?.accessToken ? Token?.accessToken : null
        }`,
        'ngrok-skip-browser-warning': 'your-custom-value',
      },
    })
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
  // return axios
  //   .delete(
  //     payload.url,
  //     payload.body,
  //     Token && {
  //       headers: {
  //         Authorization: 'Bearer ' + Token?.accessToken ? Token?.accessToken : null,
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
  myHeaders.append(
    'Authorization',
    `Bearer ${Token?.accessToken ? Token?.accessToken : null}`,
  );
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('ngrok-skip-browser-warning', 'your-custom-value');

  var raw = JSON.stringify(payload.body);

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  // console.log('config+++> delete', requestOptions);
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
      Authorization: `Bearer ${Token?.accessToken ? Token?.accessToken : null}`,
    },
    body: formData,
    redirect: 'follow',
  };

  console.log('config+++> putForm Data', requestOptions);

  return fetch(payload.url, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('putForm response+++> get', payload, ' res', result);
      return result;
    })
    .catch(error => {
      console.log('putForm response+++> error', payload, ' res', error);
      return error;
    });
};

export const updatProfile = async payload => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  // var myHeaders = new Headers();
  // myHeaders.append('Authorization', 'Bearer ' + Token);

  var formData = new FormData();

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

  // console.log('config+++> updatProfile Data', formData);

  return axios
    .put(API_URL + 'user/', formData, {
      headers: {
        Authorization: `Bearer ${
          Token?.accessToken ? Token?.accessToken : null
        }`,
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
  formData.append('countryCode', payload.countryCode);

  var requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Token?.accessToken ? Token?.accessToken : null}`,
    },
    body: formData,
    redirect: 'follow',
  };
  // console.log('config+++> addVisitorFormData Data', requestOptions);
  return fetch(API_URL + 'visitor/', requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const CreateSociety = async (payload, edit, editstatus) => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  // var myHeaders = new Headers();
  // myHeaders.append('Authorization', 'Bearer ' + Token);

  var formData = new FormData();

  if (editstatus) {
    formData.append('id', payload.id);
  }

  formData.append('title', payload.title);
  formData.append('description', payload.description);
  formData.append('status', payload.status);
  formData.append('attachedFile', payload.attachedFile);

  var requestOptions = {
    method: edit ? 'PUT' : 'POST',
    headers: {
      Authorization: `Bearer ${Token?.accessToken ? Token?.accessToken : null}`,
    },
    body: formData,
    redirect: 'follow',
  };

  // console.log('config+++> CreateSociety Data', requestOptions);
  return fetch(API_URL + (edit ? 'notice/update' : 'notice/'), requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const CreateDocumentAPI = async (payload, edit, editstatus) => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);
  // var myHeaders = new Headers();
  // myHeaders.append('Authorization', 'Bearer ' + Token);

  var formData = new FormData();

  if (editstatus) {
    formData.append('id', payload.id);
  }

  formData.append('documentName', payload.documentName);
  formData.append('description', payload.description);
  formData.append('status', payload.status);
  formData.append('documentImageFile', payload.documentImageFile);

  var requestOptions = {
    method: edit ? 'PUT' : 'POST',
    headers: {
      Authorization: `Bearer ${Token?.accessToken ? Token?.accessToken : null}`,
    },
    body: formData,
    redirect: 'follow',
  };

  // console.log('config+++> CreateDocumentAPI Data', requestOptions);
  return fetch(API_URL + 'document/', requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
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

export const SnackError = title => {
  return Snackbar.show({
    text: title,
    duration: 3000,
    backgroundColor: 'red',
  });
};

export const SuccessAlert = title => {
  return Snackbar.show({
    text: title,
    duration: 3000,
    backgroundColor: 'green',
  });
};

export const putSocietyImages = async ({url, body}) => {
  var formData = new FormData();
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);

  if (body?.logo && body?.logo?.uri) {
    formData.append('logo', body.logo);
  }

  if (body?.images?.length > 0) {
    body.images.map(item => {
      formData.append('images', item);
    });
  }
  formData.append('id', body.id);
  formData.append('description', body.description);
  formData.append('primaryColour', body.primaryColour);
  // formData.append('shadowColour', body.shadowColour);
  formData.append('buttonHoverBgColour', body.buttonHoverBgColour);
  formData.append('buttonHoverfontColour', body.buttonHoverfontColour);
  formData.append('fontColour', body.fontColour);
  // console.log('config+++> putSocietyImages Data', formData);
  return axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${Token?.accessToken ? Token?.accessToken : null}`,
      'Content-Type': 'multipart/form-data',
      'ngrok-skip-browser-warning': 'your-custom-value',
    },
  });
};

export const CreateGuardAPI = async payload => {
  let Token = await getAsyncValue('user');
  Token = JSON.parse(Token);

  // console.log(Token.accessToken);

  const formData = new FormData();
  [payload.body].map(item => {
    Object.keys(item).map(key => {
      formData.append(key, item[key]);
    });
  });
  // console.log('config+++> CreateGuardAPI Data', formData);
  if (payload.update) {
    return axios
      .put(payload.url, formData, {
        headers: {
          Authorization: `Bearer ${
            Token?.accessToken ? Token?.accessToken : null
          }`,
          'Content-Type': 'multipart/form-data',
          'ngrok-skip-browser-warning': 'your-custom-value',
        },
      })
      .then(res => {
        return res;
      })
      .catch(e => {
        return e;
      });
  } else {
    return axios
      .post(payload.url, formData, {
        headers: {
          Authorization: `Bearer ${
            Token?.accessToken ? Token?.accessToken : null
          }`,
          'Content-Type': 'multipart/form-data',
          'ngrok-skip-browser-warning': 'your-custom-value',
        },
      })
      .then(res => {
        return res;
      })
      .catch(e => {
        return e;
      });
  }
};
