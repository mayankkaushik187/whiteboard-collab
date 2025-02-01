const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router()

router.post("/register",async (req,res)=>{
    try{
        console.log("Hello")
        const {username, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password:hashedPassword});
        await newUser.save()
        res.status(201).json({message: "User Registered"})
        return {"success": true}
    }
    catch (err){
        res.status(500).json({error: err.message}) 
    }
})


module.exports = router