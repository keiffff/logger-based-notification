import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  extend type Query {
    healthCheckMessage: String!
  }
`;
