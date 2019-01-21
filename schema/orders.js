const { gql }=require('apollo-server-express');


var orderSchema=gql`

    extend type Query{
        getAllOrders:AllOrder
    },
    type AllOrder{
        user:User!,
        orderedItems:[CartItem]
    }
`

module.exports=orderSchema