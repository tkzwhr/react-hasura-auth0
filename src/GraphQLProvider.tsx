import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import type React from "react";

type Props = {
  token: Promise<string>;
  uri: string;
  children: React.ReactNode;
};

export default function GraphQLProvider(props: Props) {
  const httpLink = createHttpLink({
    uri: props.uri,
  });
  const authLink = setContext(async (_, { headers }) => {
    const token = await props.token;
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
