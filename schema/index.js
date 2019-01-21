const { gql } =require('apollo-server-express');

const userSchema =require('./user');
const tokenSchema=require("./token");
const addressSchema=require("./address");
const productSchema=require("./products");
const cartSchema=require("./carts");
const cartItemSchema=require("./cartItems")
const orderSchema=require("./orders")
const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports= [linkSchema, userSchema,tokenSchema,addressSchema,productSchema,cartItemSchema,cartSchema,orderSchema];
