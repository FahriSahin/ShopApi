const  mongoose  = require("mongoose");
const userSchema = mongoose.Schema({
    name : String ,
    pass : String ,
    email : String,
    date:{
        type : Date ,
        default : Date.now
    }
});


const User = mongoose.model("User" , userSchema);

module.exports =  User;