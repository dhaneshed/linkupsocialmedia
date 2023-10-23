import React, { useEffect, useState } from "react";
import "./Notification.css";
import Noti from "./notification-bell-svgrepo-com.svg";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const Notification = () => {
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false); // Track socket connection
  const socketURL = process.env.REACT_APP_ORIGIN;
  useEffect(() => {
    const newSocket = io(socketURL);
    newSocket.on("connect",()=>{
      setSocket(newSocket);
      setSocketConnected(true);
    });

    return ()=>{
      newSocket.disconnect(); // Clean up socket connection on component unmount
    }
  }, []);

  useEffect(() => {
    if (socketConnected && user) {
      socket.emit("newUser", user.name);
      socket.on("getNotification", (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socketConnected,socket,user.name]);

  

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName}  ${action} your post`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Noti} className="iconImg" alt="" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n, index) => (
            <div key={index}>{displayNotification(n)}</div>
          ))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
