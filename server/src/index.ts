import "dotenv/config"
import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import {User} from "./entity/User";

import {ApolloServer, gql} from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolvers } from "./resolvers/UserResolvers";
import { MainResolvers, TrackResolver } from "./resolvers/TestResolvers";
import { MyContext, RefreshTokenPayload } from "./types/Types";
import cookieParser from "cookie-parser";
import { createAccessToken, createRefreshToken } from "./helpers/generateTokens";
import { verify } from "jsonwebtoken";
import cors from 'cors';



(async ()=> {

    // express routes 
    const app = express();

    app.use(cors({
        origin: ["http://localhost:3000",'https://studio.apollographql.com'], // "*"
        credentials: true,
    }))
    app.use(cookieParser())
    app.get('/', (_,res) => res.send("<h1>Hello</h1>"))


    // new AccessToken requested.. 
    // We semulate this as our auth service
    // Provide user the new accessToken, check if the user is valid and not blacklisted
    app.post('/refreshTheAccessToken',async (req,res)=>{
        
        try{
            const token = req.cookies["refresh-token"];
            console.log(token);
    
            const payload = verify(token,process.env.REFRESH_TOKEN_SECRET!) as RefreshTokenPayload;
            
            const user = await User.findOne({where: {id: payload.userId}})

            if(!user) throw Error("User not found");

            // check if the refresh-tokens is not invalidated 
            if(user.tokenVersion !== payload.tokenVersion){
                throw Error("Old Token");
            };

            // Generate a new Refresh-token
            // So that even after 7d if user has used the application his token will be refreshed.
            res.cookie(
                'refresh-token',
                createRefreshToken(user),
                {
                    httpOnly: true,
                }
            );

            return res.send({
                ok: true,
                accessToken: createAccessToken(user),
            });
        }catch(err){
            console.log(err);
            return res.send({
                ok: false,
                accessToken: ''
            })
        }
    })

    // create a typeorm connection with postgress 
    const typeormConnection = await createConnection();

    // build a apolloSercer schema and resolvers with 'type-graphql'
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolvers,MainResolvers, TrackResolver]
        }),
        context: ({req,res}): MyContext => ({req,res}),
    });
    //  start apollo server for /graphql endpoint
    await apolloServer.start();

    // attach apollo server to express app 
    apolloServer.applyMiddleware({app, 
    //   cors:{
    //     origin: 'https://studio.apollographql.com',
    //     credentials: true
    //   }
    });

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
