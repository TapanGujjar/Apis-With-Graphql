const {combineResolvers}=require("graphql-resolvers");
const {UserInputError,ApolloError,AuthenticationError,ForbiddenError}=require("apollo-server-express")

/* Module Dependency */
const isAuthenticated=require("./authentication")


const addressResolvers={
    Query:{
        
        allAddress:combineResolvers(isAuthenticated,async(parent,args,{authUser,models})=>{
            
            try{
                userAddress=await models.Address.findAll({
                    where:{
                        userId:authUser.id
                    }
                });
                console.log(userAddress)
                return userAddress
            }
            catch(error){
                throw new ApolloError(error,500);    
            }
        })
        
    },
    Mutation:{
        addAddress:combineResolvers(isAuthenticated,async(parent,args,{authUser,models})=>{
            
            address=args.address;
            if(!address){
                throw new UserInputError("address empty error.")
            }
            try{
                newAddress=await models.Address.create({
                    address:address,
                    userId:authUser.id
                })
                
                if(newAddress==null ){
                    return false;
                }
                return true;
            }
            catch(err){
                console.log(err);
                throw new ApolloError("Error in inserting address for the user");
            }
        }),
        removeAddress:combineResolvers(isAuthenticated,async(parent,args,{authUser,models})=>{
            console.log(authUser);
            delId=args.id;
            if(!delId){
                throw new UserInputError("No Id provided to remove. Address Id empty")
            }
            try{
                delAddress=await models.Address.findOne({
                    where:{
                        "id":delId
                    }
                });
                
                if(delAddress==null){
                    throw new ApolloError("Unable to find an address at the id");
                }
                else if(delAddress.dataValues.userId==authUser.id){
                    await delAddress.destroy();
                    return true;
                }
                else{
                    throw new ForbiddenError("Not permitted to delete the address")
                }
            }
            catch(err){
                console.log(err);
                throw new ApolloError(err,500);
            }   
        })
    }
}

module.exports=addressResolvers