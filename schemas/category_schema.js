const mongoose = require("mongoose");
const categorySchemas = mongoose.Schema({
    name : String
});
const Category = mongoose.model("Category" , categorySchemas);

module.exports = Category;
;