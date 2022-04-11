const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const TypeDefs = require("./schema")
const Resolvers = require('./resolvers')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const { applyMiddleware } = require('graphql-middleware');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pick = require("lodash").pick;

const SECRET = "createaverystrongsec34!retthatalsoincludes2423412wdsa324e34e";


// configure the user collection
const UserSchema = mongoose.Schema({
  username: String,
  password: String
});



//mongoDB Atlas Connection String
dotenv.config();
const url = process.env.MONGODB_URL;

//TODO - Replace you Connection String here
const connect = mongoose.connect(url,{

  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then((db) => {
  console.log('Connected to the server');
}, (err) => {
  console.log(err);
});

//Define Apollo Server
const server = new ApolloServer({
  typeDefs: TypeDefs.typeDefs,
  resolvers: Resolvers.resolvers,
 // you can catch all the request in the context
 context: async ({ req }) => {
  const token = await req.headers["authentication"];

  let user,getType,isAdmin;
  if(token != null){
  try {
    user = await jwt.verify(token, SECRET);
    getType = user.user.type;
    if (getType=="admin"){
      isAdmin=true;
    }
    console.log(user);
  } catch (error) {
    console.log(`${error.message} caught`);
  }
  // the user and secret we are passing here is what we access in every resolver
  }
  return {
    user,
    isAdmin,
    SECRET
  };
}

});


//Define Express Server
const app = express();
app.use(bodyParser.json());
app.use('*', cors());

//Add Express app as middleware to Apollo Server
server.applyMiddleware({ app })

//Start listen 
app.listen({ port: process.env.PORT }, () =>
  console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`));

