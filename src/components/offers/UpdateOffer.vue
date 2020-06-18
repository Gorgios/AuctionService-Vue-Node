<template>
    <div id="update-offer">
        <div class="offer-form">
            <div v-if="errors" class="error">
            <p v-if="errors.length">
                <ul>
                    <li v-for="(error,index) in errors" v-bind:key="index">{{ error }}</li>
                </ul>
             </p>
            </div>
            <input type="text" v-model="offer.title" placeholder="title">
            <textarea  v-model="offer.description" placeholder="description" rows=3 />
            <input type="number" v-model="offer.price" step="0.01" placeholder="price" min="0.01">
            <input type="url" v-model="offer.imageUrl" placeholder="image url">
            <select v-model="offer.type">
             <option :value="''" disabled >Select type of auction</option>
             <option v-for="(option,index) in auctionOptions" 
                     v-bind:value="option.value"
                     v-bind:key="index" >
                    {{ option.text }}
         </option>
        </select>
            <button v-on:click="updateOffer">UPDATE </button>
        </div>
    </div>
</template>
<style lang="scss">
    #update-offer{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
<script>
export default {
    name: "updateForm",
    data() {
        return{
            offer: [],
            errors: []
        }
    },
    created(){
        this.getOffer();
        this.sockets();
    },
      computed: {
        durationOptions(){
            return this.$store.state.durationOptions;
    },
        auctionOptions(){
            return this.$store.state.auctionOptions;
        }
    },
    methods:{
        getOffer(){
             this.$http.get("/offer/" + this.$route.params.id).then( (response) =>{
             this.offer = response.data
             }
        ).catch((error) => {
            console.log(error);
        })
        },
        checkf(newPrice) {
        this.errors = [];
        let counter = 0;
        if (this.offer.title.length < 3){
        counter++;    
        if (!this.offer.title) 
            this.errors.push('Title required.');
        else
            this.errors.push('Title must be longer than 2 characters');
        }
        if (!newPrice ) {
            counter++;
            this.errors.push('Price required');
        }
        if (newPrice <= 0){
            counter++
            this.errors.push('Price must be greater than 0');
        }
        if (!this.offer.type){
            counter++;
           this.errors.push('Type required.');
        }
        if (counter === 0)
            return true;
        else
            return false;
        },
        updateOffer(){
            let newPrice = new Number(this.offer.price).toFixed(2);
            if(!(this.checkf(newPrice))){
                console.log("Invalid form")
            }
            else{
            let data = {
            id: this.offer._id,
            title: this.offer.title,
            description: this.offer.description,
            price: newPrice,
            imageUrl: this.offer.imageUrl,
            type: this.offer.type,
            duration: this.offer.duration
            }
            this.$socket.emit("update",data);
        }
        },
        sockets(){
            this.$socket.on("updated", (offer) => {
                this.offer = offer;
                this.$router.push("/").catch(()=> {});
            })
        }
    }
}
</script>