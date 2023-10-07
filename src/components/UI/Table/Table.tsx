import React, { useState } from 'react';
import RBTable from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
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
                      className={classNames({
                        'sortable-column': column.sortable,
                      })}
                      key={column.name}
                      onClick={() => setOrderedBy(column)}
                    >
                      {column.name}
                      <span
                        className="sortable-column-buttons"
                      >
                        <FontAwesomeIcon
                          icon="caret-up"
                          size="1x"
                        />
                      </span>
                    </th>
                  );
                } else if (column.type === 'checkbox') {
                  return (
                    <th
                      className="itemStaticColumn-left"
                      key={column.name}
                      style={{
                        textAlign: 'center',
                        width: 35,
                      }}
                    />
                  );
                } else if (column.type === 'numbering') {
                  return (
                    <th
                      key={column.name}
                      style={{
                        width: 30,
                      }}
                    />
                  );
                } else if (column.type === 'options') {
                  return (
                    <th
                      className="itemStaticColumn-right"
                      key={column.name}
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
                            key={column.name}
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
                            key={column.name}
                          >
                            <Checkbox
                              isChecked={column.isChecked(row)}
                              onClick={() => column.onClick(row)}
                            />
                          </td>
                        );
                      } else if (column.type === 'numbering') {
                        return (
                          <td
                            key={column.name}
                          >
                            {index + 1}
                          </td>
                        );
                      } else if (column.type === 'options') {
                        return (
                          <td
                            className="itemStaticColumn-right"
                            key={column.name}
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
