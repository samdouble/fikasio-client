import React, { useState } from 'react';
import RBTable from 'react-bootstrap/Table';
import Checkbox from 'components/UI/Checkbox';
import './Table.scss';

const Table = ({
  columns,
  options,
  rows,
}) => {
  const [orderedBy, setOrderedBy] = useState(null);

  return (
    <RBTable
      responsive
      bordered
      hover
    >
      <thead>
        <tr>
          {
            columns
              .map(column => {
                if (column.type === 'cell') {
                  return (
                    <th
                      key={column.name}
                      onClick={() => setOrderedBy(column)}
                      style={{
                        ...column.sortable && ({ cursor: 'pointer' }),
                      }}
                    >
                      {column.name}
                    </th>
                  );
                } else if (column.type === 'checkbox') {
                  return (
                    <th
                      className="itemStaticColumn-left"
                      style={{
                        textAlign: 'center',
                        width: 35,
                      }}
                    />
                  );
                } else if (column.type === 'numbering') {
                  return (
                    <th
                      style={{
                        width: 30,
                      }}
                    />
                  );
                } else if (column.type === 'options') {
                  return (
                    <th
                      className="itemStaticColumn-right"
                      style={{
                        textAlign: 'center',
                        width: 35,
                      }}
                    />
                  );
                }
              })
          }
        </tr>
      </thead>
      <tbody>
        {
          rows?.map((row, index) => {
            return (
              <tr className="itemRow">
                {
                  columns
                    .map(column => {
                      if (column.type === 'cell') {
                        return (
                          <td
                            className="itemRow_field"
                          >
                            {
                              column.render
                                ? column.render(row)
                                : row[column.property]
                            }
                          </td>
                        );
                      } else if (column.type === 'checkbox') {
                        return (
                          <td
                            className="itemStaticColumn-left"
                          >
                            <Checkbox
                              isChecked={column.isChecked(row)}
                              onClick={() => column.onClick(row)}
                            />
                          </td>
                        );
                      } else if (column.type === 'numbering') {
                        return (
                          <td>
                            {index + 1}
                          </td>
                        );
                      } else if (column.type === 'options') {
                        return (
                          <td
                            className="itemStaticColumn-right"
                          >
                            {options(row)}
                          </td>
                        );
                      }
                    })
                }
              </tr>
            );
          })
        }
      </tbody>
    </RBTable>
  );
}

export default Table;
