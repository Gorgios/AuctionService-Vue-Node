<template>
    <div id="bid-pop-up">
        <div class="pop_up_cont">
            <p> Outbid on auction: {{name}}</p>
            <div class="pop_up_btns">
                <button v-if="canShowButton()" v-on:click="goToPanel"> Go to current auctions </button>
                <button v-on:click="ignore"> OK</button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    #bid-pop-up{
        display:flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100%;
    }
    .pop_up_cont{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: bold;
        font-family: 'Courier New', Courier, monospace;
        color:white;
        border-radius: 20px;
        border: 0;
        background-color: rgba(15, 19, 34,0.6);
    }
    .pop_up_btns{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        button{
            font-size: 1.2rem;
            background-color: rgba(36, 81, 163,0.7) ;
            border-radius: 25px;
            color:rgba(255, 255, 255,0.7);
            border: 0;
        }
    }
</style>
<script>
export default {
    props: ['name'],
    methods: {
        goToPanel(){
            this.$router.push("/userPanel").catch(()=> {});
        },
        canShowButton(){
            if (this.$route.name === "userPanel"){
                return false;
            }
            return true;
        },
        ignore(){
            this.$store.commit("setPopUp",null);
        }
    }
}
</script>