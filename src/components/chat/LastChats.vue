<template>
    <div id="last-chats">
        <div class="chats_cont">
        <div class="chat_item"
            v-for="(chat,index) in getChats"
            v-bind:item ="chat"
            v-bind:index="index"
            v-bind:key="index">
            <chat-item :chat="chat" />
     </div>
        </div>
    </div>
</template>
<style lang="scss">
    #last-chats{
           display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
         h3{
        font-size: 2rem;
        color: #bbbbbb;
    }
    .chats_cont{
         display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 5%;
        width: 100%;
    }
    }
    .chat_item{
        display: flex;
        width: 100%;
        flex-direction: column;
    }
</style>
<script>
import ChatItem from "./ChatItem"
export default {
    name:"last-chats",
    data(){
        return {
            chats: {}
        }
    },
    mounted(){
        this.getAll();
    },
    components: {
        ChatItem
    },
    methods: {
        async getAll(){
           await this.$http.get("lastChats").then( (res) =>{
                this.chats = res.data;
        }).catch((err) => {
            alert(err.message)
        })}
    },
    computed:{
        getChats(){
            return this.chats;
        }
    }
}
</script>