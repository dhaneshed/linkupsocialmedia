const mongoose = require("mongoose");

const  MessageSchema = new mongoose.Schema({
    chatId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Chat",
    },
    senderId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    },
    text:{
      type:String
    }
}, {
  timestamps:true,
});

const Message = mongoose.model("Message",MessageSchema);


module.exports = Message; 
