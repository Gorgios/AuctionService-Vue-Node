<template>
    <div id= "bid">
        <div class="bid_author">
            <p> {{bid.bider.username}} </p>
        </div>
        <div class="bid_price">
            <p> {{ bid.price + " $"}} </p>
        </div>
    </div>
</template>
<style lang="scss">
    $bid-font-size: 1vw;
    #bid {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .bid_author, .bid_price{
        font-size: 1rem;
        font-weight: bold;
    }
    .bid_author{
        align-self: flex-start;
    }
    .bid_price{
        align-self: flex-end;
    }
</style>
<script>

export default {
    name: "bid",
    props: ['bid']
}
</script>