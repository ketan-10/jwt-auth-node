import {Arg, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root} from "type-graphql";
import { User } from "../entity/User";
import {hash} from "bcryptjs";



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

}