const CryptoJS = require("crypto-js");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router();


router.post("/", verifyToken, async(req, res)=>{
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try{
       const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
         $set:req.body
       },{new:true});
     res.status(200).json(updatedCart);
     }
    catch(err){
        res.status(500).json(err);
    }
 });

 router.delete("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Products deleted...")
    }catch(err){
       res.status(500).json(err)
    }
  })

router.get("/:userId",verifyTokenAndAuthorization ,async(req, res)=>{
    try{
        const cart = await Cart.findOne({userId:req.params.userId});
        res.status(200).json(cart);
    }catch(err){
       res.status(500).json(err);
    }
  });

  router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    try{
    const carts = await Cart.find()
    res.status(200).json(carts);
    }catch(err){
       res.status(500).json(err)
    }
  })


  
module.exports = router;