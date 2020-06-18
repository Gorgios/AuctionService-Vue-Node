<template>
    <div id="item" v-bind:class="getClass + getFinishClass">
            <div class="picture">
                <img v-bind:src="item.imageUrl" />
            </div>
            <div class="title" v-bind:class="getFinishClass">
            <h3 class="title_text">{{offer.title}}</h3>
            </div>
            <div class="price" v-bind:class="getFinishClass">
                <p class ="price_text"> {{offer.price + " $"}} </p>
                 <template v-if="offer.type==='auction' && !(offer.isFinished) && getUsername() && getUsername()!==offer.owner.username">
                    <div class="bid_offer">
                        <input class="price_input" type="number" v-model="bidPrice" step="0.01" min="item.price" >
                        <button class="btn_bid" v-on:click="bidOffer(bidPrice)"> Bid </button>
                    </div>
                </template>
                 <template v-else-if="offer.type==='buy_now' && !(offer.isFinished) && getUsername() && getUsername()!==offer.owner.username">
                    <div class="buy_now">
                        <button class="btn_bid" v-on:click="buyNow()">Buy now</button>
                    </div>    
                </template>
                <template v-else>
                    <div class="offer_status">
                        <p class="offer_status_p">{{getStatus}}</p>
                    </div>    
                </template>
            </div>
        <div class="item_body" v-bind:class="getFinishClass"> 
        <div class="bids_desc_buttons">
            <button v-if="offer.type==='auction'" class="btn_bid" v-on:click="getBids()">Show last 5 bids</button>
            <button class="btn_bid" v-on:click="getDesc()"> Description </button>
        </div>
        <div class="last_bids" v-if="offer.type==='auction' && showBids">
            <bid-list :bids="offer.bids"/>
        </div>
        <div class="description" v-if="showDesc">
            <p>{{offer.description}}</p>
        </div>
        <div class="owner">
            <p class="owner_text">Owner : {{offer.owner.username}} </p>
            <button class="btn_bid" v-if="getUsername()!== offer.owner.username" v-on:click="chat(offer.owner)"> Send message </button>
            <button class="btn_update" v-if="offer.owner.username === getUsername() &&  wasBided()" v-on:click="updateOffer()"> Update offer </button>
        </div>
        <item-time :id="offer._id" :time="offer.endTime" :isFinished="offer.isFinished"/>
        </div>
    </div>
</template>


<style lang="scss" >
    $bg-color-item: rgb(187, 187, 187);
    $bg-color-item-body:  rgb(204, 203, 203);
    $bg-color-item-finished: rgba(187,187,187,0.7);
    $bg-color-item-body-finished: rgba(204, 203, 203, 0.7);
    $button-color: rgb(36, 81, 163);
    $button-color-finished: rgba(36, 81, 163,0.7);
    $item-elements-width: 80%;
    $item-border-radius: 20px;
    $item-font-size: 1.1rem;
    $item-font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    $item-image-width: 380px;
    img {
        height: 200px;
        width: $item-image-width;
        padding: 1rem ;
        object-fit: fill;
        border-radius: $item-border-radius;
    }
    #item{
    border-radius: $item-border-radius;
    background-color:$bg-color-item;
    max-width: $item-image-width * 1.2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 4px solid ;
    }
    #item.bided{
        border: 4px solid red ;
    }
    #item.bided_me{
        border: 4px solid green ;
    }
    #item.finished{
        background-color: $bg-color-item-finished;
     }
  .title{
      display: flex;
      width:  $item-elements-width;
      border-radius: $item-border-radius;
      justify-content: center;
      align-items: center;
      background-color: $bg-color-item-body;
  }
  .title_text{
      margin: 0;
     font-size: 1.8rem;
  }
 .price{
     margin:10px 0 0 0;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     width: 80%;
     background-color:$bg-color-item;
     border-radius: $item-border-radius;
    
 }
