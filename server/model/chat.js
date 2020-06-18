const mongoose = require("../mongoose");
const Schema = mongoose.Schema;
//const chatSocket = require ("../app")

const ChatSchema = new Schema({
  messages: {type: mongoose.Schema.Types.Mixed},
  user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  username1: String
  ,
  user2: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
   },
     username2: String
},{timestamps: true});

const Chat = mongoose.model('Chat', ChatSchema);

Chat.processErrors = (err) => {
    let msg = {};
    for (let key in err.errors) {
        msg[key] = err.errors[key].message;
    }
    return msg;
};

module.exports = Chat;