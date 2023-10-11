import React, { useRef } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { newChat, userChats } from "../../api/ChatRequests";
import Conversation from "../../Components/Conversation/Conversation";
import ChatBox from "../../Components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { Button } from "@mui/material";
import { getAllUsers, logoutUser } from "../../Actions/User";
import Talk from "../../Components/Talk/Talk"
import { Navigate } from "react-router-dom";

const Chat = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = React.useState("");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState({});
  const socket = useRef();

  socket.current = io("https://linkupsocial.online/");

  useEffect(() => {
    // Listen for 'user-blocked' event
    socket.current.on("user-blocked", ({ userId }) => {
      // Handle the event here
      dispatch(logoutUser());
      <Navigate to="/block" />;
      // You can trigger a refresh, update UI, or take any other necessary action.
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.current.off("user-blocked");
    };
  }, []);

  const { users, loading } = useSelector((state) => state.allUsers);

 

  //sending message to the socket server

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("https://linkupsocial.online");
    socket.current.emit("new-user-add", user?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  // receive Message from socket s
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await userChats(user?._id);
        const data = response?.data; // Extract data from the response
        if (data !== null && data !== undefined) {
          setChats(data);
        } else {
          console.log("Chat data is null or undefined.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

     // Filter out users who are already in the chat list
  const filteredUsers = users?.filter((member) => {
    // Check if the member's ID is not in any of the chat's members array
    return !chats?.some((chat) => chat?.members?.includes(member?._id));
  });

  const handleTalkClick = async (userId) => {
    try {

       // Check if a chat with this user is already in progress
    if (currentChat?.members?.includes(userId)) {
      // Chat with this user already exists, do nothing
      return;
    }

    // Check if a chat with this user is being created
    if (sendMessage === null) {
      // Set the user ID to initiate chat creation
      setSendMessage(userId);
    } else {
      // A chat creation is already in progress, do nothing
      return;
    }

      const existingChat = chats?.find((chat)=>
      chat?.members?.includes(user?._id) && chat?.members?.includes(userId));


      if (user?._id !== userId ) {
        if(existingChat){
          setCurrentChat(existingChat);

        }else{
        const response = await newChat(user?._id, userId);
        const newChatData = response.data;

        setCurrentChat(newChatData);
        }
        setSendMessage(null);
        
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const checkOnlineStatus = (chat) => {
    const chatMember = chat?.members?.find((member) => member !== user?._id);
    const online = onlineUsers?.find((user) => user?.userId === chatMember);
    return online ? true : false;
  };
  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <div className="Chat-container">
          <form className="userSearch" onSubmit={submitHandler}>
            <input
              type="text"
              value={name}
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <Button disabled={loading} type="submit">
              Search
            </Button>

            <div className="Chat-list">
              {name !== "" &&
                users &&
                user &&
                filteredUsers?.map((member) => (
                  
                  <div
                    key={member?._id}
                    onClick={() => handleTalkClick(member?._id)}
                  >

                  
                    {member?._id !== user?._id && (
                      <Talk
                        key={member?._id}
                        userId={member?._id}
                        name={member?.name}
                        avatar={member?.avatar?.url}
                      />
                    )}
                  </div>
                ))}
            </div>
          </form>

          <h2>Chats</h2>
          <div className="Chat-list">
            {chats?.map((chat) => (
              <div key={chat?._id} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  key={chat?.createdAt}
                  data={chat}
                  currentUserId={user?._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="Right-side-chat">
        <div style={{ width: "100%", alignSelf: "flex-end" }}>
          {/* chat body */}
          {currentChat && (
            <ChatBox
              chat={currentChat}
              currentUser={user?._id}
              setSendMessage={setSendMessage}
              receiveMessage={receiveMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
