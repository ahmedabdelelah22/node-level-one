const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// define the Schema (the structure of the article)
const detailSchema = new Schema({
  client : String,
  phone :  Number,
  items       : [{
  name: String,
  code: { type: String },
  codeVole: { type: String},
  width: Number,
  height: Number,
  quantity: Number,
  vole_quantity: Number,
  pipe_quantity: Number,
  price: Number,
  Detail:String,
  pipe:String,
}] ,
  },
  {timestamps:true});

  // Create a model based on that schema
const Detail = mongoose.model("Detail", detailSchema);


// export the model
module.exports = Detail; 