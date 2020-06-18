<template>
    <div id="user-panel">
        <div class= "btn_off_cont">
            <div class="buttons_offers">
                <button class="not_my_items" v-bind:class="getCurrType" v-on:click="switchOffers('im_bider')"> I'm bider </button>
                <button class="my_items" v-bind:class="getCurrType" v-on:click="switchOffers('im_owner')"> I'm owner </button>
            </div>
        </div>
        <div class="auctions">
            <offer-list :req="req" />
        </div>
        <div class="last_chats">
            <h3 class="user_panel_h3"> Last five chats </h3>
            <last-chats />
        </div>
    </div>
</template>

<style lang="scss">
 $buttons-font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
 $buttons-bg: #bbbbbb;
#user-panel{
       .user_panel_h3{
            align-self: center;
            font-size: 2rem;
            color: #bbbbbb;
            margin: 2%;
        }
    .last_chats{
        display: flex;
        flex-direction: column;
    }
    .auctions{
        display: flex;
        flex-direction: column;
    }
}
.not_my_items, .my_items{
      font-size: 1.5rem;
      font-family: $buttons-font-family;
      border-radius: 20px;
      background-color: $buttons-bg ;
      font-weight: bold;
      padding: 5px 15px;
      border: 0;
      margin-bottom: 3%;
      margin-top: 0;
            cursor:pointer;

}
.not_my_items.im_owner{
        background-color: rgba(187, 187, 187, 0.3);;
}
.my_items.im_bider{
        background-color: rgba(187, 187, 187, 0.3);

}
</style>
<script>
import OfferList from "../components/offers/OfferList"
import LastChats from "../components/chat/LastChats"
export default {
name:"user-panel",
components:{
    OfferList,
    LastChats
  },
data(){
    return{
        req: 'duringOffers/'
    }
},
methods:{
    switchOffers(data){
        if (data === 'im_bider')
            this.req = 'duringOffers/'
        else
            this.req = 'myOwnDuringOffers/'
    }
},
computed: {
      getCurrType(){
      if (this.req === 'duringOffers/')
        return 'im_bider'
      else
        return 'im_owner'
    }
  }
}
</script>