const Offer = require("../model/offer");
const bidSockets = (socket,io) => {
    socket.on("test", (id) =>{
        io.sockets.emit("testBid", id)
    });
    socket.on("bid", async (data) => {
        let _id = data.id;
        let price = data.price;
        let user = {
            id: socket.request.user.id,
            username: socket.request.user.username
        }
        let new_bid = {
            bider: user,
            price: price
        }

        let update = {
            "price": price,
            "buyer": user,
            "$push": { "bids": new_bid }
        }
        let filter ={
            "_id": _id,
            "price" :{ "$lt": price},
            "isFinished": false
        }

        await Offer.findOneAndUpdate(filter,update, {new:true}, (err,offer) => {
                if (err){
                    socket.emit("error_soc", "Something wrong, try again")
                }
                else if (!offer){
                    socket.emit("oldBid");
                }
                else{
                    io.sockets.emit("newBid",offer);
                }
        });
    });
        socket.on("update", async (data) => {
            let update = {
                'title' : data.title,
                'description': data.description,
                'imageUrl' : data.imageUrl,
                'price' : data.price,
                'type' : data.type,
            }
            let filter = {
                "_id": data.id,
                "buyer": {}
            }
         await Offer.findOneAndUpdate(filter, update, {new: true} , (err, offer) => {
            if (err){
                socket.emit("error_soc", "Offer not found")
            }
            else if (!offer){
                socket.emit("error_soc", "Auction already started")
            }
            else{    
                io.sockets.emit("updated",offer);
            }})
    });
        socket.on("buy", async (_id) => {
            let user = {
                id: socket.request.user.id,
                username: socket.request.user.username
            };
            let filter ={
                '_id': _id,
                'isFinished': false
            };
            let update = {
                'buyer':user,
                'isFinished': true,
                'endTime': new Date()
            };
            await Offer.findOneAndUpdate(filter,update, {new:true}, (err,offer) => {
                if (err){
                    socket.emit("error_soc", "Someone was faster");
                }
                else if (!offer){
                    socket.emit("error_soc", "Someone was faster");
                }
                else{
                    io.sockets.emit("bought",offer);
                }
            });
        });
        socket.on("finish", (_id) => {
            Offer.findById(_id, async (err,offer) => {
                try{
                    if (err){
                        console.log(err);
                    }
                    else{
                        if (offer.isFinished === false){
                        offer.isFinished = true;
                        offer.endTime = new Date();
                        await offer.save();
                        io.sockets.emit("finished", _id);
                        }
                    }   
                }
                catch(error){
                   socket.emit("error_soc",error.message);
                }
            });
        });
}
module.exports = bidSockets;