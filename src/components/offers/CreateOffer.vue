<template>
    <div id="create-offer">
        <div class="offer-form">
            <div v-if="errors" class="error">
                <p v-if="errors.length">
                      <ul>
                        <li v-for="(error,index) in errors" v-bind:key="index">{{ error }}</li>
                     </ul>
                </p>
            </div>
            <input type="text" v-model="title" placeholder="title">
            <textarea  v-model="description" placeholder="description" rows=3 />
            <input type="number" v-model="price" step="0.01" placeholder="price" min="0.01">
            <input type="url" v-model="imageUrl" placeholder="image url">
            <select v-model="type">
             <option :value="''" disabled >Select type of auction</option>
             <option v-for="(option,index) in auctionOptions" 
                     v-bind:value="option.value"
                     v-bind:key="index" >
                    {{ option.text }}
         </option>
        </select>
       <select v-model="duration">
         <option :value="''" disabled>Select duration</option>
         <option v-for="option in durationOptions" 
         v-bind:value="option.value"
         v-bind:key="option.value" >
         {{ option.text }}
         </option>
        </select>
            <button v-on:click="newOffer">NEW OFFER </button>
        </div>
    </div>
</template>
<style lang="scss">
    $ipt-offer-font-size:1.5vw;
    $offer-form-bg-color:  #bbbbbb;
    $offer-items-width: 50%;
    $offer-items-border-radius: 20px;
    $offer-form-width: 40%;
    $offer-form-height: 800px;
    $offer-font-family:  Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    ul{
        list-style-type:none;
    }
    #create-offer{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .offer-form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: $offer-form-bg-color;
         @media only screen and (max-width: 800px){
         width:$offer-form-width * 2;
        }
         @media only screen and (min-width: 801px) and (max-width: 1400px){
         width:$offer-form-width * 1.5;
        }
         @media only screen and (min-width: 1401px){
         width:$offer-form-width;
        }
        width: $offer-form-width;
        border: 0;
        border-radius: $offer-items-border-radius;
        input,textarea, button, select{
            border: 0;
                    font-family: $offer-font-family;
    
             @media only screen and (max-width: 800px){
            width: $offer-items-width * 1.8;
            font-size: 2vh;
            
        }
         @media only screen and (min-width: 801px) and (max-width: 1400px){
            width:  $offer-items-width* 1.4;
            font-size: 2vh;
        }
         @media only screen and (min-width: 1401px){
            width:  $offer-items-width;
            font-size: $ipt-offer-font-size;
        }
        margin: 2%;
        border-radius: $offer-items-border-radius;
        }
        input {
            height: 7%;
        }
        button{
               background: #2451a3;
               border:0;
               padding:1%;
               color:white;
               padding: 10px;
               cursor:pointer;
               height: 20%;
        }
    }
    .error{
        color: rgb(119, 24, 24);
        font-weight: bold;
        font-size: 1.5rem;
    }
</style>
<script>
const maxPrice = 1000000000;
export default {
    name: "createOffer",
    data(){ 
        return{
            title: '',
            description: '',
            price: '',
            imageUrl: '',
            errors: [],
            type: '',
            duration:''
        }
    },
    mounted(){
        this.error = null;
    },
    created(){
        this.error = null;
    },
    computed: {
        durationOptions(){
            return this.$store.state.durationOptions;
    },
        auctionOptions(){
            return this.$store.state.auctionOptions;
        }
    },
    methods: {
         checkForm(newPrice) {
        this.errors = [];
        let counter = 0;
        if (this.title.length < 3){
                    counter++;    
        if (!this.title) { 
            this.errors.push('Title required.');
        }
        else{
        this.errors.push('Title must be longer than 2 characters');
        }
        }
    
        
        if (!newPrice ){
            counter++;
                this.errors.push('Price required');
        }
        if (newPrice <= 0){
            counter++;
            this.errors.push('Price must be greater than 0');
        }
        if (newPrice > maxPrice){
            counter++;
            this.errors.push("Max price is " + maxPrice);
        }
        if (!this.type){
           counter++;
           this.errors.push('Type required.');
        }
        if (!this.duration){
            counter++;
            this.errors.push('Duration required')
        }
        if (counter === 0)
            return true;
        else
            return false;
    },
         newOffer(){
            let newPrice = new Number(this.price).toFixed(2);
            if (!this.checkForm(newPrice)){
                console.log("Valid failed")
            }
            else{
            const data = {
            title: this.title,
            description: this.description,
            price: newPrice,
            imageUrl: this.imageUrl,
            type: this.type,
            duration: this.duration
            };
            this.$http.post('offers',data).then( ()=>{
                this.$router.push("/").catch(() => {});
            }
            ).
            catch(() =>{
                this.$store.commit("setError","You must be logged in to create offer");
            });
            }
        }
    }
}
</script>