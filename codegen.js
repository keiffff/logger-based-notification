const disableEslintPlugin = { add: { content: "/* eslint-disable */" } };

module.exports = {
  schema: ["./src/**/typedefs.ts"],
  overwrite: true,
  generates: {
    "./src/types/graphql.d.ts": {
      plugins: [disableEslintPlugin, "typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        maybeValue: "T | undefined",
        namingConvention: {
          transformUnderscore: true,
        },
        enumsAsTypes: true,
        contextType: "./resolverContext#Context",
      },
    },
  },
};
