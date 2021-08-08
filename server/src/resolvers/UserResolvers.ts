import {Arg, Ctx, Field, FieldResolver, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware} from "type-graphql";
import { User } from "../entity/User";
import {compare, hash} from "bcryptjs";
import {sign} from "jsonwebtoken"
import { MyContext } from "src/types/Types";
import { isAuth } from "../middlewares/isAuth";
import { createAccessToken, createRefreshToken } from "../helpers/generateTokens";
import { getConnection } from "typeorm";



// Type-graphql will generate the following resolvers and schema:
@Resolver()
export class UserResolvers {
  // Query type with string return type 
  @UseMiddleware(isAuth)
  @Query(()=> [User])
  users(@Ctx() context: MyContext){
    console.log("From user: "+context.userId);
    return User.find();
  }

  // Mutation to Register user with boolean return type
  @Mutation(()=> Boolean)
  // register field
  async register(
    @Arg("email", ()=> String) email: string,
    @Arg("password", ()=> String) password: string){
    try{
      // insert into db
      const insertedUser = await User.insert({
        email,
        password: await hash(password,12),
      });
      console.log(insertedUser);
    } catch(e){
      console.log(e);
      return false;
    }
    return true;
  }


  // Revoke Refresh-Token
  @UseMiddleware(isAuth)
  @Mutation(()=> Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", ()=> Int) userId: number): Promise<boolean>{
    await getConnection().getRepository(User).increment({id: userId}, 'tokenVersion', 1);
    return true;
  }
  
  // Mutation to login user with boolean return type
  @Mutation(()=> LoginResponse)
  async login(
    @Arg("email", ()=> String) email: string,
    @Arg("password", ()=> String) password: string,
    @Ctx() {req, res}: MyContext) :
    Promise<LoginResponse> {

    const user = await User.findOne({ where: { email } });
    if(!user){
      throw new Error("User not found");
    }

    const valid = await compare(password, user.password);
    if(!valid){
      throw new Error("Invalid password");
    }

    res.cookie(
      'refresh-token',
      createRefreshToken(user),
      {
        httpOnly: true,
      }
    );

    // login success
    return {
      accessToken: createAccessToken(user),
    };
  }

}

@ObjectType()
class LoginResponse{
  @Field()
  accessToken: string;    
}