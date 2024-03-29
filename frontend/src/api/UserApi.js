import axios from 'axios'

// const baseURL = 'https://linkupsocial.online/api/v1';
const baseURL = 'https://link-up-mppk.onrender.com/api/v1'
export const UserApi=axios.create({
  baseURL,
  withCredentials: true
});




// Add a response interceptor
UserApi.interceptors.response.use(
  (response) => {
    if(response && response.data && response.data?.isBlocked ){

      window.location.href='/block';

    }
    return response;
  },
  (error) => {
    // Do something with the error
    return Promise.reject(error);
  }
);