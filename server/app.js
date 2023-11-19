const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();


dotenv.config({path: './private.env'})
require('./Database/conn');

// const User = require('./Model/userSchema')
app.use(express.json());
//linked the router file
app.use(require('./Router/auth'));
// const mongoDB = "mongodb+srv://satwikkanhere:JzPJhkUVTpTWsOck@cluster0.imwv17z.mongodb.net/mernstack";

// const mongoDB= "mongodb+srv://satwikkanhere:satwik@cluster0.co6f1tw.mongodb.net/job?retryWrites=true&w=majority"


const PORT = process.env.PORT;


const middleware = (req, res, next) => {
    console.log("Middleware success");
    next();
}

// app.get("/", (req, res) => {
//     res.send("This is home page");
// });

app.get("/about", middleware, (req, res) => {
    res.send("This is about page");
});

app.get("/login", (req, res) => {
    res.send("This is login page");
});

app.get("/signup", (req, res) => {
    res.send("This is signup page");
});

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});
