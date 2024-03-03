import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  Observable,
  ApolloLink,
  from,
  HttpLink,
} from "@apollo/client"

import { createUploadLink } from "apollo-upload-client"
import { onError } from "@apollo/client/link/error"
import { URL_SERVER } from "./variables"
import { useGlobalStore } from "@/storage/GlobalStorage"

const UNEXPECTED_ERROR = "UnexpectedError";
const UNAUTHENTICATED_ERROR = "UnauthenticatedError";

async function RefreshTokens(client: ApolloClient<NormalizedCacheObject>) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation RefreshTokens {
        refreshTokens
      }
    `,
  })
  const newAccessToken = data?.refreshTokens
  return `${newAccessToken}`
}

let retryCount = 0
const maxRetry = 3

function createErrorObservable(error: any, eventName: string): Observable<never> {
  return new Observable((observer) => {
    window.dispatchEvent(new Event(eventName));
    observer.error(error)
  })
}

const errorLink = onError(({ networkError, graphQLErrors, operation, forward }) => {
  if (networkError) {
    return createErrorObservable(networkError, UNEXPECTED_ERROR);
  }
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.message === "Unauthorized" && retryCount < maxRetry) {
        retryCount++
        return new Observable((observer) => {
          RefreshTokens(client)
            .then((token) => {
              console.log("token", token)
              useGlobalStore.setState({ token });
              operation.setContext((previousContext: any) => ({
                headers: {
                  ...previousContext.headers,
                  authorization: `Bearer ${token}`,
                },
              }))
              const forward$ = forward(operation)
              forward$.subscribe(observer)
            })
            .catch((error) => observer.error(error))
        })
      } else if (err.message === "Unauthorized") {
        return createErrorObservable(err, UNAUTHENTICATED_ERROR);
      }
    }
  }
})

const linkConfig = {
  uri: `${URL_SERVER}/graphql`,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "apollo-require-preflight": "true",
  }
};

const uploadLink = createUploadLink(linkConfig);

const authMiddleware = new ApolloLink((operation, forward) => {
  const { token } = useGlobalStore.getState();
  operation.setContext(({ headers }: any) => ({
    fetchOptions: {
      credentials: 'include',
    },
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }));
  return forward(operation);
});

export const client = new ApolloClient({
  ...linkConfig,
  cache: new InMemoryCache({}),
  link: from([authMiddleware, errorLink, uploadLink]),
});

const httpLink = new HttpLink({
  uri: `${URL_SERVER}/graphql`,
});