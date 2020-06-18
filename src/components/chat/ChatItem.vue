<template>
    <div id="chat-item">
         <div class="chat_cont">
            <button v-on:click="goChat(user)" class="user_btn"> {{"Chat with: " + getUsername}} </button>
              <div class="last_message_div">
            <p class="write_by"> {{message.writeBy + ": "}}</p>
            <p class="last_message">{{message.message}}</p>
              </div>
        </div>
    </div>
</template>
<style lang="scss">
    $chat-font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  #chat-item{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    .chat_cont{
        display: flex;
        width:60%;
        align-items: center;
        justify-content: space-between;
        background-color: #bbbbbb;
        border: 0;
        border-radius: 5%;
        margin:1%;
    }
    .c_username, .user_btn, .last_message{
        font-family: $chat-font-family;
    }
    .c_username, .last_message, .write_by{
        font-size: 1.5vw;
        margin: 1%;
    }
    .last_message_div{
        display: flex;
        flex-direction: row;
        width:100%;
        align-content: flex-start;
        justify-content: flex-start;
    }
    .write_by{
        font-weight: bold;
        align-self: start;
    }
    .last_message{
        max-width: 60%;
    }
    .user_btn{
        background: #2451a3;
        border:0;
        border-radius: 0px 20px 20px 0px;
        padding:1%;
        color:white;
        width: 40%;
        cursor:pointer;
        font-size: 1.5vh;
    }
</style>
<script>
export default {
    name: "chat-item",
    props: ['chat'],

    data(){
        return{
            user: {},
            message: ''
        }
    },
    mounted(){
        this.getUser();
        this.getMessage();
    },
    created(){
        this.getUser();
        this.getMessage();
    },
    methods: {
         getUser(){
            const tempChat = this.chat;
            if (tempChat.username1 == this.getMyUsername){
                this.user = {
                    id: tempChat.user2,
                    username: tempChat.username2
                }
            }
            else if (tempChat.username2 == this.getMyUsername) {
                this.user = {
                    id: tempChat.user1,
                    username: tempChat.username1
                }
            }
        },
        getMessage(){
            const tempMessages = this.chat.messages;
            this.message = tempMessages[tempMessages.length - 1];
        },
        goChat(user){
          const data = {
                user: {
                  _id: user.id,
                  username: user.username
              }
          }
          this.$http.post("chat", data).then (response => {
               this.$router.push({ name: 'chatPanel', params: {chat_id: response.data._id }}).catch(()=>{})
          }).catch((err) =>{
              console.log(err);
          });
      }},
      computed: {
          getUsername(){
            return this.user.username;
          },
          getMyUsername(){
              return this.$store.state.username;
          }
      }
}
</script>