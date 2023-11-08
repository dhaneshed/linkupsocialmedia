import axios from 'axios';

const baseURL = 'https://linkupsocial.online/api/v1/admin';

export const AdminApi=axios.create({
  baseURL,
  withCredentials: true
});