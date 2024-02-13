import axios from 'axios';

const baseURL = 'https://link-up-mppk.onrender.com/api/v1/admin';

export const AdminApi=axios.create({
  baseURL,
  withCredentials: true
});