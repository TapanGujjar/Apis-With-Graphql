const { gql }=require('apollo-server-express');


var productSchema=gql`

    extend type Query{
        allProducts:[Product],
        viewProduct(id:Int!):Product
    },
    extend type Mutation{
        addProduct(name:String!,inventory:Int):Product,
        removeProduct(id:Int!):Boolean,
        searchProduct(search:String!):[Product],
        updateInventory(id:Int!,inventory:Int!):Product

    },
    type Product{
        id:Int!,
        name:String!,
        inventory:Int!
    }
`

module.exports=productSchema