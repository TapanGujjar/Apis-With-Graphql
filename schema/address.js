const { gql }=require('apollo-server-express');

var addressSchema=gql`

    extend type Query{
        allAddress:[Address]
    },
    extend type Mutation{
        addAddress(address:String!): Boolean!,
        removeAddress(id:Int!):Boolean!
    },
    type Address{
        address:String!,
        user:User
    }
`

module.exports=addressSchema