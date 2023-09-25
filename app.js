const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./router/router");
const catRouter = require("./router/category_router");
const logger = require("./errLogger/logger");
require("express-async-errors");
const config = require("config");
app.use(express.json());

const username = config.get("username");
const password = config.get("password");
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ue3lqy9.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`)
    .then(() => {console.log("mongodb bağlantısı başarılı")})
    .catch((err)=>{console.log(err)})


app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin" , "*");
    res.setHeader("Access-Control-Allow-Methods" , "*");
    next()
})

app.use("/product",router);
app.use("/category", catRouter);
app.use((err,req,res,next )=> {
    logger.error(err.message);
    res.status(500).send("hata olustu");
})


app.listen(3000 , ()=>{
    console.log("app listen at port 3000");
})