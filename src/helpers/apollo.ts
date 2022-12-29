import { ApolloServer } from "apollo-server-express";
import { DefinitionNode, OperationDefinitionNode, parse } from "graphql";
import { ApplicationError } from "~/errors/applicationError";
import { Logger } from "~/types/interfaces/logger";

type ApolloServerPlugin = NonNullable<
  ConstructorParameters<typeof ApolloServer>[0]["plugins"]
>[number];

export const ApolloLogPlugin = ({
  logger,
}: {
  logger: Logger;
}): ApolloServerPlugin => ({
  // eslint-disable-next-line @typescript-eslint/require-await
  async requestDidStart({ request }) {
    const query = request.query?.replace(/\n/g, "");
    const variables = Object.keys(request.variables ?? {});

    // introspectionの場合には、ログを出力してもしょうがないので弾く
    if (!query || isIntrospectionQuery(query)) {
      return;
    }

    logger.info("request started", {
      query,
      variables,
    });

    return {
      // eslint-disable-next-line @typescript-eslint/require-await
      async didEncounterErrors({ errors, operationName }) {
        for (const error of errors) {
          logger.error(error.message, {
            operationName,
            stack: error.stack,
            extensions:
              error.originalError instanceof ApplicationError
                ? error.originalError.metadata
                : {},
          });
        }
      },
    };
  },
});

/**
 * リクエストされたqueryが、IntrospectionQueryに合致するか判定する
 *
 * @param query リクエストに含まれる、GraphQL query
 */
const isIntrospectionQuery = (query: string) => {
  const document = parse(query);

  const operationDefinitions = document.definitions.filter(
    (definition: DefinitionNode): definition is OperationDefinitionNode =>
      definition.kind === "OperationDefinition"
  );

  // IntrospectionQueryの場合、operationDefinitionは必ず1件になるため
  if (operationDefinitions.length > 1) {
    return false;
  }

  const selectionNodes = operationDefinitions[0]?.selectionSet.selections ?? [];

  // IntrospectionQueryの場合、selectionNodeは必ず1件になるため
  if (selectionNodes.length > 1) {
    return false;
  }

  const selectionNode = selectionNodes[0];

  return (
    selectionNode?.kind === "Field" && selectionNode.name.value === "__schema"
  );
};
