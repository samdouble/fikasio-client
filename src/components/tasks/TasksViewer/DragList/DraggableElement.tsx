import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ListItem from './ListItem';

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #ffffff;
`;

interface DraggableElementProps {
  prefix: string;
  elements: any[];
}

const DraggableElement = ({
  prefix,
  elements,
}: DraggableElementProps) => (
  <DroppableStyles>
    <ColumnHeader>{prefix}</ColumnHeader>
    <Droppable
      droppableId={`${prefix}`}
    >
      {
        provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {
              elements
                .map((item, index) => (
                  <ListItem
                    key={item.id}
                    index={index}
                    item={item}
                  />
                ))
            }
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>
  </DroppableStyles>
);

export default DraggableElement;
