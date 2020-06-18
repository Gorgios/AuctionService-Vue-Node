<template>
    <div id="login">
        <div class="loginForm">
        <div class="error">
            <p>{{error}}</p>
        </div>  
          <input class="ipt ipt_username" type="text" v-model="username" placeholder="username">
            <input class="ipt ipt_password" type="password" v-model="password" placeholder="password">
            <button class="login_register_btn" v-on:click="login" id="login">Log in</button>
        </div>
    </div>
</template>
<style lang="scss">
       #login{
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
   }
</style>
<script>
export default {
    name:"login",
    data(){
        return{
            username: '',
            password: '',
            error: null
        }
    },
    methods: {
       async login(){
            const data = {
                username: this.username, 
                password: this.password
                };
                await this.$http.post('/login',data)
                .then( response => { 
                     this.$store.commit("updateUser",response.data.user);
                     this.$socket.open();
                     this.$router.push("/").catch(()=>{})
                }
                ).catch (() =>{
                this.error = "Invalid username or password" })
            }
    }
}
</script>