const { gql }=require('apollo-server-express');


var cartItemSchema=gql`


    extend type Mutation{
        addItemToCart(productId:Int!,quantity:Int):Cart!,
        updateQuantityOnCart(productId:Int!,quantity:Int!):Cart!,
        removeItemFromCart(productId:Int!):Boolean!,
        removeAllItemFromCart:Boolean!

        
    },
    type CartItem{
        cart:Cart!,
        item:Product!,
        quantity:Int!
    }
`

module.exports=cartItemSchema