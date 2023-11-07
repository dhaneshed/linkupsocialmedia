import axios from 'axios';

const baseURL = 'http://localhost:4000/api/v1/admin';

export const AdminApi=axios.create({
  baseURL,
  withCredentials: true
});