const Chat = require('../model/chat');

const chatSockets = (socket,io) => {
socket.on("chat", (chat) => {
    socket.join(chat);
});
socket.on("leaveChat",(chat)=> {
    socket.leave(chat);
})
socket.on("createMessage", (chat) =>{     
    let _id = chat.chat_id; 
    Chat.findByIdAndUpdate({_id},{$push: {messages: chat.message }},{new: true}, (err,chat) =>{
        if (err){
            console.log(err);
        }
        else{
            io.sockets.in(_id).emit("newMessage",chat);
        }
    });
});
};
module.exports = chatSockets;