import express, { response } from "express"
import Cart from "../models/Cart.js"

const router=express.Router();


router.post("/", async (req, res) => {
    const newCart = new Cart(req.body);
  
    try {
      const savedCart = await newCart.save();
      res.send(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  router.put("/:id", async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.send(updatedCart);
    } catch (err) {
        res.send(err);
    }
  });
  
  //DELETE
  router.delete("/:id", async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.send("Cart has been deleted...");
    } catch (err) {
        res.send(err);
    }
  });
  
  //GET USER CART
  router.get("/find/:userId", async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.send(cart);
    } catch (err) {
        res.send(err);
    }
  });


export{router}