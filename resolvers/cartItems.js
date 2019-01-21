const {UserInputError,ApolloError,AuthenticationError,ForbiddenError,ValidationError}=require("apollo-server-express")
const {combineResolvers}=require("graphql-resolvers");
/* Module Dependency */
const isAuthenticated=require("./authentication")

const cartItemResolvers={

    Mutation:{
        removeItemFromCart:combineResolvers(isAuthenticated,async(parent,args,{authUser,models})=>{
            productId=args.productId;            
            if( !productId){
                throw new UserInputError("One or more properties are null");
            }
            
            cart=await models.Cart.findOne({
                where:{
                    userId:authUser.id,
                    purchased:false
                }
            });
            product=await models.Product.findByPk(productId)
            if(!cart){
                throw new ValidationError("No Items found for the user")
            }

            cartId=cart.id;
            if(!product){
                throw new UserInputError("No product found with the particular id")
            }
            if(cart.userId!=authUser.id){
                throw new ForbiddenError("Access to cart not permitted")
            }

            cartItems=await models.CartItem.findOne({
                where:{
                    cartId:cartId,
                    productId:productId
                }
            });

            if(!cartItems){
                throw new ValidationError("Unable to remove item not added to cart")
            }

            await cartItems.destroy()
            return true;

        }),
        addItemToCart:combineResolvers(isAuthenticated,async(parent,args,{authUser,models})=>{
            /*Function to get all add Item To Cart */
            /*Params: cartId,product,quantity! */

            cartId=args.cartId;
            productId=args.productId;
            quantity=args.quantity;
            console.log("R%%%%%%%%%="+quantity)
            if(!productId ){
                throw new UserInputError("One or more required properties are null")
            }
            if(!quantity){
                quantity=1
            }
            if( quantity<0){
                throw new ValidationError("Quantity cannot be negative")
            }

            product=await models.Product.findByPk(productId)
            if(!product || product==null || product=={} || product==undefined){
                throw new UserInputError("No product found with particular id")
            }

            if(product.inventory-quantity<=0){
                throw new ApolloError("Product Out of stock","PRODUCT_OUT_OF_STOCK")
            }

            cart=await models.Cart.findOne({
                where:{
                    userId:authUser.id,
                    purchased:false
                }
            });
            
            if(!cart || cart==null || cart=={} || cart==undefined){
                console.log("India is great");
                cart=await models.Cart.create({
                    userId:authUser.id
                })
                console.log("Creating cart items")
                cartItems=await models.CartItem.create({
                    cartId:cart.id,
                    productId:productId,
                    quantity:quantity
                })
            }
            else{
                cartItems=await models.CartItem.findOne({
                    where:{
                        cartId:cart.id,
                        productId:productId
                    }
                })
                
                if(cartItems==null || cartItems=={} || cartItems==undefined || !cartItems){
                    cartItems=await models.CartItem.create({
                        cartId:cart.id,
                        productId:productId,
                        quantity:quantity
                    })
                }
                else{
                    await cartItems.update({
                        quantity:cartItems.quantity+quantity
                    })
                }
            }

            
            return cart
            
        }),
        updateQuantityOnCart:combineResolvers(isAuthenticated,async(parent,args,{authUser,models})=>{
            /*Functon to update quantity on a particular cart */


            productId=args.productId;
            quantity=args.quantity;
            console.log("Quantity="+quantity)
            if( !productId || !quantity){
                throw new UserInputError("One or more parameters are not defined")
            }

            cart=await models.Cart.findOne({
                where:{
                    userId:authUser.id,
                    purchased:false
                }
            });
            product=await models.Product.findByPk(productId)
            if(!cart){
                throw new UserInputError("No cart found for the user");
            }

            if(cart.userId!=authUser.id){
                throw new ForbiddenError("Unable to access cart not belonging to the user")
            }
            if(!product){
                throw new UserInputError("No product found with the product id")
            }
            if(product.dataValues.inventory-quantity<0){
                throw new ApolloError("Product out of the required quantity","QUANTITY_GREATER_THAN_STOCK")
            }

            cartItem=await models.CartItem.findOne({
                where:{
                    productId:product.id,
                    cartId:cart.id
                }
            });
            if(!cartItem || cartItem==null){
                throw new ValidationError("User didnot purchase the item. Purchase item to increase quantity")
            }


            await cartItem.update({
                
                    quantity:quantity
                
            })

            return cart
        }),
        removeAllItemFromCart:combineResolvers(isAuthenticated,async(parent,args,{authUser,models})=>{

            

            cart=await models.Cart.findOne({
                where:{
                    userId:authUser.id,
                    purchased:false
                }
            });

            if(cart==null || !cart){
                throw new UserInputError("No Purchased Items found for the user ") 
            }

            cartItems=await models.CartItem.findAll({
                where:{
                    cartId:cart.id
                }
            });
            console.log(cartItems)

            if(cartItems.length<=0 || !cartItems || cartItems==[] || cartItems=={}){
                throw new UserInputError("No items found for the cart")
            }

            cartItems=cartItems.map(async(item)=>await item.destroy())

            return true;

            
        })
    },
    CartItem:{
        cart:async(parent,args,{authUser,models})=>{
            console.log("OOOOOOOOOOOOOOOOO")
            cartId=parent.cartId;

            cartItemCart=await models.Cart.findByPk(cartId);
            console.log("SADSADSDSDSDSDS")
            if(!cartItemCart || cartItemCart==null){
                throw ApolloError("No cart found for the item","DATABASE_RELATION_ERROR")
            }
            
            if(cartItemCart.userId!=authUser.id){
                throw new ForbiddenError("Unable to access the cart")
            }

            
            return cartItemCart
        },
        item:async(parent,args,{authUser,models})=>{
            cartId=parent.cartId;
            productId=parent.productId;
            product=await models.Product.findByPk(productId)

            if(!product || product==null){
                throw new ApolloError("No product Found for the item in Cart","DATABASE_RELATION_ERROR")
            }

            product=product.dataValues;
            return product
        }
    }
}

module.exports=cartItemResolvers