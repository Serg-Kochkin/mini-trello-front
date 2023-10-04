import React from "react";
import Board from "./Board";
import MTContext from "../context/MTContext";
import { useQuery, useMutation } from "@apollo/client";
import { TRELLO } from "../graphql/queries";
import {
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD_CONTENT,
  UPDATE_MULTIPLE_CARD_ORDER,
} from "../graphql/mutations";

function View() {
  const { loading, error, data } = useQuery(TRELLO);

  const [updateMultipleCardOrder] = useMutation(UPDATE_MULTIPLE_CARD_ORDER, {
    update: (cache, { data: { updateMultipleCardOrder } }) => {
      const existingData = cache.readQuery({ query: TRELLO });

      const updatedCards =
        updateMultipleCardOrder && updateMultipleCardOrder.cards;

      if (updatedCards) {
        const newCards = existingData.trello.cards.map((card) => {
          const updatedCard = updatedCards.find(
            (uCard) => uCard.cardId === card.cardId
          );
          return updatedCard || card;
        });

        const newData = {
          trello: {
            ...existingData.trello,
            cards: newCards,
          },
        };

        cache.writeQuery({ query: TRELLO, data: newData });
      }
    },
  });

  const [updateCardContent] = useMutation(UPDATE_CARD_CONTENT, {
    update: (cache, { data: { updateCardContent } }) => {
      const existingData = cache.readQuery({ query: TRELLO });

      const updatedCards = existingData.trello.cards.map((card) =>
        card.cardId === updateCardContent.cardId ? updateCardContent : card
      );

      const newData = {
        trello: {
          ...existingData.trello,
          cards: updatedCards,
        },
      };

      cache.writeQuery({ query: TRELLO, data: newData });
    },
  });

  const [createCard] = useMutation(CREATE_CARD, {
    update: (cache, { data: { createCard } }) => {
      const existingData = cache.readQuery({ query: TRELLO });

      const newData = {
        trello: {
          ...existingData.trello,
          cards: [...existingData.trello.cards, createCard.card],
        },
      };

      cache.writeQuery({ query: TRELLO, data: newData });
    },
  });

  const [deleteCard] = useMutation(DELETE_CARD, {
    update: (cache, { data }) => {
      if (data?.deleteCard?.cardId) {
        const existingData = cache.readQuery({ query: TRELLO });

        const filteredCards = existingData.trello.cards.filter(
          (card) => card.cardId !== data.deleteCard.cardId
        );

        const newData = {
          trello: {
            ...existingData.trello,
            cards: filteredCards,
          },
        };

        cache.writeQuery({ query: TRELLO, data: newData });
      }
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const startColumn = data.trello.columns.find(
      (column) => column.columnId === source.droppableId
    );

    const finishColumn = data.trello.columns.find(
      (column) => column.columnId === destination.droppableId
    );

    // Moving within the same column
    if (startColumn === finishColumn) {
      const cardsInColumn = data.trello.cards
        .filter((card) => card.columnId === source.droppableId)
        .sort((a, b) => a.order - b.order);

      const draggedCard = cardsInColumn[source.index];

      cardsInColumn.splice(source.index, 1);
      cardsInColumn.splice(destination.index, 0, draggedCard);

      const updatedCards = cardsInColumn.map((card, index) => ({
        cardId: card.cardId,
        columnId: card.columnId,
        cardContent: card.cardContent,
        order: index,
      }));

      updateMultipleCardOrder({ variables: { cardsInput: updatedCards } });
    } else {
      // Moving between different columns
      const startCards = data.trello.cards
        .filter((card) => card.columnId === source.droppableId)
        .sort((a, b) => a.order - b.order);

      const finishCards = data.trello.cards
        .filter((card) => card.columnId === destination.droppableId)
        .sort((a, b) => a.order - b.order);

      const draggedCard = startCards[source.index];
      startCards.splice(source.index, 1);
      finishCards.splice(destination.index, 0, draggedCard);

      const updatedStartCards = startCards
        .map((card, index) => {
          if (!card) {
            console.error("Undefined card in startCards at index:", index);
            return null;
          }
          return {
            cardId: card.cardId,
            columnId: card.columnId,
            cardContent: card.cardContent,
            order: index,
          };
        })
        .filter(Boolean);

      const updatedFinishCards = finishCards
        .map((card, index) => {
          if (!card) {
            console.error("Undefined card in finishCards at index:", index);
            return null;
          }
          return {
            cardId: card.cardId,
            columnId: destination.droppableId,
            cardContent: card.cardContent,
            order: index,
          };
        })
        .filter(Boolean);

      updateMultipleCardOrder({
        variables: {
          cardsInput: [...updatedStartCards, ...updatedFinishCards],
        },
      });
    }
  };

  const handleAddCard = (columnId) => {
    const columnCards = data.trello.cards.filter(
      (card) => card.columnId === columnId
    );

    const nextOrder =
      columnCards.length > 0
        ? Math.max(...columnCards.map((card) => card.order)) + 1
        : 0;

    const content = prompt("Enter card content");
    if (content) {
      createCard({
        variables: {
          content: content,
          columnId: columnId,
          order: nextOrder,
        },
      });
    }
  };

  const handleDeleteCard = (cardIdToDelete) => {
    deleteCard({ variables: { cardId: cardIdToDelete } });
  };
  const handleUpdateCard = (cardId) => {
    const cards = data.trello.cards;
    const currentContent = cards.find(
      (card) => card.cardId === cardId
    )?.cardContent;
    const newContent = prompt("Update card content", currentContent);

    if (newContent && newContent !== currentContent) {
      updateCardContent({
        variables: {
          cardId: cardId,
          cardContent: newContent,
        },
      });
    }
  };

  return (
    <MTContext.Provider
      value={{
        data,
        handleAddCard,
        handleDeleteCard,
        handleUpdateCard,
        onDragEnd,
      }}
    >
      <Board />
    </MTContext.Provider>
  );
}

export default View;
