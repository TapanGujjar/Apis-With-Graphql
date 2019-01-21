const {skip}=require("graphql-resolvers")
const {ForbiddenError}=require("apollo-server-express")
isAuthenticated=async(parent,args,{authUser,models})=>{
    if(authUser==null || authUser==undefined || authUser==={}){
        throw new ForbiddenError("Unauthorization. Your Session expired, Please login again")
    }
    skip
}


module.exports=isAuthenticated