import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import MTContext from "../context/MTContext";
import Columns from "./Columns";

function Board() {
  const { data, onDragEnd } = useContext(MTContext);

  // Hardcoded choosen board.
  const active_board = data.trello.boards[0];

  const columns = data.trello.columns.sort((a, b) => a.order - b.order);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <>
        <div className="flex flex-row min-h-screen">
          <div className="w-64 px-4 py-8 bg-gray-200">
            <h1 className="text-3xl font-semibold mb-4">Mini Trello</h1>
            <ul>
              {data.trello.boards.map((board) => (
                <li
                  className="mb-2 p-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded"
                  key={board.boardId}
                >
                  {board.boardName}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold m-4">{active_board.boardName}</h2>
            <div className="flex p-4 space-x-4">
              {columns.map((column) => (
                <Columns key={column.columnId} column={column} />
              ))}
            </div>
          </div>
        </div>
      </>
    </DragDropContext>
  );
}

export default Board;
