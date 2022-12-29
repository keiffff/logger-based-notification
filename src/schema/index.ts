import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { healthModule } from "~/modules";
import { baseTypeDefs } from "./base/typedefs";

export const schema = makeExecutableSchema({
  resolvers: mergeResolvers([healthModule.resolvers]),
  typeDefs: mergeTypeDefs([baseTypeDefs, healthModule.typeDefs]),
});
