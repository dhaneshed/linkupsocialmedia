import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL+'/v1/admin';;

export const AdminApi=axios.create({
  baseURL,
  withCredentials: true
});