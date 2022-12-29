import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-errors";
import { ApplicationError, ERROR_CODE } from "./applicationError";

export class NotFoundError extends ApolloError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, "NOT_FOUND_ERROR", extensions);

    Object.defineProperty(this, "name", { value: "NotFoundError" });
  }
}

export class InternalServerError extends ApolloError {
  constructor(message: string, extensions?: Record<string, any>) {
    super(message, "INTERNAL_SERVER_ERROR", extensions);

    Object.defineProperty(this, "name", { value: "InternalServerError" });
  }
}

export {
  AuthenticationError,
  UserInputError,
  ForbiddenError,
} from "apollo-server-express";

export const toGraphQLError = (
  e: ApplicationError
):
  | UserInputError
  | AuthenticationError
  | ForbiddenError
  | NotFoundError
  | InternalServerError => {
  switch (e.code) {
    case ERROR_CODE.BAD_REQUEST: {
      return new UserInputError(e.message);
    }
    case ERROR_CODE.UNAUTHENTICATED: {
      return new AuthenticationError(e.message);
    }
    case ERROR_CODE.FORBIDDEN: {
      return new ForbiddenError(e.message);
    }
    case ERROR_CODE.NOT_FOUND: {
      return new NotFoundError(e.message);
    }
    case ERROR_CODE.INTERNAL_SERVER_ERROR: {
      return new InternalServerError(e.message);
    }
    default: {
      return new InternalServerError(e.message);
    }
  }
};
