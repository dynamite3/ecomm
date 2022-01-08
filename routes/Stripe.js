import express, { response } from "express"

import Stripe from "stripe";

const stripe = Stripe('sk_test_51KARhtSHQxcjbnPLpJhYzHfEd9C6QQqEHRdXz0NeEmQZI6k0YFmmR5Wo2ItS6w1ycsTQBeMBgCTyOaLTrWVVuBmH00owTCqF43');

const router=express.Router();

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "INR",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

export{router}