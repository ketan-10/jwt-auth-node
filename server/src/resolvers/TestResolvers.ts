import {Arg, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root} from "type-graphql";

// Docs: https://typegraphql.com/docs/resolvers.html
// Schema: https://github.com/ketan-10/apollo-graphQL-odyssey/blob/master/server/src/schema.js
// Resolvers: https://github.com/ketan-10/apollo-graphQL-odyssey/blob/master/server/src/resolvers/rest-datasource-resolvers.js


@ObjectType()
class NestedObject {
  @Field()
  value: number;
}

@ObjectType()
class Track {
  @Field()
  id: string;

  @Field()
  name: string;

  // inline declarative resolver
  // this.name will not work: as it is resolved by antoher resolver, latter. ?
  @Field(type => String, {nullable: true})
  auther(): string | null{
    if(!this.id) return null;
    return `Auther For Id: ${this.id}`;
  }

  @Field({nullable: true})
  nestedObject?: NestedObject;
}

export class MainResolvers {
  @Query(()=> [Track])
  async tracksForHome(){
    return [
      {
        id: "t1",
      },
      {
        id: "t2",
        nestedObject:{
          value: 2,
        }
      },
    ];
  }

}

@Resolver(of => Track)
export class TrackResolver{

  @FieldResolver(()=> String)
  name(@Root() track: Track){
    return `name: ${track.id}`;
  }

}


// {
//   typeDefs: gql`
//     type Query {
//       hello: String
//     }
//   `,
//   resolvers: {
//     Query: {
//       hello: ()=> {
//         return "Hello World";
//       }
//     }
//   }
// }
