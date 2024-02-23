import React, { useEffect, useState } from "react";
import "./NewPost.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewPost } from "../../Actions/Post";
import { loadUser, logoutUser } from "../../Actions/User";
import { io } from "socket.io-client";
import { useRef } from "react";
import { Navigate } from "react-router-dom";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const socket = useRef();
  const socketURL = ' https://link-up-mppk.onrender.com:8080';

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

  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
    navigate("/account");
  };




  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>
        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;