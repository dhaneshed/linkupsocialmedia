const express = require ("express");
const router = express.Router();
const { createChat, userChats, findChat, newChat } = require("../controllers/chat");
const { isAuthenticated} = require("../middlewares/auth");





router.post("/",isAuthenticated, createChat);

router.post("/new/:senderId/:receiverId",isAuthenticated, newChat);

router.get("/:userId",isAuthenticated, userChats);

router.get("/find/:firstId/:secondId",isAuthenticated,findChat);

module.exports = router;


