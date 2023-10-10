const express = require ("express");
const { addMessage, getMessages } = require("../controllers/message");

const { isAuthenticated} = require("../middlewares/auth");

const router = express.Router();

router.post('/',isAuthenticated,addMessage);

router.get('/:chatId',isAuthenticated,getMessages);

module.exports = router;