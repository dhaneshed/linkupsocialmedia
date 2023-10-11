import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blockStatus, logoutUser } from "./Actions/User";
import { io } from "socket.io-client";
import { useRef } from "react";

const UserBlockedMiddleware = ({ children }) => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const socket = useRef();

  socket.current = io("http://localhost:8800");

  useEffect(() => {
    // Listen for 'user-blocked' event
    socket.current.on("user-blocked", ({ userId }) => {
      // Handle the event here
      dispatch(logoutUser());
      // You can trigger a refresh, update UI, or take any other necessary action.
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.current.off("user-blocked");
    };
  }, [dispatch]);



  useEffect(() => {
    dispatch(blockStatus());
  }, [dispatch, user?.isBlocked]);
  // Check if the user is authenticated and blocked
 

  // Check if the user is authenticated and blocked
  if (isAuthenticated && user?.isBlocked) {
    // User is blocked, prevent access to the route()

    return <Navigate to="/block" />;
  }

  // User is not blocked, allow access to the route
  return children;
};

export default UserBlockedMiddleware;
