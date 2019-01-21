/* Package Dependencies */
const {combineResolvers}=require("graphql-resolvers");
const {UserInputError,ApolloError,AuthenticationError}=require("apollo-server-express")
const Op=require('sequelize').Op

/* created module dependencies */
const {signUserToken}=require("../utils/jwtUtils");

const userResolvers={
    
    Query:{
        allUser:async(parent,args,{models})=>{
            
            return await models.User.findAll();
        }
    },
    Mutation:{
        signUp:async(parent,args,{models})=>{

            username=args.username;
            email=args.email;
            password=args.password;
            address=args.address;
            if(!username || !email || !password){
                throw new UserInputError("Either Username,email or password not found");
            }
            try{
                newUser=await models.User.create({
                    username:username,
                    email:email,
                    password:password,
                });
                
                token=await signUserToken(newUser,"indiaIsGreat","30m")
                
                return {"token":token};
            }
            catch(err){
                console.log(err)
                throw new ApolloError("Unable to create a new User.",500)
            }
        },
        
        signIn:async(parent,args,{models})=>{
            login=args.login;
            password=args.password;
            if (!login || !password){
                throw new UserInputError("Login Value not found")
            }
            
            try{
                loginUser=await models.User.findOne({
                    where:{
                        [Op.or]:[{username:login},{email:login}]
                    }
                });
                console.log(loginUser)
                if(loginUser==null){
                    throw new AuthenticationError("Unable to login. check credentials");
                }
                
                isValid=await loginUser.compareHash(password);
                
                if(isValid==false){
                    throw new AuthenticationError("Unable to login. check your credentials");
                }
                
                token=await signUserToken(loginUser.dataValues,"indiaIsGreat","30m")
                console.log("token="+token);
                return {"token":token}
            }
            catch(err){
                console.log(err);
                throw new ApolloError("Error in Finding User",500);
            }
        }
        
    }
};

module.exports=userResolvers