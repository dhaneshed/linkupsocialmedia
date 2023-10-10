import { UserApi } from "./UserApi";

export const getMessages = (id)=>UserApi.get(`/message/${id}`);
export const addMessage  = (data)=>UserApi.post(`/message/`,data);