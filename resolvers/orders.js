const {UserInputError,ApolloError,AuthenticationError,ForbiddenError}=require("apollo-server-express")
const {combineResolvers}=require("graphql-resolvers");
/* Module Dependency */
const isAuthenticated=require("./authentication")


const orderResolvers={

    Query:{
        
        getAllOrders:combineResolvers(isAuthenticated,async(parent,args,{authUser,models})=>{

            orderedItems=await models.CartItem.findAll({
                where:{

                },
                include:[{
                    model:models.Cart,
                    where:{
                        userId:authUser.id
                    }
                }]
            })

            orderedItems=orderedItems.map(item=>item.dataValues)
            // orderedItems=orderedItems.map(item=>item.dataValues)
            // console.log(orderedItems)
            return orderedItems
            
        })
    },
    AllOrder:{

        user:async(parent,args,{authUser,models})=>{
            return authUser
        },
        orderedItems:async(parent,args,{authUser,models})=>{
            console.log("RTRERERERR")
            // items=parent.map(item=>item.dataValues)
            return parent
        }
    }
}

module.exports=orderResolvers