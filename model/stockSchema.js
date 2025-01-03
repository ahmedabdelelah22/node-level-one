const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// define the Schema (the structure of the article)
const stockSchema = new Schema({
  name: String,
  code: { type: String, unique: true },

  quantity: Number,
  vole_quantity:Number,
  price: Number,
  
  },
  {timestamps:true});

  // Create a model based on that schema
const Stock = mongoose.model("Stock", stockSchema);


// export the model
module.exports = Stock; 