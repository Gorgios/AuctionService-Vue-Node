<template>
    <div id="chat-panel">
        <div class="chat_panel_cont">
            <div class="current_chat">
                <chat  v-if="goChat" :chat_id="chat"/>
            </div>
            <div class="users_list">
                <users @goChat="goChatWith" :page="page" :limit="getLimit"/>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .chat_panel_cont{
        display: grid;
         @media only screen and (min-width: 1400px) {
         grid-template-columns: 3fr 1fr;
         }
    }
    .users_list{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
</style>
<script>
import Users from "../components/chat/Users"
import Chat from "../components/chat/Chat"
export default {
    name: "chat-panel",
    props: ['chat_id'],
    data(){
        return {
            chat: '',
            users: '',
            page: 1,
            goChat: false
        }
    },
    components: {
        Users,
        Chat
    },
    created(){
        if (this.chat_id !== undefined){
            this.goChatWith(this.chat_id);
        }
    },
    methods: {
        goChatWith(id){
            this.chat_id = undefined;
            this.goChat = false;
            this.chat = id;
            this.goChat = true;
        }
    },
    computed:{
        getLimit(){
            return this.$store.state.userLimit;
        },
        getUsername(){
            return this.$store.state.username;
        }
    }
}
</script>