<template>
    <div id="my-offers">
      <div class= "btn_off_cont">
       <div class="buttons_offers">
         <button class="bought_items" v-bind:class="getCurrType" v-on:click="switchOffers('bought')"> Bought </button>
         <button class="sold_items" v-bind:class="getCurrType" v-on:click="switchOffers('sold')"> Sold </button>
       </div>
      </div>
       <offer-list :page="page" :limit="limit" :req="req" />
    </div>
</template>
<style lang="scss">
 $buttons-font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
 $buttons-bg: rgb(187, 187, 187);
  .btn_off_cont{
    width: 100%;
     display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .buttons_offers{
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .sold_items, .bought_items{
      font-size: 1.5rem;
      font-family: $buttons-font-family;
      border-radius: 20px;
      background-color: $buttons-bg ;
      font-weight: bold;
      padding: 5px 15px;
      border: 0;
      margin-bottom: 3%;
      cursor:pointer;
    }
     .sold_items.bought{
        background-color: rgba(187, 187, 187, 0.3);;
      }
    .bought_items.sold{
       background-color: rgba(187, 187, 187, 0.3);;

    }
  }
</style>
<script>
import OfferList from "../components/offers/OfferList"
export default {

 data(){
    return{
      error: null,
      page: '',
      limit: '',
      req: 'myBoughtOffers'    }
  },
  created(){
    this.limit = this.$store.state.limit;
    this.page = 1
  },
  methods: {
    switchOffers(temp){
      if (temp === 'bought')
        this.req = "myBoughtOffers";
      else if (temp === 'sold')
        this.req = "mySoldOffers";
    },
  },
  computed: {
      getCurrType(){
      if (this.req === 'myBoughtOffers')
        return 'bought'
      else
        return 'sold'
    }
  },
  components:{
    OfferList,
  }
}
</script>