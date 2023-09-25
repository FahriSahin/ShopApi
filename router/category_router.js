const express = require("express");
const router = express.Router();
const Category = require("../schemas/category_schema");
require("express-async-errors");


router.delete("/delete/:id" , async (req , res) => {
    const id = req.params.id
    const deletedItem = await Category.deleteOne({_id : id})
    res.send(deletedItem);
})

router.put("/put/:id" , async (req , res) => {
    const id = req.params.id
    const cat = await Category.find();
    await Category.updateOne({_id : id},{
        name : req.body.name
    })
    res.send(cat);
})

router.post("/post" , async (req , res) => {
    const addCat = new Category({
        name :  req.body.name
    })
    await addCat.save()
    res.send(addCat);
})

router.get("/:id" , async (req , res) => {
    const id = req.params.id;
    const cat = await Category.find({_id : id});
    res.send(cat);
})

router.get("/" , async (req , res) => {
    const cat = await Category.find();
    res.send(cat);
})

module.exports = router;