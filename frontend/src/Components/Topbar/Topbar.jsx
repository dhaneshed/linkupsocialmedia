import React, { useState } from "react";
import "./Topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { Button } from "@mui/material";
import { logoutAdmin } from "../../Actions/Admin";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

export default function Topbar() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAdmin());
    alert.success("Logged out successfully");
  };



  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">LinkUp Admin</span>
        </div>
        <div className="topRight">

          <div className="topAvatarContainer" onClick={logoutHandler}>
              
                <Button variant="contained" className="logoutButton" onClick={logoutHandler}>
                  Logout
                </Button>
        
        
    
          </div>
        </div>
      </div>
    </div>
  );
}
