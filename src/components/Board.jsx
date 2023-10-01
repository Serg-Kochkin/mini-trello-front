import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import MTContext from "../context/MTContext";
import List from "./List";

function Board() {
  const { data, onDragEnd } = useContext(MTContext);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex p-4 space-x-4">
        {data.lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;
