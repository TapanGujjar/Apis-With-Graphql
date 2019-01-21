const { gql }=require('apollo-server-express');


var cartSchema=gql`

    extend type Query{
        viewCart:Cart
    },
    extend type Mutation{

        purchaseCart:Cart
        
    },
    type Cart{
        user:User!,
        purchased:Boolean!
        items:[CartItem]
    }
`

module.exports=cartSchema