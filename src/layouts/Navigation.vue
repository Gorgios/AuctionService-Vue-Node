<template>
  <div id="navigation">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <template v-if="username">
          <li><router-link to="/userPanel"> User panel</router-link></li>
      <li><router-link to="/createOffer">New Offer</router-link></li>
      <li><router-link to="/chatPanel"> Chat </router-link></li>
      <li><router-link :to="{ path: '/myOffers', query: { page: 1, limit: 3}}"> Auction history</router-link></li>
      <li v-on:click="logout">Logout </li>
      </template>
      <template v-else>
      <li><router-link  to="/login">Login</router-link></li>
      <li><router-link to="/register">Register</router-link></li>
      </template>
    </ul>
  </div>
</template>

<script>

export default {
   methods: {
            logout(){
                this.$http.get("/logout").then( ()=> {
                    this.$store.commit("updateUser",null);
                    this.$socket.close();
                    this.$router.push("/").catch(()=> {});
                }
                );
            }
   },
   computed: {
            username() {
                return this.$store.state.username;
            }
        }
};
</script>

<style lang="scss" scoped>
$bg-color:#bbbbbb;
$bg-color-hover:grey;
$text-color:black;
#navigation {
  
  width: 100%;
  height:70px;
  margin: 0;
  position: relative;
  margin-bottom: 50px;
  
  ul {
    display: flex;
    flex:1;
    height: 100%;
    list-style: none;
    margin:0;
    align-content: center;
    padding: 0;
    justify-content: space-around;

    
    background-color: $bg-color;
    li {
          font-weight: bold;

      display: flex;
      align-items: center;
    @media only screen and (max-width: 800px){
      font-size: 1rem;
    }
     @media only screen and (min-width: 800px){
      font-size: 1.5rem;
    }
      height: 100%;
      cursor: pointer;
      &:hover {
        background-color: $bg-color-hover ;
        color: #7ca971;
      }
    }
  }
  a{
    text-decoration: none;
    color:$text-color;   
  }
}
</style>