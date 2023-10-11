import React, { useState } from "react";
import "./Topbar.css";
import { Button } from "@mui/material";
import { logoutAdmin } from "../../Actions/Admin";
import { useDispatch } from "react-redux";

export default function Topbar() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAdmin());
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
