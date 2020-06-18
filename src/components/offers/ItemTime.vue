<template>
    <div id="item-time">
         <p class ="time_text"> {{time_to_end}} </p> 
    </div>
</template>

<script>
export default {
    name:"item-time",
    props:['id','time','isFinished'],
    data(){
        return{
            time_to_end: ''        }
    },
    mounted(){
        this.getTime();
         this.interval = setInterval(() => {
        this.getTime();
    },  1000);
    },
    methods: {
        getTime(){
            let date = new Date(this.time).getTime();
            let now = new Date().getTime();
            let diff = date - now;
            let days = Math.floor(diff / (1000 * 60 * 60 * 24));
            let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((diff % (1000 * 60)) / 1000);
            let duration = "Expire in ";
            if (this.isFinished){
                  duration = "Auction finished :" + new Date(this.time).toUTCString().slice(0,-3);
            }
            else if (days > 0)
                duration +=  days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ";
            else if (hours > 0)
                duration +=  hours + " hours " + minutes + "minutes " + seconds + " seconds ";
            else if (minutes > 0)
                duration += minutes + " minutes " + seconds + " seconds ";
            else if (seconds > 0)
                 duration += seconds + " seconds ";
            else {
                 duration = "Finished at " + new Date(this.time).toUTCString();
                 this.$socket.emit("finish",this.id);
                 clearInterval(this.interval)
            }
            this.time_to_end = duration;
            }
        },
}
</script>