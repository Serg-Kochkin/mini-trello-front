import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import MTContext from "../context/MTContext";
import { PencilIcon, TrashIcon } from "../static/icons";

function Card({ card }) {
  const { handleDeleteCard, handleUpdateCard } = useContext(MTContext);

  return (
    <Draggable draggableId={card.cardId} index={card.order}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex items-center justify-between card-container bg-white p-2 rounded mt-2 border shadow-sm"
        >
          <span className="mr-4 truncate">{card.cardContent}</span>
          <div className="flex">
            <button
              onClick={() => handleUpdateCard(card.cardId)}
              className="p-2 bg-slate-500 hover:bg-slate-600 rounded text-white mr-2"
            >
              <PencilIcon />
            </button>
            <button
              onClick={() => handleDeleteCard(card.cardId)}
              className="p-2 bg-rose-500 hover:bg-rose-600 rounded text-white"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
