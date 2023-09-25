const express = require("express");
const router = express.Router();
const {Product} = require("../schemas/product_schema");
const Comments = require("../schemas/product_schema");
const User = require("../schemas/user_schema");
const jwt = require("jsonwebtoken");
const logger = require("../errLogger/logger");
const config = require("config");
require("express-async-errors");

const authControl = (req , res , next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send("yetkiniz yok");
    }
    try {
        jwt.verify(token , config.get("jwtPrivateKey"));
        next()
    } catch (error) {
        res.status(400).send("hatali token")
    }
}


// kayit
router.post("/user" , async (req , res) =>{
    const email = req.body.email;
    const name = req.body.name;
    const pass = req.body.pass;
    const control = await User.find({email : email});
    if (control.length > 0) {
        logger.log("Bu mailde bir kullanıcı mevcut")
        res.send("Bu mailde bir kullanıcı mevcut")
    }
    else{
        const newUser = new User({
             email : email,
             name : name,
             pass : pass,
        })
        await newUser.save();
        const token = jwt.sign({_id : newUser.id},config.get("jwtPrivateKey"));
        res.header("auth-token" , token).send(newUser);
    }
})


router.get("/user/all" , async (req , res) =>{
    const result = await User.find();
    res.send(result)
})

// login
router.post("/user/log" , async (req , res) =>{
    const email = req.body.email;
    const pass = req.body.pass;
    const mailControl = await User.find({email : email});
    const passControl = await User.find({pass : pass});
    if (mailControl == false || passControl == false) {
        return(res.send("Hatalı Mail Ve Ya Şifre"));
    }
    const result = await User.find({email : email});
    if (result) {
        const token = jwt.sign({_id : result.id},config.get("jwtPrivateKey"));
        res.header("auth-token" , token).send(result);
    }
})

//

router.get("/:id" , async (req , res) =>{
    const id = req.params.id;
    const result = await Product.find({_id : id}).populate("category","name -_id");
    res.send(result);
})

router.get("/" , async (req , res) => {
    const products = await Product.find().populate("category" , "name");
    res.send(products);
})

router.post("/" ,authControl ,async (req , res) => {
    const prd = new Product({
        name : req.body.name,
        price : req.body.price,
        desc : req.body.desc,
        imgUrl : req.body.imgUrl,
        isActive : req.body.isActive,
        category : req.body.category,
        comments : req.body.comments
    })
    try{
        await prd.save();
        res.send(prd);
    }
    catch(err){
        console.log(err)
    }  
})

router.put("/:id" , async(req , res) => {
    const number = req.params.id;
    const result = await Product.updateOne({_id : number},
        {$set:{
            name : req.body.name ,
            price : req.body.price ,
            desc : req.body.desc ,
            imgUrl : req.body.imgUrl ,
            isActive: req.body.isActive,
            category : req.body.category,
            comments : req.body.comments
        }})
    res.send(result);
})

router.delete("/:id" , async(req , res)=>{
   const deleteid = req.params.id;
   await Product.deleteOne({_id : deleteid});
   const result = await Product.find();
   res.send(result)
})

module.exports = router;