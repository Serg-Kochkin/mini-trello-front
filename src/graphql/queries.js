import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query {
    lists {
      id
      title
      cardIds
    }
    cards {
      id
      content
    }
  }
`;
