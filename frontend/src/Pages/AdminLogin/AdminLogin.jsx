import React, { useEffect, useState } from "react";
import "./AdminLogin.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../Actions/Admin";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();


  const { error } = useSelector((state) => state.admin);

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginAdmin(email, password));


  };



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