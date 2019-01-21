const {gql}=require("apollo-server-express");

var tokenSchema=gql`
    type token{
        token:String!
    }
`

module.exports=tokenSchema;