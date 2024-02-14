import React, { useEffect, useState } from "react";
import "./Notification.css";
import Noti from "./notification-bell-svgrepo-com.svg";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { Badge, IconButton } from "@mui/material";
const Notification = ({ }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false); // Track socket connection
  const socketURL = ' https://link-up-mppk.onrender.com/socket.io';
  useEffect(() => {
    const newSocket = io(socketURL);
    newSocket.on("connect", () => {
      setSocket(newSocket);
      setSocketConnected(true);
    });

    return () => {
      newSocket.disconnect(); // Clean up socket connection on component unmount
    }
  }, []);

  useEffect(() => {
    if (socketConnected) {
      socket.emit("newUser", user?.name);
      socket.on("getNotification", (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socketConnected, socket, user?.name]);



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
          <IconButton aria-label="cart">
            <NotificationsNoneIcon />
            {notifications.length > 0 && (
              <Badge badgeContent={notifications.length} color="secondary">
              </Badge>
            )}
          </IconButton>
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
