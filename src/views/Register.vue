<template>
    <div id="register">
        <div class="loginForm">
            <div v-if="errors" class="error">
                <p v-if="errors.length">
                      <ul>
                        <li v-for="(error,index) in errors" v-bind:key="index">{{ error }}</li>
                     </ul>
                </p>
            </div>
            <input class="ipt ipt_username" type="text" v-model="username" placeholder="username">
            <input class="ipt ipt_password" type="password" v-model="password" placeholder="password">
            <input class="ipt ipt_email" type="email" v-model="email" placeholder="email">
            <button class="login_register_btn" v-on:click="register"> Register</button>
        </div>
    </div>
</template>
<style lang="scss">
    $ipt-register-font-size:1.5vw;
    $login-form-bg-color:  #bbbbbb;
    $login-items-width: 50%;
    $login-items-border-radius: 20px;
    $login-form-width: 40%;
    $login-form-height: 300px;

   #register{
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
   }
   .loginForm{
       height: $login-form-height;
       background-color: $login-form-bg-color;
       border:0;
       border-radius: $login-items-border-radius;
      @media only screen and (max-width: 800px){
      width:$login-form-width * 2;
        }
         @media only screen and (min-width: 801px) and (max-width: 1400px){
      width: $login-form-width * 1.5;
        }
         @media only screen and (min-width: 1401px){
      width: $login-form-width;
        }
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       padding:2%;
   }
   .ipt, .login_register_btn{
        @media only screen and (max-width: 800px){
            width:$login-items-width * 1.8;
            font-size: 2vh;
        }
         @media only screen and (min-width: 801px) and (max-width: 1400px){
            width: $login-items-width * 1.4;
            font-size: 2vh;
        }
         @media only screen and (min-width: 1401px){
            width: $login-items-width;
            font-size: $ipt-register-font-size;
        }
        margin: 2%;
        border-radius: $login-items-border-radius;

   }
   .ipt{
        height: 10%;
   }
   .login_register_btn{
    background: #2451a3;
    border:0;
    padding:1%;
    color:white;
    padding: 10px;
    cursor:pointer;
    height: 20%;
   }
</style>
<script>
import router from "../router"
export default {
    name:"register",
    data(){
        return{
            username: '',
            password: '',
            email: '',
            errors: []
        }
    },
    methods: {
         checkForm: function(){
      this.errors = [];

      if (!this.username) {
        this.errors.push("Username required.");
      } 
      else if (this.username.length < 5)
              this.errors.push("Username must be longer or equal 5 characters.");
      else if (!isNaN(parseInt(this.username[0])))
              this.errors.push("Username cannot start with a digit");
      else if (!this.validUsername(this.username))
              this.errors.push("Username can contain only alphbet characters and digits");
      if (!this.email) {
        this.errors.push('Email required.');
      } 
      if (!this.password){
        this.errors.push('Password required.');
      }
      else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }
      if (!this.errors.length) {
        return true;
      }
    },
        validUsername(username){
           var re = /^[a-z0-9]+$/i;
           return re.test(username);
        },
        validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
       register(){
            if (this.checkForm()){
            const data = {
                username: this.username, 
                password: this.password,
                email: this.email
                };
             this.$http.post('register',data).then(()=> {
                    router.push("/login").catch(()=>{})
                }).catch(() =>{
                    this.errors.push("Is another user with that username");
                });

            }
       }
        }
}
</script>