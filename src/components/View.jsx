import React, { useState } from "react";
import Board from "./Board";
import MTContext from "../context/MTContext";
// import { useQuery } from "@apollo/client";
// import { GET_DATA } from "../queries";

function View() {
  const [data, setData] = useState({
    lists: [
      { id: "list-1", title: "TODO", cardIds: ["card-1", "card-2"] },
      { id: "list-2", title: "In Progress", cardIds: ["card-3"] },
      { id: "list-3", title: "Done", cardIds: ["card-4"] },
    ],
    cards: {
      "card-1": { id: "card-1", content: "Card #1" },
      "card-2": { id: "card-2", content: "Card #2" },
      "card-3": { id: "card-3", content: "Card #3" },
      "card-4": { id: "card-4", content: "Card #4" },
    },
  });
  // const { loading, error, data } = useQuery(GET_DATA);

  // if (loading) return "Loading...";
  // if (error) return `Error: ${error.message}`;

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If the element was not moved to a valid target or moved back to its place
    if (!destination) {
      return;
    }

    const startList = data.lists.find((list) => list.id === source.droppableId);
    const finishList = data.lists.find(
      (list) => list.id === destination.droppableId
    );

    // Moving within the same list
    if (startList === finishList) {
      const newCardIds = Array.from(startList.cardIds);
      const [movedCard] = newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, movedCard);

      const updatedList = {
        ...startList,
        cardIds: newCardIds,
      };

      const updatedData = {
        ...data,
        lists: data.lists.map((list) =>
          list.id === updatedList.id ? updatedList : list
        ),
      };
      console.log("ORDER", updatedData);
      // setData(updatedData);
      return;
    }

    // Moving between different lists
    const startCardIds = Array.from(startList.cardIds);
    const [movedCard] = startCardIds.splice(source.index, 1);
    const updatedStartList = {
      ...startList,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finishList.cardIds);
    finishCardIds.splice(destination.index, 0, movedCard);
    const updatedFinishList = {
      ...finishList,
      cardIds: finishCardIds,
    };

    const updatedData = {
      ...data,
      lists: data.lists.map((list) => {
        if (list.id === updatedStartList.id) return updatedStartList;
        if (list.id === updatedFinishList.id) return updatedFinishList;
        return list;
      }),
    };
    console.log("Columns", updatedData);
    setData(updatedData);
  };

  const handleAddCard = (listId) => {
    const newCardId = "card-" + (Math.random() * 1000).toFixed(0);
    const newCard = {
      id: newCardId,
      content: prompt("Enter card content"),
    };

    const list = data.lists.find((l) => l.id === listId);
    list.cardIds.push(newCardId);

    setData({
      ...data,
      cards: {
        ...data.cards,
        [newCardId]: newCard,
      },
    });
  };

  const handleRemoveCard = (cardId) => {
    const newCards = { ...data.cards };
    delete newCards[cardId];

    const lists = data.lists.map((list) => {
      return {
        ...list,
        cardIds: list.cardIds.filter((id) => id !== cardId),
      };
    });

    setData({
      ...data,
      cards: newCards,
      lists: lists,
    });
  };

  const handleUpdateCard = (cardId) => {
    const newContent = prompt(
      "Update card content",
      data.cards[cardId].content
    );

    if (newContent) {
      const updatedCard = {
        ...data.cards[cardId],
        content: newContent,
      };

      setData({
        ...data,
        cards: {
          ...data.cards,
          [cardId]: updatedCard,
        },
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold m-4">Mini Trello</h1>
      <MTContext.Provider
        value={{
          data,
          handleAddCard,
          handleRemoveCard,
          handleUpdateCard,
          onDragEnd,
        }}
      >
        <Board />
      </MTContext.Provider>
    </div>
  );
}

export default View;
