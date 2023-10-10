import {AdminApi} from "./AdminApi";

export const userCount = () => AdminApi.get(`/userCount`);
export const postCount = () => AdminApi.get(`/postCount`);
export const commentCount = () => AdminApi.get(`/totalComments`);
export const reportCount = () => AdminApi.get(`/totalReports`);
export const chartData = () => AdminApi.get(`/userRegister`);
