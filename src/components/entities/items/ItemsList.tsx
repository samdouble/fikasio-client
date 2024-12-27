import React from 'react';
import Table from 'react-bootstrap/Table';
import { Checkbox } from '@fikasio/react-ui-components';
import ItemRow from './ItemRow';
import './ItemsList.scss';

const ItemsList = ({
  entity,
  items,
  onAddItem,
  onItemSelect,
  onSelectAllItems,
  selectedItems,
}) => {
  const allItemsAreChecked = !!items?.length
    && (items?.length === selectedItems.length);

  const addItem = async item => {
    onAddItem(item)
      .then(async ({ data: resultItem}) => {
        if (resultItem) {
          await new Promise(resolve => setTimeout(resolve, 200));
          const elementsWithClassname = document.getElementsByClassName(resultItem.id);
          const nbElementsWithClassname = elementsWithClassname.length;
          if (nbElementsWithClassname) {
            (elementsWithClassname[nbElementsWithClassname - 1] as HTMLElement).focus();
          }
        }
      });
  };

  return (
    <Table
      bordered
      hover
      responsive
      style={{
        overflowX: 'scroll',
      }}
    >
      <thead>
        <tr>
          <th
            style={{ width: 35 }}
          >
            <Checkbox
              isChecked={allItemsAreChecked}
              onClick={() => {
                if (allItemsAreChecked) {
                  onSelectAllItems([]);
                } else {
                  onSelectAllItems(items);
                }
              }}
            />
          </th>
          {
            entity.fields
              .map(field => (
                <th key={field.id}>
                  {field.name}
                </th>
              ))
          }
          <th style={{ width: 35 }} />
        </tr>
      </thead>
      <tbody>
        {
          (!items || !items.length)
            && (
              <ItemRow
                entity={entity}
                onAddItem={addItem}
                onSelect={onItemSelect}
                item={{}}
              />
            )
        }
        {
          items?.sort((t1, t2) => {
              if (!t1.createdAt) return -1;
              if (!t2.createdAt) return 1;
              return t1.createdAt < t2.createdAt ? -1 : 1;
            })
            .map(item => (
              <ItemRow
                entity={entity}
                isSelected={!!selectedItems.find(t1 => item.id === t1.id)}
                key={`${item.id}-${item.dueAt}`}
                onAddItem={addItem}
                onSelect={onItemSelect}
                item={item}
              />
            ))
        }
      </tbody>
    </Table>
  );
};

export default ItemsList;
