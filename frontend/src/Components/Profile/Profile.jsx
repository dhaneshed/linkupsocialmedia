import { Avatar, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import Loader from "../../Components/Loader/Loader";
import Post from "../../Components/Post/Post";
import User from "../../Components/User/User";
import { adminUserPosts, adminUserProfile } from "../../Actions/Admin";

const Profile = () => {
  const dispatch = useDispatch();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.adminUserProfile);

  const { loading, error, posts } = useSelector((state) => state.adminUserPosts);


  const {
    error: followError,
    message,
  } = useSelector((state) => state.like);

  const params = useParams();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);



  useEffect(() => {
    dispatch(adminUserPosts(params.id));
     dispatch(adminUserProfile(params.id));
  }, [dispatch, params.id]);



  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
      
        {posts && posts.length > 0 ? (
          posts.map((post) => (
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
              isAdmin={true}
            />
          ))
        ) : (
          <Typography variant="h6">User has not made any post</Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
            <Avatar
              src={user?.avatar?.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />

            <Typography variant="h5">{user?.name}</Typography>

            <div>
              <button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
              <Typography>{user?.followers?.length}</Typography>
            </div>

            <div>
              <button onClick={() => setFollowingToggle(!followingToggle)}>
                <Typography>Following</Typography>
              </button>
              <Typography>{user?.following?.length}</Typography>
            </div>

            <div>
              <Typography>Posts</Typography>
              <Typography>{user?.posts?.length}</Typography>
            </div>
          </>
        )}
        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user?.followers?.length > 0 ? (
              user?.followers?.map((follower) => (
                <User
                  key={follower?._id}
                  userId={follower?._id}
                  name={follower?.name}
                  avatar={follower?.avatar?.url}
                  isAdmin={true}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                User has no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user && user?.following?.length > 0 ? (
              user?.following?.map((follow) => (
                <User
                  key={follow?._id}
                  userId={follow?._id}
                  name={follow?.name}
                  avatar={follow?.avatar?.url}
                  isAdmin={true}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                User is not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;

