const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    work:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
})



//hash the password

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 12);
            const hashedCPassword = await bcrypt.hash(this.cpassword, 12);
            this.password = hashedPassword;
            this.cpassword = hashedCPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            return next(error);
        }
    }
    next();
});

const User = mongoose.model('REGISTRATION', userSchema);
module.exports = User;