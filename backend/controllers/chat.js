const Chat = require("../models/Chat");
const User = require("../models/User");

exports.createChat = async (req, res) => {
  try {
    const sender = await User.findById(req.body.senderId);
    const receiver = await User.findById(req.body.receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }
    const newChat = new Chat({
      members: [sender._id, receiver._id],
    });
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.newChat = async (req, res) => {
  console.log("New Chat is........");

  try {
    console.log("New chat try is.......");
    const sender = await User.findById(req.params.senderId);
    console.log("sender is...........", req.params.senderId);

    const receiver = await User.findById(req.params.receiverId);
    console.log("receiver is .......", req.params.receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }
    const newChat = new Chat({
      members: [sender._id, receiver._id],
    });
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    console.log("New Chat erroro is......");
    console.log("The erroro is......", error);
    res.status(500).json(error);
  }
};

exports.userChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
