import express, { response } from "express"

import User from "../models/User.js"
import { generatePassword } from "./helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET_KEY = "myrandomsecretkey"

//console.log(SECRET_KEY)

router.post("/register", async (req, res) => {

    const hashedpassword = await generatePassword(req.body.password)
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedpassword,
    })

    try {
        const savedUser = await newUser.save()
        res.send({ success: true, savedUser })
    }
    catch (err) {
        res.send(err)
    }
})


router.post("/login", async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const dbPassword = user.password;

            const ispasswordMatch = await bcrypt.compare(req.body.password,dbPassword)
            //console.log({dbPassword,ispasswordMatch})
            if (ispasswordMatch) {
                const jtoken= jwt.sign({id:user._id},SECRET_KEY)
                res.send({ success: true, user,token:jtoken })
            }
            else {
                res.send({ success: false })
            }
        }
        else
            res.send({ success: false })
    }
    catch (err) {
        res.send({ success: false, err })
    }
})




export { router }