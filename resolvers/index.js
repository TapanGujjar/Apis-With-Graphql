
const userResolvers=require("./user");
const addressResolvers=require("./address");
const productResolvers=require("./products");
const cartResolvers=require("./carts");
const cartItemResolvers=require("./cartItems");
const orderResolvers=require("./orders")
module.exports=[userResolvers,addressResolvers,productResolvers,cartResolvers,cartItemResolvers,orderResolvers];