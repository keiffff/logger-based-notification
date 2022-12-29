import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { schema } from "~/schema";
import { Context } from "~/types/interfaces/context";
import { logger } from "~/helpers/logger";
import { toGraphQLError } from "~/errors/graphQLError";
import { ApplicationError } from "~/errors/applicationError";
import { ApolloLogPlugin } from "~/helpers/apollo";

const port = process.env.PORT || 8080;

const app = express();

const development = process.env.NODE_ENV === "development";

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const context: Context = {
      req,
      logger,
    };

    return context;
  },
  formatError: (e) => {
    if (e.originalError instanceof ApplicationError) {
      throw toGraphQLError(e.originalError);
    }

    throw e;
  },
  plugins: [
    ApolloLogPlugin({ logger }),
    ...(development
      ? [ApolloServerPluginLandingPageLocalDefault()]
      : [ApolloServerPluginLandingPageDisabled()]),
  ],
  introspection: development,
});

const main = async () => {
  await server.start();
  server.applyMiddleware({
    app,
  });

  app.listen({ port }, () => {
    if (development) {
      console.log(
        `🚀Apollo Server ready at http://localhost:${port}${server.graphqlPath}`
      );
    }
  });
};

main();
