import { gql } from 'apollo-server-express';

export const baseTypeDefs = gql`
  type Query {
    _dummy: Boolean
  }

  type Mutation {
    _dummy: Boolean
  }

  type Subscription {
    _dummy: Boolean
  }
`;
