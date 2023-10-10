import { UserApi } from "./UserApi";

export const  userChats = (id)=> UserApi.get(`/chat/${id}`);
export const  newChat = (senderId,receiverId)=> UserApi.post(`/chat/new/${senderId}/${receiverId}`);