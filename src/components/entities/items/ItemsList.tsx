import React from 'react';
import Table from 'react-bootstrap/Table';
import ItemRow from './ItemRow';
import './ItemsList.scss';

const ItemsList = ({
  entity,
  items,
  onAddItem,
  onItemSelect,
  selectedItems,
}) => {
  const addItem = async item => {
    onAddItem(item)
      .then(resultItem => {
        if (resultItem) {
          const elementsWithClassname = document.getElementsByClassName(resultItem.id!);
          const nbElementsWithClassname = elementsWithClassname.length;
          (elementsWithClassname[nbElementsWithClassname - 1] as HTMLElement).focus();
        }
      });
  };

  return (
    <Table
      responsive
      bordered
      hover
    >
      <thead>
        <tr>
          <th />
          <th
            style={{
              width: 30,
            }}
          />
          {
            entity.fields
              .map(field => (
                <th key={field.name}>
                  {field.name}
                </th>
              ))
          }
          <th colSpan={2} />
        </tr>
      </thead>
      <tbody>
        {
          items?.map((item, i) => (
            <ItemRow
              entity={entity}
              isSelected={selectedItems.find(selectedItem => item.id === selectedItem.id)}
              item={item}
              key={item.id}
              no={i + 1}
              onAddItem={addItem}
              onSelect={onItemSelect}
            />
          ))
        }
      </tbody>
    </Table>
  );
};

export default ItemsList;
