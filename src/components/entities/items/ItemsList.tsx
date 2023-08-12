import React from 'react';
import Table from 'react-bootstrap/Table';
import ItemRow from './ItemRow';

const ItemsList = ({
  entity,
  items,
}) => (
  <Table
    responsive
    bordered
    hover
  >
    <thead>
      <tr>
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
            key={item.id}
            item={item}
            no={i + 1}
          />
        ))
      }
    </tbody>
  </Table>
);

export default ItemsList;
