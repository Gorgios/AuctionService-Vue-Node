<template>
    <div id="offer-list">
        <div class="offers" v-bind:class="offers_class">
          <div class="offer"
            v-for="(offer,index) in results.results"
            v-bind:item ="offer"
            v-bind:index="index"
            v-bind:key="offer._id">
            <item :item="offer"/>
          </div>
          </div>
         <page-bar @clicked="onPageChange" :page="currPage" :limit="limit" :prev="results.previous" :next="results.next" />
    </div>

</template>
<style lang="scss">
 .nice_h3{
       color:#bbbbbb;
       align-self: center;
       font-size: 2rem;
       margin-top: 0;
     }
 #offer-list{
     display: flex;
     flex-direction: column;
 }

 .offers{
    display: grid;
    align-items: start;
    justify-content: space-around;
    align-content: center;
}
     @media only screen and (min-width: 900px) and (max-width: 1400px) {
       .offers_3{
          grid-template-columns: repeat(2, 1fr);
       }
       .offers_2{
          grid-template-columns: repeat(1, 1fr);
       }
     }
     @media only screen and (min-width: 1400px){
      .offers_3{
          grid-template-columns: repeat(3, 1fr);
       }
      .offers_2{
          grid-template-columns: repeat(2, 1fr);
       }
      .offers_1{
          grid-template-columns: repeat(1, 1fr);
       }
     }
.offer{
    display: flex;
    justify-content: center;
    align-items: center;

}   


</style>
<script>
import Item from "./Item"
import PageBar from "../common/PageBar"
export default {
  props: ['page', 'limit', 'req'],

data(){
    return{
        results: {},
        currPage: '',
        offers_class: 'offers_3'
    }
},

 components:{
    Item,
    PageBar
  },
  created(){
      this.currPage = this.page;
      this.getAll();
  },
  methods: {
   getAll(){
      if (this.req === "duringOffers/" && this.req === "myOwnDuringOffers/"){
        this.$http.get(this.req).then( (res) =>{
          this.results = res.data;
      }).catch((err) => {
          alert(err.message)
      })}

      else{
      this.$http.get(this.req , {
          params: {
          page: this.currPage,
          limit: this.limit
          }
      }).then( (res) =>{
          this.results = res.data;
      }).catch((err) => {
          alert(err.message)
      })}},
    onPageChange(page) {
      this.currPage = page; // someValue
    },
    getClass(){
      if (this.results.results.length === 1)
       this.offers_class = "offers_1";
      else if (this.results.results.length === 2)
       this.offers_class = "offers_2";
      else
       this.offers_class = "offers_3";
    }
  },
   watch: { 
    currPage: function() { // watch it
        this.getAll();
        },
    req: function(){
      this.currPage = 1;
      this.getAll();
    },
    results: function(){
      this.getClass();
    }
   },
}
</script>