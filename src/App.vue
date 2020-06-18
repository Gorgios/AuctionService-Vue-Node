<template>
  <div id="app">
    <Navigation/>
    <error v-if="isErr" :error="isErr"/>
    <bid-pop-up v-if="isBidPop" :name="isBidPop"/>
    <div class="content">
      <router-view></router-view>
    </div>
    </div>
</template>

<script>

import Navigation from "./layouts/Navigation";
import Error from "./components/common/Error";
import BidPopUp from "./components/offers/bids/BidPopUp"
export default {
  name: 'App',
   components: {
    Navigation,
    Error,
    BidPopUp
   },
   data(){
     return{
       error:null,
       bidPop: null
     }
   },
   created(){
    this.authorizeUser();
    this.sockets();
   },
   methods:{
     async authorizeUser(){
       await this.$http.get("/isAuth").then((response) => {
         if (response.data.isAuthenticated){
           this.$store.commit("updateUser",response.data.user);
           this.$socket.open();
         }
         else{
           this.$store.commit("updateUser",response.data.user);
         }
       }).catch((error) => {
         this.$store.commit("setError",error);
       })
     },
     sockets(){
       this.$socket.on("error_soc", (error) => {
         console.log(error);
         this.$store.commit("setError",error);
       })
       this.$socket.on("newBid", (bid) => {
                     console.log(this.$route.name);

         if (bid.bids.length > 1){
         if (bid.bids[bid.bids.length - 2].bider.username === this.$store.state.username && bid.bids[bid.bids.length - 1].bider.username !== this.$store.state.username){
            this.bidPop = bid.title;
                  this.$store.commit("setPopUp",bid.title)
            setTimeout(()=> {
              this.$store.commit("setPopUp",null)
            },5000);        
             }
         }
       })
     }
   },
    watch: {
    '$route': function(){
      this.$store.commit("setError",null);
      this.$store.commit("setPopUp",null);
    }
  },
   computed:{
     isErr(){
     return this.$store.state.error;
     },
     isBidPop(){
       return this.$store.state.bidPopUp;
     }
   }
}
</script>

<style lang="scss">
 body{
 background-color: #0f1322;
 }
</style>
