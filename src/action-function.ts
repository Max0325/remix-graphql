import { GraphQLError, GraphQLSchema } from "graphql";
import { ActionFunction, json } from "remix";
import { Readable } from "stream";
import { CustomContext } from "./context";
import { deriveStatusCode as defaultDeriveStatusCode } from "./derive-status-code";
import { handleRequest } from "./handle-request";

export function getActionFunction({
  schema,
  context,
  deriveStatusCode,
}: {
  schema: GraphQLSchema;
  context?: CustomContext;
  deriveStatusCode?: typeof defaultDeriveStatusCode;
}): ActionFunction {
  return async ({ request }) => {
    const json = await request.json();
    return handleRequest({
      remixRequest: request,
      request: {
        body: json,
        headers: request.headers,
        method: request.method,
        query: new URL(request.url).searchParams,
      },
      schema,
      context,
      deriveStatusCode,
    });
  };
}
