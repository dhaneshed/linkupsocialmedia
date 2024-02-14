import React, { useEffect, useState } from "react";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import ReportIcon from "@mui/icons-material/Report";
import "./Post.css";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnPost,
  addReportOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser } from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
import {
  adminUserPostDelete,
  adminUserPosts,
  loadAdmin,
} from "../../Actions/Admin";

import { format } from "timeago.js";

import { io } from "socket.io-client";
import ReportCard from "../ReportCard/ReportCard";
import ReplyCard from "../ReplyCard/ReplyCard";

const Post = ({
  postId,
  caption,
  createdAt,
  postImage,
  likes = [],
  comments = [],
  reports = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
  isAdmin = false,
}) => {



  const [socket, setSocket] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  const [reportPostToggle, setReportPostToggle] = useState(false);
  const [reportToggle, setReportToggle] = useState(false);
  const [reportPostValue, setReportPostValue] = useState("");


  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const socketURL = ' https://link-up-mppk.onrender.com/socket.io';

  useEffect(() => {
    setSocket(io(socketURL));
  }, []);

  const renderReplies = (comment) => {
    if (comment?.replies && Array?.isArray(comment?.replies)) {
      return comment?.replies?.map((reply) => (
        <ReplyCard
          key={reply?._id}
          userId={reply?.user?._id}
          name={reply?.user?.name}
          avatar={reply?.user?.avatar?.url}
          comment={reply?.comment}
          commentId={reply?._id}
          postId={postId}
          isAccount={isAccount}
          isAdmin={isAdmin}
        />
      ));
    }
    return null;
  };





  const handleLike = async () => {
    if (!isAdmin) {
      setLiked(!liked);
      await dispatch(likePost(postId));

      if (isAccount) {
        dispatch(getMyPosts());
      } else {
        dispatch(getFollowingPosts());
      }
      // Check if the user liking the post is not the post owne
      if (ownerId !== user?._id) {
        // Send a like notification
        socket.emit("sendNotification", {
          senderName: user?.name, // Assuming you have a name field in the user object
          receiverName: ownerName,
          type: 1, // Like notification type
        });
      }
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }

    // Check if the user commenting the post is not the post owner
    if (ownerId !== user?._id) {
      // Send a comment notification
      socket.emit("sendNotification", {
        senderName: user?.name, // Assuming you have a name field in the user object
        receiverName: ownerName,
        type: 2, // Comment notification type
      });
    }
  };

  const addPostReportHandler = async (e) => {
    e.preventDefault();
    await dispatch(addReportOnPost(postId, reportPostValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };
  useEffect(() => {
    if (!isAdmin) {
      likes?.forEach((item) => {
        if (item?._id === user?._id) {
          setLiked(true);
        }
      });
    }
  }, [likes, user?._id]);

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts);
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  const adminPostDeleteHandler = async () => {
    await dispatch(adminUserPostDelete(ownerId, postId));
    dispatch(loadAdmin());
    dispatch(adminUserPosts(ownerId));
  };

  return (
    <div className="post">
      <div className="postHeader">
        {isAdmin ? null : isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : (
          <Button onClick={() => setReportPostToggle(!reportPostToggle)}>
            <MoreVert />
          </Button>
        )}
      </div>
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{ height: "3vmax", width: "3vmax" }}
        />
        <Link to={isAdmin ? `/admin/user/${ownerId}` : `/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          ·
        </Typography>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {format(createdAt)}
        </Typography>
      </div>
      <img src={postImage} alt="Post" />
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes?.length === 0 ? true : false}
      >
        <Typography>{likes?.length} Likes</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>
        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
        {isAdmin ? (
          <>
            <Button onClick={() => setReportToggle(!reportToggle)}>
              <ReportIcon />
            </Button>
            <Button onClick={adminPostDeleteHandler}>
              <DeleteOutline />
            </Button>
          </>
        ) : null}
      </div>

      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>

          {likes.map((like) => (
            <User
              key={like?._id}
              userId={like?._id}
              name={like?.name}
              avatar={like?.avatar?.url}
            />
          ))}
        </div>
      </Dialog>
      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>
          {!isAdmin && (
            <form className="commentForm" onSubmit={addCommentHandler}>
              <input
                type="text"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="Comment Here..."
                required
              />
              <Button type="submit" variant="contained">
                Add
              </Button>
            </form>
          )}

          {comments?.length > 0 ? (
            comments?.map((item) => (
              <React.Fragment key={item?._id}>
                <CommentCard
                  userId={item?.user?._id}
                  name={item?.user?.name}
                  avatar={item?.user?.avatar?.url}
                  comment={item?.comment}
                  commentId={item?._id}
                  key={item?._id}
                  postId={postId}
                  isAccount={isAccount}
                  isAdmin={isAdmin}

                />
                {renderReplies(item)}
              </React.Fragment>
            ))
          ) : (
            <Typography>No Comments Yet</Typography>
          )}
        </div>
      </Dialog>
      <Dialog
        open={reportToggle}
        onClose={() => setReportToggle(!reportToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Reports</Typography>
          {console.log("This is the Reports Dialog Box")}
          {console.log("reports", reports)}
          {reports.length > 0 ? (
            reports.map((item) => (
              <ReportCard
                userId={item?.user?._id}
                name={item?.user?.name}
                avatar={item?.user?.avatar?.url}
                comment={item?.report}
                commentId={item?._id}
                key={item?._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No Reports Yet</Typography>
          )}
        </div>
      </Dialog>
      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>
          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />
            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
      <Dialog
        open={reportPostToggle}
        onClose={() => setReportPostToggle(!reportPostToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Report Post</Typography>
          <form className="commentForm" onSubmit={addPostReportHandler}>
            <input
              type="text"
              onChange={(e) => setReportPostValue(e.target.value)}
              placeholder=" What is wrong with the Post...."
              required
            />
            <Button type="submit" variant="contained">
              Report
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
