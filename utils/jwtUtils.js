const jwt=require("jsonwebtoken");

signUserToken=async(user,secret,expiresIn)=>{
    const {id,username,email}=user;
    token=null;
    try{
        token=await jwt.sign({id,username,email},secret,{
            expiresIn:expiresIn
        })
        return token;
    }   
    catch(error){
        throw new Error("Error in signing contract")
    }
}

verifyToken=async(token,secret)=>{
    try{
        userObj=await jwt.verify(token,secret);
        return userObj;
    }
    catch(err){
        return null;
    }
}

module.exports={signUserToken,verifyToken}