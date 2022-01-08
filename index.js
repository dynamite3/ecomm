import express, { request, response } from"express";

import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { router as userRouter } from "./routes/user.js";
import { router as authRouter } from "./routes/auth.js";
import { router as productRouter } from "./routes/product.js";
import { router as cartRouter } from "./routes/cart.js";
import { router as orderRouter } from "./routes/order.js";
import { router as wishlistRouter} from "./routes/wishlist.js"
import { router as stripeRouter } from "./routes/Stripe.js";

const app=express();
dotenv.config();

const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL

app.use(cors())
app.use(express.json());

mongoose.connect(
    MONGO_URL
)
.then(()=>console.log("connected to db"))
.catch((err)=>console.log(err))

app.listen(PORT,()=>console.log("server started"))

app.get("/",(request,response)=>{
    response.send("Hello from Express JS")
})


app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)
app.use("/order", orderRouter)
app.use("/wishlist", wishlistRouter)

app.use("/stripe",stripeRouter)
