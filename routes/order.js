import express, { response } from "express"
import Order from "../models/Order.js"

const router=express.Router();

router.post("/", async (req, res) => {

  //console.log(req.body)
    const newOrder = new Order({
        transcationinfo:req.body.transcation,
        transcationBy:req.body.foruser,
        transcationOf:req.body.items
    });
  
    try {
      const savedOrder = await newOrder.save();
      res.send(savedOrder);
    } catch (err) {
        res.send(err);
    }
  });


  router.post("/usershistory", async (req, res) => {

      console.log(req.body)
      
      try {
        const savedOrder = await Order.find({"transcationBy._id" : req.body.id});
        res.send(savedOrder);
      } catch (err) {
          res.send(err);
      }
    });
  
  //UPDATE
  router.put("/:id", async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.send(updatedOrder);
    } catch (err) {
        res.send(err);
    }
  });
  
  //DELETE
  router.delete("/:id", async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.send("Order has been deleted...");
    } catch (err) {
        res.send(err);
    }
  });
  
  //GET USER ORDERS
  router.get("/find/:userId", async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.send(orders);
    } catch (err) {
      res.send(err);
    }
  });
  
  // //GET ALL
  
  router.get("/", async (req, res) => {
    try {
      const orders = await Order.find();
      res.send(orders);
    } catch (err) {
        res.send(err);
    }
  });
export{router}