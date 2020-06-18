<template>
    <div id="page-bar">
        <div class="bar">
            <button v-if="prev" v-on:click="prevPage()" class="page_btn" >{{prevPageString}}</button>
            <p v-if="next || prev"  class="curr_page"> {{newPage}} </p>
            <button v-if="next" v-on:click="nextPage()" class="page_btn" >{{nexPageString}}</button> 
        </div>
    </div>
</template>
<style lang="scss">
    $bg-color-page_btn: #bbbbbb;
    $page_btn-font-size: 1.2rem;
    #page-bar{
        display: flex;
        flex: 1;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .bar{
        display: flex;
        width:40%;
        justify-content: center;
        flex-direction: row;
        align-items: center;
    }
    .page_btn{
        background-color: $bg-color-page_btn;
        font-size: $page_btn-font-size;
        padding: $page_btn-font-size/3;
        cursor: pointer;
        &:hover{
           background-color: grey ;
            color: #0f1322;
        }
    }
    .curr_page{
        color:white;
        font-size: $page_btn-font-size * 1.5;
        margin: 5%;
    }
</style>
<script>
export default {
    name:"page-bar",
    props:['page','limit','prev','next'],
    data(){
        return{
            prevPageString: "<<",
            newPage: this.page,
            nexPageString: ">>"
        }
    },
    methods:{
        nextPage(){
            this.newPage ++;
            this.$emit("clicked", this.newPage)
        },
        prevPage(){
            if (this.newPage >1){
            this.newPage --;
            }
            this.$emit("clicked", this.newPage)
        }
    },
    watch: {
        page: function(newp){
            this.newPage = newp;
        }
    }
}
</script>