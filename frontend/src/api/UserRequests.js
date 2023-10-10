import { UserApi } from "./UserApi";

export const getUser = (userId) =>  UserApi.get(`/user/${userId}`); 