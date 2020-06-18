<template>
    <div id="message">
        <div v-bind:class="getClass()">
            <div class="mess_box"><p class="mess_text">{{message.message}}</p></div>
         <!--   <div> <p class="mess_date">{{message.date}}</p></div> -->
    </div>
    </div>
</template>

<style lang="scss">
$mess-font-size: 1.2rem;
$mess-font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
.my,
.him {
  width: 100%;
  border: none;
  display: flex;
  flex-direction: column;
}
.mess_text{
    font-size: $mess-font-size;
    font-family: $mess-font-family;
    font-weight: bold;
    color: black;
    padding:0  $mess-font-size/2 ;
    margin: $mess-font-size/4;
}
.mess_date{
        font-size: $mess-font-size/2;
        font-family: $mess-font-family;
        color: black;
}
.mess_box{
     border-radius: 20px;
     margin:1%;
     padding: 1%;
     max-width: 70%;
}
.him {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
    .mess_box{
             background-color: #5d9c49;
    }
  text-align: left;  
}
.my {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
align-items: flex-end;
    .mess_box{
             background-color: #387299;
    }
      text-align: left;

}
</style>

<script>
export default {
    name:'message',
    props:['message'],
    methods:{
        getClass(){
        if (this.message.writeBy === this.$store.state.username)
            return "my";
        else
            return "him";
        }
    }
}
</script>