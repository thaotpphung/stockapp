var mongoose = require("mongoose");

var transactionSchema = mongoose.Schema({
  userid: String,
  // stock: {
  //   stockid: String,
  //   symbol: String,
  //   name: String, 
  //   price: Number
  // },
  stockid: String,
  symbol: String,
  name: String,
  price: Number,
  time: String,
  quantity: Number,
  type: String,
  totalprice: {type: Number, default: 0},
  totalquantity: {type: Number, default: 0},
  isNewest: {type: Boolean, default: true },
});

transactionSchema.virtual('transactiontotal').get(function() {
  return this.quantity * this.price;
});

module.exports = mongoose.model("Transaction", transactionSchema);
