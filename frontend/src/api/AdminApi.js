import axios from 'axios';

const baseURL = process.env.BACKEND_ADMIN_BASE_URL;

export const AdminApi=axios.create({
  baseURL,
  withCredentials: true
});