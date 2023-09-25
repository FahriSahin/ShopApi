const  mongoose  = require("mongoose");
const  Schema  = require("mongoose");

const commentSchema = mongoose.Schema({
    name : String ,
    text : String ,
    date:{
        type : Date ,
        default : Date.now
    }
});

const productSchemas = mongoose.Schema({
    name : String ,
    price : Number ,
    desc : String ,
    imgUrl : String ,
    date:{
        type : Date ,
        default : Date.now
    },
    isActive : Boolean,
    category : {type : Schema.Types.ObjectId , ref: "Category"},
    comments : [commentSchema]
});
const Product = mongoose.model("Product" , productSchemas);
const Comments = mongoose.model("Comments" , commentSchema);

module.exports = { Product , Comments };