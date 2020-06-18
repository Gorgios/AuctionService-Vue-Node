<template>
<div id="users">
      <h3 > Users</h3>
     <div class="users_cont">
     <div class="user"
            v-for="(user,index) in getUsers"
            v-bind:item ="user"
            v-bind:index="index"
            v-bind:key="user.id">
            <user @clicked="goChatWith" v-if="user.username !== getUsername" :user="user" />
     </div>
     </div>
         <page-bar @clicked="onPageChange" :page="currPage" :limit="limit" :prev="results.previous" :next="results.next" />
 </div>
</template>
<style lang="scss">
    #users{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 500px;

         @media only screen and (max-width: 1000px) {
             width: 300px;
         }
        height: 100%;
         h3{
               margin-top: 0;
        font-size: 2rem;
        color: #bbbbbb;
    }
    .users_cont{
          display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 20px;
        width: 100%;
    }
    }
    .user{
        display: flex;
        width: 100%;
        flex-direction: column;
    }
</style>
<script>
import PageBar from "../common/PageBar"
import User from "./User"
export default {
 name: 'users',
 props: ['page','limit'],
 data(){
     return{
         results: {},
         currPage: ''
     }
 },
 components: {
     User,
     PageBar
 },
 created(){
    this.currPage = this.page;
      this.getAll();
  },
 methods: {
      getAll(){
      this.$http.get("users/" , {
          params: {
          page: this.currPage,
          limit: this.limit
          }
      }).then( (res) =>{
          this.results = res.data;
      }).catch((err) => {
          alert(err.message)
      })},
       onPageChange(page) {
          this.currPage = page; 
    },
    goChatWith(id){
        this.$emit("goChat",id);
    }
    },
   watch: { 
    currPage: function() { 
        this.getAll();
        }
   },
  computed: {
    getUsers(){
        return this.results.results;
    },
    getUsername(){
        return this.$store.state.username;
    }
  }
}
</script>
