import { gql } from "@apollo/client";

export const TRELLO = gql`
  query trello {
    trello {
      boards {
        boardId
        boardName
      }
      columns {
        columnId
        columnName
        order
      }
      cards {
        columnId
        cardId
        cardContent
        order
      }
    }
  }
`;
