<template>
    <div id="bid-list">
        <div class="bids" v-for="(bid,index) in lastFive"
            v-bind:item ="bid"
            v-bind:index="index"
            v-bind:key="index">
            <bid :bid="bid"/>
        </div>
    </div>
</template>
<style lang="scss">
    #bid-list{
        width:100%;
    }
</style>
<script>
import Bid from "./Bid";
export default {
    name:"bid-list",
    props: ['bids'],
    components: {
        Bid
    },
    computed: {
        lastFive(){
         let allBids = this.bids;
         if (allBids.length < 5){
             return allBids.reverse();
         }
         let lastFiveBids = allBids.slice(Math.max(allBids.length - 5, 1));  
            return lastFiveBids.reverse();
        }
    }
}
</script>