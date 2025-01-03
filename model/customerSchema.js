const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// define the Schema (the structure of the article)
const userSchema = new Schema({
  
   firstName   :String,
   lastName    :String,
   email       :String,
   phoneNumber :String,
   type        :String,
   adress      :String,
   note        :String,


   items       : [{
    name: String,
    code:String,
    quantity:Number,
    price: Number,
    subtotal:Number,
}],
   totalsum: Number,
   paid: Number,
   rest: Number,




  },
  {timestamps:true});

  // Create a model based on that schema
const User = mongoose.model("customer", userSchema);


// export the model
module.exports = User; 