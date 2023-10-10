import axios from 'axios'
export const UserApi=axios.create({
  baseURL:"http://localhost:4000/api/v1",
  withCredentials: true
})




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