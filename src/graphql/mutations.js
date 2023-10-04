import { gql } from "@apollo/client";

export const CREATE_CARD = gql`
  mutation CreateCard($content: String!, $columnId: String!, $order: Int!) {
    createCard(content: $content, columnId: $columnId, order: $order) {
      card {
        cardId
        cardContent
        columnId
        order
      }
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($cardId: ID!) {
    deleteCard(cardId: $cardId) {
      success
      cardId
    }
  }
`;

export const UPDATE_CARD_CONTENT = gql`
  mutation UpdateCardContent($cardId: ID!, $cardContent: String!) {
    updateCardContent(cardId: $cardId, cardContent: $cardContent) {
      success
      cardId
      cardContent
    }
  }
`;

export const UPDATE_MULTIPLE_CARD_ORDER = gql`
  mutation UpdateMultipleCardOrder(
    $cardsInput: [UpdateMultipleCardOrderInput!]!
  ) {
    updateMultipleCardOrder(cardsInput: $cardsInput) {
      success
      cards {
        cardId
        columnId
        cardContent
        order
      }
    }
  }
`;
