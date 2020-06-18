const mongoose = require("../mongoose");
const Schema = mongoose.Schema;
const defaultImg = "https://promotraffic.pl/_default_upload_bucket/%C5%9Aledzenie-klikni%C4%99%C4%87-w-obrazek-z-Google-Tag-Managerem-logo-wpisu.jpg";
const auctionTypes = {
    buyNow: 'buy_now',
    auction: 'auction',
}
const OfferSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, default: ''},
    imageUrl: {type: String, default: defaultImg},
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(auctionTypes),
      default: auctionTypes.auction,
    },
    owner: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String
  },
    buyer: { 
       id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"},
      username: String,
      default: {}
  },
    bids: [{
      bider: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"},
          username: String
      },
        price: Number
    }],
    isFinished: {type: Boolean, default: false},
    endTime: {type: Date, required: true},
  }, {timestamps: true, minimize:false});

 
  const Offer = mongoose.model('Offer', OfferSchema);

  Offer.processErrors = (err) => {
    let msg = {};
    for (let key in err.errors) {
        msg[key] = err.errors[key].message;
    }
    return msg;
};

  module.exports = Offer;
