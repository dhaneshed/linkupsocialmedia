import React, { useState } from 'react';
import "./Header.css";
import {Link} from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  Search,
  SearchOutlined,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";

import ChatIcon from '@mui/icons-material/Chat';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import Notification from '../Notification/Notification';

const Header = () => {
  const [tab,setTab] = useState(window.location.pathname);
  return <div className="header">
    <Link to="/" onClick={()=>setTab("/")}>
     {tab === "/" ? <Home style={{color:"black"}}/> : <HomeOutlined/> }
    </Link>
    <Link to="/newpost" onClick={()=>setTab("/newpost")}>
    {tab === "/newpost" ? <Add style={{color:"black"}}/> : <AddOutlined/>}  
    </Link>
    <Link to="/search" onClick={()=>setTab("/search")}>
    {tab === "/search" ? <Search style={{color:"black"}}/> : <SearchOutlined/>}  
    
    </Link>

    <Link to="/chat" onClick={()=>setTab("/chat")}>
    {tab === "/chat" ? <ChatIcon style={{color:"black"}}/> : <ChatBubbleOutlineOutlinedIcon/>} 
    </Link>


    <Link to="/room" onClick={()=>setTab("/room")}>
    {tab === "/room" ? <VideoCallIcon style={{color:"black"}}/> : <VideoCallOutlinedIcon/>} 
    </Link>

    <Link to="/account" onClick={()=>setTab("/account")}>
    {tab === "/account" ? <AccountCircle style={{color:"black"}}/> : <AccountCircleOutlined/>} 
    </Link>
    <Notification/>
  </div>;
  
};

export default Header;
