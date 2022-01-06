import axios from 'axios';
export const BASE_URL = 'https://taxi-mad-app.herokuapp.com/';

export const _axiosPostAPI = (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: 'POST',
        url: BASE_URL + url,
        data: params,
      })
        .then(async (response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const _axiosGetAPI = (url) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url: BASE_URL + url,
        method: 'GET',
      })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    } catch (error) {
      reject(error);
    }
  });
};
