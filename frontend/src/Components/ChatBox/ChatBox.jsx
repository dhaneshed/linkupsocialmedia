import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { getUser } from "../../api/UserRequests";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
      setMessages((prevMessages) => [...prevMessages, receiveMessage]);

    }
  }, [receiveMessage,chat?._id]);

  //fetching data from the header

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  //fetching data for messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat?._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat?._id,
    };

    //send message to database
    try {
      const { data } = await addMessage(message);
      setMessages((prevMessages) => [...prevMessages, data]);

      setNewMessage(""); // Clear the input after sending
    } catch (error) {
      console.log(error);
    }
    //send message to socket server
    const receiverId = chat?.members?.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  // Always scroll to the last message
  useEffect(() => {

    scroll.current?.scrollIntoView({behavior:"smooth"})
    
  }, [messages])
  

  return (
    <>
    <div className="ChatBox-container">
      {chat ? (
        <>
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={userData?.user?.avatar?.url}
                  alt=""
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="name" style={{ fontSize: "0.8rem" }}>
                  <span>{userData?.user?.name}</span>
                </div>
              </div>
            </div>
            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
          </div>

          {/* chatbox Messages */}
          <div className="chat-body">

            {messages?.map((message,index) => (
            
              <div ref={scroll}
              key={`${message?._id}-${message?.createdAt || 'defaultCreatedAt'}-${message?.updatedAt || 'defaultUpdatedAt'}-${index}`}
                className={
                  message?.senderId === currentUser
                    ? "message own"
                    : "message "
                }
              >
                <div>
                <span  >{message?.text}</span>
                <span className="message-divider"> · </span> 
                <span className="message-time">{format(message?.createdAt)}</span>
                </div>
                
              </div>
            ))}

            
          </div>
          <div className="chat-sender">
            <div>+</div>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <div className="send-button button" onClick={handleSend}>
              Send
            </div>
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a Chat to start Conversation...
        </span>
      )}
    </div>
    </>
  );
};

export default ChatBox;
