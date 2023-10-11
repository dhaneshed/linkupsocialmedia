import {  LineStyle,  PermIdentity,  } from "@mui/icons-material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import "./Sidebar.css";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
              </Link>

              <Link to="/admin/posts" className="link">

              <li className="sidebarListItem">
                <PostAddIcon className="sidebarIcon" />
                Posts
              </li>
              </Link>
           
         
        
         
          </ul>
        </div>
      

      </div>
    </div>
  );
}