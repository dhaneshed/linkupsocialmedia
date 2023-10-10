import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import {  loadUser, logoutUser } from "./Actions/User";
import Home from "./Pages/Home/Home";
import Account from "./Pages/Account/Account";
import NewPost from "./Pages/NewPost/NewPost";
import Register from "./Pages/Register/Register";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Pages/UpdatePassword/UpdatePassword";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Search from "./Pages/Search/Search";
import NotFound from "./Pages/NotFound/NotFound";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UserList from "./Components/userList/userList";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import { loadAdmin} from "./Actions/Admin";
import Chat from "./Pages/Chat/Chat";
import Room from "./Pages/Room/Room";
import RoomPage from "./Pages/RoomPage/RoomPage";
import ChartView from "./Pages/ChartView/ChartView";
import PostList from "./Components/postList/postList";
import UserBlockedMiddleware from "./UserBlockedMiddleware";
import Blocked from "./Pages/Blocked/Blocked";
import { io } from "socket.io-client";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated ,user} = useSelector((state) => state.user);

  const { isAdminAuthenticated } = useSelector((state) => state.admin);
  
  
  

  const socket = useRef();

  socket.current = io("http://localhost:8800");

  useEffect(() => {
  // Listen for 'user-blocked' event
  socket.current.on('user-blocked', ({ userId }) => {
    // Handle the event here
    dispatch(logoutUser());
     <Navigate to="/block" />; 

    // You can trigger a refresh, update UI, or take any other necessary action.
  });

  // Cleanup the event listener when the component unmounts
  return () => {
    socket.current.off('user-blocked');
  };
}, [dispatch]);









  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadAdmin());
  }, [dispatch]);

  // Check if user is blocked and log them out if necessary
  useEffect(() => {
    if (isAuthenticated && user?.isBlocked) {
      // Log the user out and redirect to the login page
      // You should implement your logout logic here
      // For example, clearing user data from Redux and localStorage
      // Then navigate to the login page
      // Replace this with your actual logout logic
      dispatch(logoutUser()); // Dispatch your logout action
    
  
    }
  }, [isAuthenticated, user?.isBlocked, dispatch]);
  return (
    <Router>
     {isAuthenticated && !window.location.pathname.startsWith("/admin") && !window.location.pathname.startsWith("/block") ? (
  <Header />
) : null}

      <Routes>
        <Route
          path="/admin"
          element={isAdminAuthenticated ?(<Dashboard child={<ChartView/>}  />)  : (<AdminLogin />) }
        />
        <Route
          path="/admin/users"
          element={
            isAdminAuthenticated ? (
              <Dashboard child={<UserList />} />
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route
          path="/admin/posts"
          element={
            isAdminAuthenticated ? (
              <Dashboard child={<PostList />} />
            ) : (
              <AdminLogin />
            )
          }
        />

        <Route path="/" element={<UserBlockedMiddleware>{isAuthenticated && !user.isBlocked ? <Home /> : <Login />}</UserBlockedMiddleware>} />
        <Route
          path="/account"
          element={<UserBlockedMiddleware>{isAuthenticated && !user.isBlocked ? <Account /> : <Login />}</UserBlockedMiddleware>}
        />
        <Route path="/chat" element={<UserBlockedMiddleware>{isAuthenticated && !user.isBlocked ? <Chat /> : <Login />}</UserBlockedMiddleware>} />

        <Route path="/room" element={<UserBlockedMiddleware>{isAuthenticated && !user.isBlocked ? <Room/> : <Login />}</UserBlockedMiddleware>} />
        
        <Route path="/room/:roomId" element={<UserBlockedMiddleware>{isAuthenticated && !user.isBlocked ? <RoomPage/> : <Login />}</UserBlockedMiddleware>} />
        <Route
          path="/register"
          element={<UserBlockedMiddleware>{isAuthenticated && !user.isBlocked ? <Account /> : <Register />}</UserBlockedMiddleware> }
        />
        <Route
          path="/newpost"
          element={<UserBlockedMiddleware>{isAuthenticated && !user.isBlocked ? <NewPost /> : <Login />}</UserBlockedMiddleware>}
        />
        <Route
          path="/update/profile"
          element={<UserBlockedMiddleware>{isAuthenticated && !user.isBlocked ? <UpdateProfile /> : <Login />}</UserBlockedMiddleware>}
        />
        <Route
          path="/update/password"
          element={<UserBlockedMiddleware>{isAuthenticated  ? <UpdatePassword /> : <Login />}</UserBlockedMiddleware>}
        />

        <Route
          path="/forgot/password"
          element={<UserBlockedMiddleware>{isAuthenticated  ? <UpdatePassword /> : <ForgotPassword />}</UserBlockedMiddleware>}
        />

        <Route
          path="/password/reset/:token"
          element={<UserBlockedMiddleware>{isAuthenticated  ? <UpdatePassword /> : <ResetPassword />}</UserBlockedMiddleware>}
        />

        <Route
          path="/user/:id"
          element={<UserBlockedMiddleware>{isAuthenticated  ? <UserProfile /> : <Login />}</UserBlockedMiddleware>}
        />
        <Route path="/user/*" element={<NotFound />} />

        <Route path="search" element={<UserBlockedMiddleware>{<Search />}</UserBlockedMiddleware>} />

         <Route path="/block" element={<Blocked />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
