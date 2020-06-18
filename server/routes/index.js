const express = require("express");
const router = new express.Router();
const User = require("../model/user");
const passport = require("../passport");
const bcrypt = require("../bcrypt");
const Offer = require("../model/offer");
const Chat = require("../model/chat");
const deafaultUrl = "https://i.wpimg.pl/730x0/m.autokult.pl/mercedes-500e-67b05d265e8a30f129.jpg";
//middleware
const midAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(403).json({
          message: "not authenticated"
      });
    }
  };

function paginatedResult(model,firstSortSystem,secondSortSystem, firstDescSystem, secondDescSystem) {
    return async (req, res, next) => {

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results = {}
        if (endIndex < await model.countDocuments().exec()) {
          results.next = {
            page: page + 1,
            limit: limit
          }
        }
        
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }
        try {
          results.results = await model.find().sort([[firstSortSystem,firstDescSystem]]).sort([[secondSortSystem,secondDescSystem]]).limit(limit).skip(startIndex).exec()
          res.paginatedResults = results
          next()
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      }
}

const rejectMethod = (_req, res, _next) => {
    res.sendStatus(405);
};

//endpoints

router
    .route("/isAuth")
    .get((req, res) => {
        res.json({
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    })
    .all(rejectMethod);

router
    .route("/login")
    .post(passport.authenticate("local"), async (req, res) => {
        res.status(200).json({
            message: "success",
            user: req.user
        })
    })
    .all(rejectMethod);

router
    .route("/logout")
    .get((req,res,next) => {
        req.logout();
        req.session.destroy(function (err) {
            if (err) { return next(err); }
            return res.send({ authenticated: req.isAuthenticated() });
          });
    })
    .all(rejectMethod);

router
    .route("/register")
    .post(async (req, res) => {
        try {
            let passwordHash = bcrypt.hash(req.body.password);
            let user = new User({
                username: req.body.username,
                password: passwordHash,
                email: req.body.email
            });
            let doc = await user.save();
            res.json(doc);
        } catch (err) {
            if (!req.body.password) {
                res.status(422).json({
                    password: "Error – password must not be empty!"
                });
            } else {
                res.status(422).json(User.processErrors(err));
            }
        }
    })
    .all(rejectMethod);

router
    .route("/offers")
    .get(paginatedResult(Offer,'isFinished', 'updatedAt', 1, -1),(req,res) =>{   
        res.json(res.paginatedResults);
    })
    .post(midAuth,async (req,res) =>{
        let user = req.user;
        let body = req.body;
        if (body.imageUrl === ""){
            body.imageUrl = deafaultUrl;
        }
        var time = getTime(body.duration);
        const offer =new Offer({
            title: body.title,
            description: body.description,
            imageUrl: body.imageUrl,
            price: body.price,
            type: body.type,
            owner: {
                id: user.id,
                username: user.username
            },
            buyer: {},
            bids: [],        
            endTime: time,
            isFinisherd: false
          });
          try{  
      let doc = await offer.save();
      res.status(200).json(doc);
    }
      catch(err){
            console.log(err.message);
            res.status(422).json(err.message)
      }
    })
    .all(rejectMethod);
router.
    route("/mySoldOffers")
    .get(midAuth, async (req,res) => {
        let _id = req.user.id;
        
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results = {}
    
        if (endIndex < await Offer.countDocuments({
             $and: [ { "owner.id": _id},  {isFinished:true} ] 
          }).exec()) {
          results.next = {
            page: page + 1,
            limit: limit
          }
        }
        
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }
        try {
          results.results = await Offer.find({
            $and: [ { "owner.id": _id},  {isFinished:true} ] 
          }).sort([['updatedAt',-1]]).limit(limit).skip(startIndex).exec();
          res.json(results);
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
    }).all(rejectMethod);
router.
    route("/myBoughtOffers")
    .get(midAuth, async (req,res) => {
        let _id = req.user.id;
        
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results = {}
    
        if (endIndex < await Offer.countDocuments({
             $and: [ { "buyer.id": _id},  {isFinished:true} ] 
          }).exec()) {
          results.next = {
            page: page + 1,
            limit: limit
          }
        }
        
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }
        try {
          results.results = await Offer.find({
            $and: [ { "buyer.id": _id},  {isFinished:true} ] 
          }).sort([['updatedAt',-1]]).limit(limit).skip(startIndex).exec();
          res.json(results);
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
    }).all(rejectMethod);
router.
    route("/duringOffers")
    .get(midAuth, async (req,res) => {
        let _id = req.user.id;
        const results = {};
        try {
          results.results = await Offer.find({
            $and: [
                {"bids.bider.id": _id },
                {isFinished:false}
          ]
          }).sort([['updatedAt',-1]]).exec();
          res.json(results);
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
    }).all(rejectMethod);
router.
    route("/myOwnDuringOffers")
    .get(midAuth, async (req,res) => {
        let _id = req.user.id;
        const results = {};
        try {
          results.results = await Offer.find({
            $and: [
                {"owner.id": _id },
                {isFinished:false}
          ]
          }).sort([['updatedAt',-1]]).exec();
          res.json(results);
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
    }).all(rejectMethod);
router.
    route("/offer/:id").
    get( async (req,res) => {
        let _id = req.params.id;
        await Offer.findById(_id, (err,offer) => {
            if (err){
                res.status(400).json({
                    error: "Offer not found"
                })
            }
            else{
                res.send(offer);
            }
        })
    })
router
    .route("/users")
    .get(paginatedResult(User,'username'),(req,res) => {
        res.json(res.paginatedResults);
    })
    .all(rejectMethod);

router
    .route("/chat") 
    .post(midAuth, async (req, res) => {
        try{
        const user1 = {
            id: req.body.user._id,
            username: req.body.user.username
        }
        const user2 = {
            id: req.user.id,
            username: req.user.username
        }

       Chat.findOne(
            {
                $or: [
                    {$and: [{user1: user1.id}, {user2: user2.id}]},
                    {$and: [{user1: user2.id}, {user2: user1.id}]},
                  ]
            }, async (err, result) => {
                if (!result) {
                    result = new Chat({
                    messages: [],
                    user1: user1.id,
                    username1: user1.username,
                    user2: user2.id,
                    username2: user2.username    
                });
                await result.save();
              }
              res.json(result)
        })}
        catch(err){
            console.log(err);
        }})
        .all(rejectMethod);

router.
    route("/chat/:id")
    .get(midAuth, async(req,res) => {
        let _id = req.params.id;
        await Chat.findById(_id, (err,chat) => {
            if (err){
                res.status(400).json({
                    error: err.message
                })
            }
            else{
                res.status(200).json(chat);
            }
        })
    }).all(rejectMethod);
router.
    route("/lastChats")
    .get(midAuth, async(req,res) => {
        let _id = req.user.id;
        try{
        const chats = await Chat.find( {
            $and: [{$or: [
                {user1: _id},
                {user2: _id}
              ]},{"messages.0": { "$exists": true }}]
        }).sort([['updatedAt',-1]]).limit(5).exec(); 
        res.json(chats);
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}).all(rejectMethod);
        

module.exports = router;

// private functions

const getTime = (duration) =>{
    var d = new Date();
    d = new Date(d.getTime() + duration * 1000);
    return d;
 }
 
