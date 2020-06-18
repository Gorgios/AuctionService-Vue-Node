<template>
<div id="home">
    <offer-list :page="page" :limit="limit" :req="'offers/'" />
</div>
</template>
<style lang="scss">
  
</style>
<script>
import OfferList from "../components/offers/OfferList"
export default {
  name: 'Home',
  data(){
    return{
      error: null,
      page: '',
      limit: '',
    }
  },
  created(){
    this.limit = this.$store.state.limit;
    this.page = 1
  },
  components:{
    OfferList,
  }
}
</script>

