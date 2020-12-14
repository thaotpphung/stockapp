const Stock = require("../models/stock"),
  Subscription = require("../models/subscription")
  stockController = require("../controller/stock"),
  mongoose = require("mongoose");
require("dotenv").config();

// get all subscription of user - DONE
exports.getSubscriptions = async (req, res) => {
  try {
    let subscriptions = await Subscription.find({userid: req.params.userid}).populate("stock").exec();
    res.render("subscriptions/index", { subscriptions : subscriptions});
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
}

// delete subsciption
exports.deleteSubscription = async (req, res) => {
  try {
    await Subscription.deleteOne({userid: req.params.userid} , {stockid: req.params.stockid});
    req.flash("success", "Stock deleted");
    res.redirect("/users/" + req.params.userid + "/subscriptions");
  } catch (err) {
    console.log(err);
  }
}

// add a substription
exports.addSubscription = async (req, res) => {
  try {
    let stock = await Stock.findOne({symbol: req.body.stock.symbol});
    if (stock == null) {
      stock = await stockController.addStockHelper(req.body.stock.symbol);
    }
    let subscription = await Subscription.findOne({symbol: req.body.stock.symbol});
    if (subscription == null) {
      await Subscription.create ({
        userid: req.params.userid, 
        stock: stock._id,
        stockid: stock._id
      });
      req.flash("success", "Successfully made action!");
      res.redirect("/users/" + req.params.userid + "/subscriptions");
    } else {
      req.flash("error", "Stock already exists");
      res.redirect("/users/" + req.params.userid + "/subscriptions");
    }
  } catch (err) {
    console.log(err);
  }
};



