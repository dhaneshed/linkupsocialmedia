import axios from 'axios';

const baseURL = process.env.REACT_APP_ADMIN_BASE_URL;

console.log("Admin Base URL is ........",baseURL);

export const AdminApi=axios.create({
  baseURL,
  withCredentials: true
});