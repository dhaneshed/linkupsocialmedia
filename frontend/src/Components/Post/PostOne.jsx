import React, { useEffect, useState } from "react";
import PostHeader from "./PostHeader";
import PostDetails from "./PostDetails";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import DeleteButton from "./DeleteButton";
import "./Post.css";
import LikedUsers from "./LikedUsers";
import { addCommentOnPost, deletePost, likePost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser } from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import DialogBox from "./DialogBox";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
import { Button, Typography } from "@mui/material";

const PostOne = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [captionToggle, setCaptionToggle] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
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
  };

  
  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <PostHeader
        isAccount={isAccount}
        toggleCaption={() => setCaptionToggle(!captionToggle)}
      />
      <img src={postImage} alt="Post" />
      <PostDetails
        ownerImage={ownerImage}
        ownerName={ownerName}
        ownerId={ownerId}
        caption={caption}
      />
      <LikedUsers
        handleLikedUsers={() => setLikesUser(!likesUser)}
        disableLikedUsers={likes.length === 0 ? true : false}
        likedUsersTypography={likes.length}
      />
      <div className="postFooter">
        <LikeButton liked={liked} handleLike={handleLike} likes={likes} />
        <CommentButton toggleComment={() => setCommentToggle(!commentToggle)} />
        {isDelete && <DeleteButton deletePostHandler={deletePostHandler} />}
      </div>
      <DialogBox
        openDialog={likesUser}
        onCloseDialog={() => setLikesUser(!likesUser)}
        typographyDialog="Liked By"
        iterationDialog={likes.map((like) => (
          <User
            key={like._id}
            userId={like._id}
            name={like.name}
            avatar={like.avatar.url}
          />
        ))}
      />
      <DialogBox
        openDialog={commentToggle}
        onCloseDialog={() => setCommentToggle(!commentToggle)}
        typographyDialog="Comments"
        children={
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

        }
        iterationDialog={comments.length > 0 ? (
          comments.map((item) => (
            <CommentCard
              userId={item.user._id}
              name={item.user.name}
              avatar={item.user.avatar.url}
              comment={item.comment}
              commentId={item._id}
              key={item._id}
              postId={postId}
              isAccount={isAccount}
            />
          ))
        ) : (
          <Typography>No Comments Yet</Typography>
        )}
      />
      <DialogBox openDialog={captionToggle} onCloseDialog={() => setCaptionToggle(!captionToggle)} typographyDialog="Update Caption" children={<></>} iterationDialog={<></>} />

    </div>
  );
};

export default PostOne;
