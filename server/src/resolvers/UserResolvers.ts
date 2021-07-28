import {Arg, Ctx, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware} from "type-graphql";
import { User } from "../entity/User";
import {compare, hash} from "bcryptjs";
import {sign} from "jsonwebtoken"
import { MyContext } from "src/types/Types";
import { isAuth } from "../middlewares/isAuth";



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
      await User.insert({
        email,
        password: await hash(password,12),
      })
    } catch(e){
      console.log(e);
      return false;
    }
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
      sign({userId: user.id,}, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '7d',
      }),
      {
        httpOnly: true,
      }
    );

    // login success
    return {
      accessToken: sign({userId:user.id}, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m",
      }),
    };
  }

}

@ObjectType()
class LoginResponse{
  @Field()
  accessToken: string;    
}