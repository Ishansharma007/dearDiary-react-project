const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const User = require("../models/User-model");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "IshanisKingOfGoodTimes";

// Route 1: Create a user using : POST "/api/auth/register" , register user .

router.post("/register", [
    body('email', "enter a valid email").isEmail(),
    body('name', "name is too short").isLength({ min: 3 }),
    body('password', "password must be minimum 7 characters").isLength({ min: 7 })
], async (req, res) => {

    let success = false ;

    // If there are errors send bad request .

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // Check if user already exists
    try {

        let user = await User.findOne({ userName: req.body.userName });
        if (user) {
            return res.status(400).json({ success, message: "Username is already in use" });
        }

        // hashing password for security

        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(req.body.password, salt);

        //creating new user

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            password: hashedPassword,
        })

        const data = ({
            user: {
                id: user.id
            }
        });

        //Generating new token for secured data transfer.
        success = true;
        var token = jwt.sign(data, jwtSecret);
        console.log(token);
        res.json({ success, token, "status": "user created successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error");
    }
});



// Route 2 : authenticate a user using : POST "/api/auth/login" , login user .

router.post("/login", [
    body('userName', "name is too short").isLength({ min: 3 }),
    body('password', "password must be minimum 7 characters").isLength({ min: 7 })
], async (req, res) => {

     let success = false ;
     // If there are errors send bad request .

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ success, errors: errors.array() });
     }

     const {userName, password} = req.body;

     try {

        let user = await User.findOne({userName});
        if(!user){
           return res.status(400).json({success, message: "Invalid credentials, please try again"});
        }
         
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(400).json({success, message: "Invalid credentials, please try again"});
        }

        const data = ({
            user: {
                id: user.id
            }
        });

        //Generating new token for secured data transfer.

        let token = jwt.sign(data, jwtSecret);
        success = true;
        console.log(success ,token);
        res.json({ success, token });

     } catch (error) {
        console.log(error.message);
        res.status(500).send("Error");
     }
});

//Route 3 : Fetch a user using : POST "/api/auth/getUser".

router.post("/getuser", fetchUser , async (req, res) => {

    try {
        
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error");
    }

});

module.exports = router;