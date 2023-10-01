import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import MTContext from "../context/MTContext";

function List({ list }) {
  const { data, handleAddCard } = useContext(MTContext);

  return (
    <Droppable droppableId={list.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-200 p-2 w-64 h-full rounded-lg"
        >
          <h2 className="font-bold m-3 mb-4">{list.title}</h2>
          {list.cardIds.map((cardId, index) => {
            const card = data.cards[cardId];
            return <Card key={card.id} card={card} index={index} />;
          })}
          {provided.placeholder}
          <button
            className="bg-gray-300 hover:bg-gray-400 mt-2 w-full text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={() => handleAddCard(list.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>Add Card</span>
          </button>
        </div>
      )}
    </Droppable>
  );
}

export default List;
