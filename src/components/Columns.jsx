import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import MTContext from "../context/MTContext";
import { AddIcon } from "../static/icons";

function Columns({ column }) {
  const { data, handleAddCard } = useContext(MTContext);

  const cards = data.trello.cards
    .filter((card) => card.columnId === column.columnId)
    .sort((a, b) => a.order - b.order);

  return (
    <Droppable droppableId={column.columnId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-200 p-2 w-64 h-full rounded-lg"
        >
          <h2 className="font-bold m-3 mb-4">{column.columnName}</h2>
          {}
          {cards.map((card) => {
            return <Card key={card.cardId} card={card} />;
          })}
          <button
            className="bg-gray-300 hover:bg-gray-400 mt-2 w-full text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={() => handleAddCard(column.columnId)}
          >
            <AddIcon />
            <span>Add Card</span>
          </button>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Columns;
