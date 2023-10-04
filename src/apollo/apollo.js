import { ApolloClient, InMemoryCache } from "@apollo/client";
import { columnsVar, cardsVar } from "./apolloState";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        columns: {
          read() {
            return columnsVar();
          },
        },
        cards: {
          read() {
            return cardsVar();
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

export default client;
