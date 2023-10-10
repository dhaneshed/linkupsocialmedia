import React from "react";
import { Avatar, Link } from "@mui/material";
import { Typography } from "@mui/material";



const PostDetails = ({ ownerImage, ownerName, ownerId, caption }) => {
  
  return (
    <div className="postDetails">
      <Avatar
        src={ownerImage}
        alt="User"
        sx={{ height: "3vmax", width: "3vmax" }}
      />
      <Link to={`/user/${ownerId}`}>
        <Typography fontWeight={700}>{ownerName}</Typography>
      </Link>
      <Typography
        fontWeight={100}
        color="rgba(0,0,0,0.582)"
        style={{ alignSelf: "center" }}
      >
        {caption} 
      </Typography>
    </div>
  );
};

export default PostDetails;
