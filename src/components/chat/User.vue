<template>
    <div id="user">
        <div class="user_cont">
            <p class= "p_username"> {{user.username}} </p>
            <button v-on:click="chat(user)" class="user_btn"> chat </button>
        </div>
    </div>
</template>

<style lang="scss">
    $user-font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    #user{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    .user_cont{
        display: flex;
        width:80%;
        height: 60px;
        align-items: center;
        justify-content: space-between;
        background-color: #bbbbbb;
        border: 0;
        border-radius: 25px;
        margin:1.5%;
    }
    .p_username, .user_btn{
        font-family: $user-font-family;
    }
    .p_username{
        max-width: 30%;
        font-size: 1.5vh;
        font-weight: bold;
        margin: 1%;

    }
    .user_btn{
        background: #2451a3;
        border:0;
      //  border-radius: 25px;
        padding:1%;
        color:white;
        padding: 10px;
        cursor:pointer;
        font-size: 1.5vh;
        height: 100%;
        max-width: 30%;
    }
</style>

<script>
export default {
    name: "user",
    props: ['user'],
    methods: { 
        chat(user){
          const data = {
              user: user
          }
          this.$http.post("chat", data).then (response => {
              this.$emit("clicked", response.data._id);
          }).catch((err) =>{
              console.log(err);
          });
      }}
}
</script>