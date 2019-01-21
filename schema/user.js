const { gql }=require('apollo-server-express');


var userSchema=gql`

    extend type Query{
        allUser:[User]
    },
    extend type Mutation{
        signUp(username:String!,email:String!,password:String!,address:String):token!,
        signIn(login:String!,password:String!):token!
    },
    type User{
        username:String!,
        email:String!,
        password:String!,
        addresses:[Address]
    }
`

module.exports=userSchema