import { logger } from "~/helpers/logger";
import { Resolvers } from "~/types/graphql";

export const resolvers: Resolvers = {
  Query: {
    healthCheckMessage: (_root, _args) => {
      logger.info("Health Check OK");

      return "OK";
    },
  },
};
