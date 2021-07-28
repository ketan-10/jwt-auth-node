import {Arg, Ctx, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root} from "type-graphql";
import { User } from "../entity/User";
import {compare, hash} from "bcryptjs";
import {sign} from "jsonwebtoken"
import { MyContext } from "src/types/MyContext";



// Type-graphql will generate the following resolvers and schema:
@Resolver()
export class UserResolvers {
  // Query type with string return type 
  @Query(()=> [User])
  users(){
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
      sign({userId: user.id,}, 'my-secrate-ref', {
        expiresIn: '7d',
      }),
      {
        httpOnly: true,
      }
    );

    // login success
    return {
      accessToken: sign({userId:user.id}, "my-secret-acc", {
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