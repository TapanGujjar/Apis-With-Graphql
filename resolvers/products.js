
const {UserInputError,ApolloError,AuthenticationError,Erro}=require("apollo-server-express")
const Op=require('sequelize').Op


const productResolvers={
    Query:{
        allProducts:async(parent,args,{me,models})=>{
            
            try{
                all_products=await models.Product.findAll();
                
                if(all_products!=null || allProducts.length){
                    all_products=all_products.map(a_product=>a_product.dataValues)
                }
                
                return all_products
            }
            catch(err){
                console.log(err);
                throw new ApolloError("Server Error",500);
            }
        },
        viewProduct:async(parent,args,{authUser,models})=>{
            productId=args.id;
            if(!productId){
                throw new UserInputError("Product Id expected for finding product")
            }
            try{
                product=await models.Product.findByPk(productId)
                return product
            }catch(err){
                throw new Error("Server Error","DB_RELATION_ERROR");
            }
        }
    },
    Mutation:{
        addProduct:async(parent,args,{me,models})=>{
            name=args.name;
            inventory=args.inventory;
            if(!name ){
                throw new UserInputError("Either name or inventory undefined")
            }
            if(!inventory){
                inventory=0
            }
            
            try{
                newProduct=await models.Product.create({
                    name:name,
                    inventory:inventory
                })
                return newProduct
            }
            catch(err){
                throw new ApolloError(err,500);
            }
            
        },
        removeProduct:async(parent,args,{me,models})=>{
            id=args.id;
            if(!id){
                throw new UserInputError("ID undefined or empty");
            }
            
            try{
                product= await models.Product.findByPk(id);
                
                if(product==null || product=={} || product==undefined){
                    throw new Error("No product found with the particular id");
                }
                product.destroy();
                return true
            }
            catch(error){
                console.log(error);
                throw new ApolloError(error,500)
            }
        },
        searchProduct:async(parent,args,{me,models})=>{
            console.log("search product")
            searchTerm=args.search
            if(!searchTerm){
                throw new UserInputError("Search Term empty. please enter search term")
            }
            try{
                products=await models.Product.findAll({
                    where:{
                        name:{
                            [Op.like]:"%"+searchTerm+"%"
                        }
                    }
                });
                console.log("SDDDDD")
                if(products==null || products.length==0){
                    products=products.map(product=>product.dataValues)
                }
                
                return products
            }
            catch(err){
                throw new ApolloError("Internal Server Error",500);
            }
        },
        updateInventory:async(parent,args,{me,models})=>{
            console.log("Update Inventory")
            
            id=args.id;
            inventory=args.inventory;
            try{
                if(!id || !inventory){
                    throw new UserInputError("Either id or inventory undefined");
                }
                
                product=await models.Product.findByPk(id);
                if(product==null){
                    throw new Error("No Product found with  that id");
                }
                product=await product.update({
                    inventory:inventory
                })
                return product
            }
            catch(err){
                console.log(err);
                throw new ApolloError(err,500);
            }
            
        }
    }
    
}


module.exports=productResolvers