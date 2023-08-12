import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

function DragList({ tasks }) {
  const lists = ["Todo", "InProgress", "Done"];

  const generateLists = () => lists
    .reduce((acc, listKey) => ({
        ...acc,
        [listKey]: tasks
          .map(task => ({
            id: `${task.id || task.taskId}${task.dueAt}-${listKey}`,
            prefix: `${task.id}-${listKey}`,
            content: task.description,
            task,
          })),
      }),
      {},
    );
  const [elements, setElements] = React.useState(generateLists());

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index,
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement,
    );

    setElements(listCopy);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className="tasksBoard_section"
          style={{
            backgroundColor: '#ffffff',
          }}
        >
          {
            lists.map(listKey => (
              <DraggableElement
                elements={elements[listKey]}
                key={listKey}
                prefix={listKey}
              />
            ))
          }
        </div>
      </DragDropContext>
    </div>
  );
}

export default DragList;
