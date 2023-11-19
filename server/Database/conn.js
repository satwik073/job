const mongoose = require('mongoose');
const mongoDB = process.env.DATABASE;
mongoose.connect(mongoDB).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});