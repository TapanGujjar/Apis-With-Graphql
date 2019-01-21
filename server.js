/* Package Dependencies */
const express=require('express');
const {ApolloServer}=require("apollo-server-express");

/* Module Dependencies */
const {sequelize,models}=require("./models/index")
const typeDefs=require("./schema/index")
const resolvers=require("./resolvers/index")
const {verifyToken}=require("./utils/jwtUtils")

/* Initialise Express App */
const app=express()

/* Initialise Apollo Server */
const server = new ApolloServer({ typeDefs, resolvers ,context:async({req})=>{
  authUser=await verifyToken(req.headers['x-token'],'indiaIsGreat')
  if(authUser!=null || authUser){
    authUser=await models.User.findOne({
      where:{
        username:authUser.username,
        email:authUser.email
      }
    })
  }
  return{
    authUser,
    models
  }
}
});

/*applying the apollo middleware on express */
server.applyMiddleware({app})

sequelize.authenticate().then(()=>{
  app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
})
.catch((err)=>{
  console.log(err)
})

