const {UserInputError,ApolloError,AuthenticationError,ForbiddenError}=require("apollo-server-express")
const {combineResolvers}=require("graphql-resolvers");
/* Module Dependency */
const isAuthenticated=require("./authentication")

const cartResolvers={
    
    Query:{
        viewCart:combineResolvers(isAuthenticated,async(parent,args,{authUser,models})=>{
            console.log("View Cart");
            cart =await models.Cart.findOne({
                where:{
                    userId:authUser.id,
                    purchased:false
                }
            });
            
            if(cart==null || !cart){
                throw new ApolloError("No cart found for the user,purchase item first ","NO_CART_FOUND_FOR_USER")
            }
            return cart;
            
        })
        
    },
    Mutation:{        
        purchaseCart:combineResolvers(isAuthenticated,async(parent,args,{authUser,models})=>{
            /*Funciton to purchase a cart when a user selects a cart with particular id*/
            console.log("In purchase cart")
            console.log("WEWEWEE="+authUser)
            cart=await models.Cart.findOne({
                where:{
                    userId:authUser.id,
                    purchased:false
                }
            });
            
            if(cart==null || !cart){
                throw new ApolloError("No cart found for the user,purchase item first ","NO_CART_FOUND_FOR_USER")
            }
            cartItems=await models.CartItem.findAll({
                where:{
                    cartId:cart.id
                }
            })
            if(cartItems.length<=0 || !cartItems){
                throw new ApolloError("No items found for the user to purchase. Fill the cart first ","NO_CART_FOUND_FOR_USER")
            }
            
            products=[];
            originalInventory=[];
            for(i=0;i<cartItems.length;i++){
                tempPorduct=await models.Product.findByPk(cartItems[i].dataValues.productId);
                if(!tempPorduct || tempPorduct==null){
                    throw new ApolloError("No product Found","DB_RELATION_ERROR")
                }
                
                if(tempPorduct.dataValues.inventory-cartItems[i].dataValues.quatity>0){
                    throw new ApolloError("Product "+tempPorduct.dataValues.name+" doesnot have "+cartItems[i].dataValues.quatity +"in stock","NOT_ENOUGH_QUANTITY");
                }
                products.push(tempPorduct);
                originalInventory.push(tempPorduct.dataValues.inventory);
            }
            
            try{
                for(i=0;i<products.length;i++){
                    await products[i].update({
                        inventory:products[i].dataValues.inventory-cartItems[i].dataValues.quantity
                    });
                }
            }
            catch(error){
                for(i=0;i<products;i++){
                    await products[i].update({
                        inventory:originalInventory[i] 
                    });
                }
                throw new ApolloError("Products Inventory change error","DB_CHANGE_ERROR");
            }
            
            
            try{
                await cart.update({
                    purchased:true
                })
            }catch(err){
                for(i=0;i<products;i++){
                    await products[i].update({
                        inventory:originalInventory[i] 
                    });
                }

                throw new ApolloError("Cart Update error","DB_CHANGE_ERROR");
            }
            
            try{
                await models.Order.create({
                    userId:authUser.id,
                    cartId:cart.id
                });
            }
            catch(err){
                for(i=0;i<products;i++){
                    await products[i].update({
                        inventory:originalInventory[i] 
                    });
                }
                
                await cart.update({
                    purchased:false
                })
                throw new ApolloError("Order cannot be processed","DB_CHANGE_ERROR")
            }
            
            return cart
        })
    },
    Cart:{
        user:async(parent,args,{authUser,models})=>{
            return authUser
        },
        items:async(parent,args,{authUser,models})=>{
            if(!authUser || authUser==null ){
                throw new ForbiddenError("Unable to access the cart. SignIn")
            }
            cartItems=await models.CartItem.findAll({
                where:{
                    cartId:parent.dataValues.id
                }
            });
            cartItems=cartItems.map(function(item){
                // console.log("DSDSDSDDDDDD")
                // console.log(item)
                item=item.dataValues
                console.log(item)
                return item
            })
            return cartItems
        }
    }
}


module.exports=cartResolvers