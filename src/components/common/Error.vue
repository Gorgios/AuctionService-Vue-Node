<template>
    <div id="error">
        <div class="err_cont">
        <div class = "error_body">
            <p class="error_message"> {{error}}</p>
        </div>
        <button class="err_btn" v-on:click="hideError">OK!</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    $bg-color-error-on: rgba(0, 0, 0, 0.5);
    $bg-color-error-body: #bbbbbb;
    $error-border: 3px solid;
    $error-border-radius: 5%;
    $error-btn-color: #2451a3;
    $error-font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    #error {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        position: fixed;
        width:100%;
        height: 100%;
        background-color:  $bg-color-error-on;
    }
    .err_cont{
    border: $error-border;
    border-color: $error-btn-color;
    border-radius: $error-border-radius;
    background-color: $bg-color-error-body;
    width: 200px;
    height: 100px;
    @media only screen and (min-width: 900px) and (max-width: 1400px) {
        width:300px;
        height: 150px;
     }
    @media only screen and (min-width: 1400px){
        width: 400px;
        height: 200px;
     }
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
    }

    .error_body{
         font-size:1.5vw;
         font-family:  $error-font-family;
         font-weight: bold;
         text-align: center;
    }
    .err_btn{
        width: 40%;
        background-color: $error-btn-color;
        font-size:2vw;
        border-radius: $error-border-radius;
        border: 0;
        font-family:  $error-font-family;
        color:white;
    }
</style>
<script>
export default {
    name: "error",
    props: ['error'],
    methods: {
        hideError(){
            this.$store.commit("setError",null);
        }
    }
}
</script>