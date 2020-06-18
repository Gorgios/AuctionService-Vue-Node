<template>
    <div id="chat">
    <div class="chat_content">
        <h3 v-if="currentChat.username1 !== getUsername && currentChat.username1  "> {{"Chat with " + currentChat.username1}} </h3>
        <h3 v-if="currentChat.username2 !== getUsername && currentChat.username2 "> {{"Chat with " + currentChat.username2}} </h3>
        <div id="messages_container">
        <div 
          v-for="(mess,index) in currentChat.messages"
            v-bind:item ="mess"
            v-bind:index="index"
            v-bind:key="index">
            <message :message="mess"/>
        </div>
        </div>
    </div>
        <div class = "newText">
        <textarea v-model="message" rows="2"/>
        <button class= "send_mess_btn" v-on:click="sendMess">Send</button> 
        </div>
    </div>
</template>
<style lang="scss">
$chat-font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
.chat_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
    overflow-x: hidden;
    #messages_container {
    border: 1px solid #efefef;
    width: 60%;
     @media only screen and (max-width: 1300px) {
             width: 80%;
         }
    height: 500px;
      border: 0;
     border-radius: 20px;
     background-color: #bbbbbb;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
}   
    h3{
        color:#bbbbbb;
        font-size: 2rem;
        margin-top: 0;
    }
}
.newText{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    textarea{
        width: 40%;
        font-size:1.5rem;
        font-family: $chat-font-family;
        border: 0;
        border-radius: 20px;
        margin: 2%;
     }
}
.send_mess_btn{
    background: #2451a3;
    border:0;
    padding:1%;
    color:white;
    cursor:pointer;
    width: 20%;
    font-size:1.5rem;
    font-family: $chat-font-family;
    border-radius: 20px;
    margin-bottom: 20px;
}

</style>
<script>
import Message from "./Message"
export default {
    name:'chat',
    props:['chat_id'],
    data(){
        return {
            username: '',
            currentChat: {},
            message: ''
        }
    },
    components: {
        Message
    },
    mounted(){
        this.getChat();
        this.sockets();

    },
    created(){
        this.sockets();
        this.getChat();
    },
    updated(){
        var container = this.$el.querySelector("#messages_container");
        container.scrollTop = container.scrollHeight;
    },
    methods :{
        getChat(){
           {
            this.$http.get("/chat/"+ this.chat_id).then((response) =>{
                this.currentChat = response.data;
                 this.$socket.emit("chat",response.data._id);
            }
            ).catch((error) =>
            {
                alert(error.message)
            });
           }
        },
        sendMess(){
            let newMessage = {
                date: new Date().toString(),
                writeBy: this.$store.state.username,
                message: this.message
            };
            let chat = {
                message: newMessage,
                chat_id: this.chat_id
            };
            this.message = '';
            this.$socket.emit("createMessage",chat);
        },
        sockets(){
            this.$socket.on("newMessage", (data) =>{
                this.currentChat = data;
            });
        }
    },
      watch: {
          chat_id: function(newVal,old) {
              this.$socket.emit("leaveChat",old);
              this.getChat();
          }
      },
      computed: {
          getUsername(){
                return this.$store.state.username;
          }
      }
  }
</script>