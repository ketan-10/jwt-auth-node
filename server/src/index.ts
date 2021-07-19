import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import {User} from "./entity/User";

import {ApolloServer, gql} from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolvers } from "./UserResolvers";




(async ()=> {

    // express routes 
    const app = express();
    app.get('/', (_,res) => res.send("<h1>Hello</h1>"))

    // create a typeorm connection with postgress 
    const typeormConnection = await createConnection();

    // build a apolloSercer schema and resolvers with 'type-graphql'
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolvers]
        })
    });
    // start apollo server for /graphql endpoint
    await apolloServer.start();

    // attach apollo server to express app
    apolloServer.applyMiddleware({app});

    // start express app
    app.listen(4000,()=>{
        console.log("Application started");
    })

})();

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
