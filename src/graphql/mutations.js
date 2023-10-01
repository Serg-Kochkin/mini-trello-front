import { gql } from "@apollo/client";

export const ADD_CARD = gql`
  mutation AddCard($content: String!) {
    addCard(content: $content) {
      id
      content
    }
  }
`;

// Добавьте другие мутации по мере необходимости
