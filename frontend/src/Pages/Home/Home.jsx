import React, { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts, logoutUser } from "../../Actions/User";

import { Typography } from "@mui/material";
import Loader from "../../Components/Loader/Loader";
import Post from "../../Components/Post/Post";
import User from "../../Components/User/User";
import { io } from "socket.io-client";
import { useRef } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const socketURL = ' https://link-up-mppk.onrender.com';

  socket.current = io(socketURL);

  useEffect(() => {
    // Listen for 'user-blocked' event
    socket.current.on("user-blocked", ({ userId }) => {
      // Handle the event here
      dispatch(logoutUser());
      <Navigate to="/block" />;
      // You can trigger a refresh, update UI, or take any other necessary action.
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.current.off("user-blocked");
    };
  }, []);

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );


  const { error: likeError, message } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);




  return usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts?.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              createdAt={post.createdAt}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              reports={post.reports}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}

            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        <Typography>Contacts</Typography>
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url
              }
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
