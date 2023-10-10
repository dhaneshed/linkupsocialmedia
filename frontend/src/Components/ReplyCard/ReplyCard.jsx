import React, { useState } from "react";
import "../CommentCard/CommentCard.css";
import { Link } from "react-router-dom";
import { Button, Dialog, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addReplyOnComment, deleteCommentOnPost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts } from "../../Actions/User";

const ReplyCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
  isAdmin,

}) => {


  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>
    </div>
  );
};

export default ReplyCard;