.price_text{
    font-size: $item-font-size + 0.3rem;
      font-family: $item-font-family;
    object-fit: contain;
    padding: 0;
    margin: 15px;
    font-weight: bold;

}
.description{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 80%;
}
.bid_offer, .buy_now{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.item_body{
    display:flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem;
    border-radius:$item-border-radius ;
    width: $item-elements-width;
    background-color:$bg-color-item-body ;
    justify-content: center;
    align-items: center;
        .bids_desc_buttons{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            width: 100%;
        }
        .owner{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
                 .owner_text{
                      font-size:   $item-font-size;
                      font-weight: bold;
                        font-family: $item-font-family

      }
        }
}
.item_body.finished{
    background-color:   $bg-color-item-body-finished;
}
.price.finished{
    background-color:   $bg-color-item-body-finished;
}
.title.finished{
    background-color:   $bg-color-item-body-finished;
}
.last_bids{
    width: 60%;
}
.price_input{
    margin:10px;
    border-radius: 20px;
    border:2px solid rgb(119, 117, 117);
    font-size:  $item-font-size;
    font-family: $item-font-family;
}
.btn_bid, .btn_update{
    border-radius: 20px;
    background: $button-color;
    border:0px;
    font-size:   $item-font-size;
    color:white;
    padding: 10px;
    cursor:pointer;
}
.offer_status_p{
    font-weight: bold;
}
.finished{
    button{
        background-color: $button-color-finished;
    }
}
.description{
    width:80%;
}

</style>
<script>
import BidList from "./bids/BidList"
import ItemTime from "./ItemTime"
const maxPrice = 1000000000;
export default {
    name: 'item',
    props:{
        item: Object,
    },
    components:{
        BidList,
        ItemTime
    },
    data(){
        return{
            offer: this.item,
            error: null,
            bidPrice: '',
            showBids: false,
            showDesc: false,
            status: "",
            bided: null,
            lastBider: null
        }
    },
    created() {
        this.bidSockets();
        this.error = null;
    },
    methods:{
         chat(user){
          const data = {
              user: {
                  _id: user.id,
                  username: user.username
              }
          }
          this.$http.post("chat", data).then (response => {
              this.$router.push({ name: 'chatPanel', params: {chat_id: response.data._id }}).catch(()=>{})
          }).catch((err) =>{
                 if (err.response.status === 403){
                  this.$router.push("/login").catch(()=>{})
              }
          });
      },
        bidOffer(price){
            let newPrice = new Number(price).toFixed(2);
            if (newPrice > maxPrice){
                this.$store.commit("setError","Max bid is " + maxPrice);
            }
            else{
            let data = {
                price: newPrice,
                id: this.offer._id,
                bids: this.offer.bids
            }
             this.$socket.emit("bid",data);
            }
        },
        buyNow(){
            this.$socket.emit("buy",this.offer._id);
        },
        updateOffer(){
            this.$router.push("updateOffer/" + this.offer._id);
        },
        getUsername(){
            return this.$store.state.username;
        },
        wasBided(){
            return (this.offer.bids.length === 0) && !(this.offer.isFinished)
        },
        bidSockets(){
            this.$socket.on("newBid", (data) => {
                if (this.offer._id === data._id){
                    this.offer = data;
                    this.lastBider = data.bids[data.bids.length - 1].bider.username;
                    this.getBided();
                }
            });
            this.$socket.on("oldBid", () => {
                this.$store.commit("setError","Current price is higher than your bid !");
            });
            this.$socket.on("bought", (data) => {
                if (this.offer._id === data._id)
                    this.offer = data;
            });
            this.$socket.on("finished", (id) => {
                if (this.offer._id === id){
                    this.offer.isFinished = true;
                }
            });
            this.$socket.on("updated", (data) =>{
                if (this.offer._id === data._id)
                    this.offer = data;
            });
        },
        getBids(){
            if (this.showDesc)
                this.showDesc = false;
            this.showBids = !(this.showBids)
        },
        getDesc(){
         if (this.showBids)
            this.showBids = false;
            this.showDesc = !(this.showDesc)
        },
        getBided(){
           var counter = 0;
           var interval = setInterval(() => {
             this.bided = !(this.bided);
             counter++;
              if (counter === 6){
                clearInterval(interval);
              }  
            }, 300); 
        }
        
    },
    computed: {
         getStatus(){
            if (this.offer.isFinished === true){
                if (Object.keys(this.offer.buyer).length !== 0){
                    return "Offer bought by " + this.offer.buyer.username;
                }
                else{
                    return "Offer finished";
                }
            }
            else {
                if (this.offer.type === "buy_now")
                    return "Item not sold yet";
                else{
                    if (this.offer.bids.length !== 0)
                        return "Current winner: " + this.offer.buyer.username;
                    else
                        return "No offers yet";
                }
            }
        },
           getClass(){
            if (this.bided && this.lastBider === this.$store.state.username){
                return "bided_me";
            }
            else if (this.bided){
                return "bided";
            }
            else{
                return "";
            }
        },
            getFinishClass(){
                if (this.offer.isFinished)
                    return "finished"
                else
                    return ""
            }
    }

}
</script>