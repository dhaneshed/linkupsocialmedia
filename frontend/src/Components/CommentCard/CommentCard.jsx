import React, { useState } from "react";
import "./CommentCard.css";
import { Link } from "react-router-dom";
import { Button, Dialog, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addReplyOnComment, deleteCommentOnPost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts } from "../../Actions/User";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,

}) => {

  

  const { user } = useSelector((state) => state.user);
  console.log("The User Id is........",userId);
  console.log("The  user is......",user?._id);
   const [replyFormOpen, setReplyFormOpen] = useState(false);
  const [replyValue, setReplyValue] = useState("");
    const dispatch = useDispatch();

  const toggleReplyForm = () => {
    setReplyFormOpen(!replyFormOpen);
  };

  const addReplyHandler = async (e) => {
    e.preventDefault();
    // Handle adding a reply here using your dispatch method
    await dispatch(addReplyOnComment(postId,commentId,replyValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }

    // After adding the reply, you may want to clear the input field and close the reply form
    setReplyValue("");
    setReplyFormOpen(false);
  };
  const deleteCommentHandle = () => {
    dispatch(deleteCommentOnPost(postId, commentId));
    console.log(postId,commentId);
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  


  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>
      {isAccount  ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : userId === user?._id ? (
        <Button onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : null}

         {/* Reply button */}
      <Button onClick={toggleReplyForm}>Reply</Button>

      {/* Reply form */}
      <Dialog open={replyFormOpen} onClose={toggleReplyForm}>
        <div className="DialogBox">
          <Typography variant="h4">Reply to {name}</Typography>
          <form className="commentForm" onSubmit={addReplyHandler}>
            <input
              type="text"
              value={replyValue}
              onChange={(e) => setReplyValue(e.target.value)}
              placeholder="Reply here..."
              required
            />
            <Button type="submit" variant="contained">
              Add Reply
            </Button>
          </form>
        </div>
      </Dialog>


      
    </div>
  );
};

export default CommentCard;
