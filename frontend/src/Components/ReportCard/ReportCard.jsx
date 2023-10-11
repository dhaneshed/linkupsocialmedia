import React from "react";
import "../CommentCard/CommentCard.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";



const ReportCard = ({
  userId,
  name,
  avatar,
  comment
}) => {
  
 
  return (
    <div className="commentUser">
      <Link to={`/admin/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>
    </div>
  );
};

export default ReportCard;
