import { AccessTokenPayload, MyContext } from "src/types/Types";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import {verify} from "jsonwebtoken"

export const isAuth : Middleware<MyContext> = ({context}, next) => {

  try{
    const auth_header = context.req.headers.authorization;

    if(!auth_header) throw Error("No auth header found");

    const access_token = auth_header.split(" ")[1];
    
    if(!access_token) throw Error("no access_token provided");

    const isValid = verify(access_token,process.env.ACCESS_TOKEN_SECRET!) as AccessTokenPayload;

    if(!isValid) throw Error("User not Authorized");

    context.userId = isValid.userId;
    
    return next();
  
  }catch(err){
    console.log(err);
    throw err;
  }
  
}