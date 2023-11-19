const express = require('express');
const jwt =require('jsonwebtoken')
const bcrypt =require('bcryptjs');
const router = express.Router();
require('../Database/conn')
const User = require('../Model/userSchema')
router.get("/", (req, res) => {
    res.send("This is home page from auth.js");
});
router.post('/register',(req, res)=>{
    const {name , email, phone , work , password , cpassword}=req.body;
    console.log(req.body);
    if(!name || !email || !phone || !work || !password || !cpassword)
    {
        // return res.json({error:"please fill all the details"})
         return res.status(422).json({error:"please fill all the details"})
    }
    User.findOne({email:email}).then((user)=>{
        if(user)
        {
            return res.status(422).json({error:"user Already Exists"})
        }

        const userReg = new User({name , email, phone , work , password , cpassword});
        
        userReg.save().then(()=>{
            res.status(201).json({message:"success"});
        }).catch((err)=> res.status(500).json({error:"failed to add user"}))
    }).catch(err=>{console.log(err)})

    // res.json({
    //     message: "register page success",
    //     data: req.body
    // });

});router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide email and password" });
        }

        const userLogin = await User.findOne({ email: email });
        if (!userLogin) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, userLogin.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        return res.status(200).json({ message: "Login successful" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});

module.exports= router;