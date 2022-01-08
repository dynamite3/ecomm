import express, { response } from "express"
import Wishlist from "../models/Wishlist.js";

const router=express.Router();


router.post("/", async (req, res) => {
    const newProduct = new Wishlist(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.send(savedProduct);
    }
    catch (err) {
        res.send(err);
    }
});

router.post("/userswishlist", async (req, res) => {

    //console.log(req.body.id )
    const user = await Wishlist.find({ wishlistByuserId: req.body.id })
    
    try {
        res.send(user);
    }
    catch (err) {
        res.send(err);
    }
});

router.post("/removefromuserswishlist", async (req, res) => {

    //console.log(req.body.id )
    const user = await Wishlist.deleteOne({ _id:req.body.id })
    
    try {
        res.send(user);
    }
    catch (err) {
        res.send(err);
    }
});


export{router}