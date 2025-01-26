import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import AssigneeButton from 'components/tasks/TasksViewer/AssigneeButton';

const CardHeader = styled.div`
  font-weight: 500;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

interface ListItemProps {
  item: any;
  index: number;
}

const ListItem = ({
  item,
  index,
}: ListItemProps) => {
  return (
    <Draggable
      draggableId={item.id}
      index={index}
    >
      {
        (provided, snapshot) => {
          return (
            <DragItem
              ref={provided.innerRef}
              snapshot={snapshot}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                position: 'relative',
              }}
            >
              <CardHeader>{item.content}</CardHeader>
              <span>Content</span>
              <CardFooter>
                <Author>
                  {item.id}
                  <AssigneeButton
                    assigneeId={item.assigneeId}
                    style={{
                      bottom: 10,
                      position: 'absolute',
                      right: 10,
                    }}
                  />
                </Author>
              </CardFooter>
            </DragItem>
          );
        }
      }
    </Draggable>
  );
};

export default ListItem;
