import React, { useEffect, useState } from "react";
import "./AdminLogin.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { loginAdmin } from "../../Actions/Admin";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  

  const {error} = useSelector((state)  => state.admin);

  const loginHandler = (e) => {
    e.preventDefault();

      dispatch(loginAdmin(email,password));
  
    
  };

  
  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

   

    
  }, [alert, error, dispatch]);
  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          LinkUp
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
     
        <Button type="submit">Login </Button>
     
      </form>
    </div>
  );
};

export default AdminLogin;