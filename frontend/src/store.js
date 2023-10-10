import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
} from "./Reducers/User";
import { adminPostsReducer, adminUserPostsReducer, likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";
import { adminReducer, adminReportPostsReducer, adminUserProfileReducer, adminUsersReducer } from "./Reducers/Admin";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
    adminUserProfile: adminUserProfileReducer ,
    adminUserPosts:adminUserPostsReducer ,
    adminPosts: adminPostsReducer,
    admin: adminReducer,
    adminUsers:adminUsersReducer,
    reportPosts:adminReportPostsReducer,
  },
});

export default store;
