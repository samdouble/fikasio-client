import React from 'react';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { operations } from 'services';
import AddFieldButton from './AddFieldButton';

const EntityFieldsTable = ({
  entity,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <AddFieldButton
        onClick={() => operations.pane.setPaneContent({
          type: 'ENTITY_FIELD',
          entityId: entity.id,
          id: 'NEW',
        })(dispatch)}
        style={{
          float: 'right',
          marginRight: 0,
        }}
      />
      <Table>
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>Type</th>
            <th
              style={{
                width: 60,
              }}
            >
              Requis
            </th>
            <th
              style={{
                width: 35,
              }}
            />
            <th
              style={{
                width: 35,
              }}
            />
          </tr>
        </thead>
        <tbody>
          {
            entity.fields
              .map(field => (
                <tr key={field.id}>
                  <td>
                    {field.name}
                  </td>
                  <td>
                    {field.type}
                  </td>
                  <td>
                    {
                      field.isRequired && <FontAwesomeIcon
                        icon="check"
                        size="1x"
                        onClick={() => operations.entities.fields.deleteField(entity.id, field.id)}
                        style={{
                          color: 'blue',
                          cursor: 'pointer',
                          marginLeft: 10,
                        }}
                      />
                    }
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon="edit"
                      onClick={() => operations.pane.setPaneContent({
                        type: 'ENTITY_FIELD',
                        entityId: entity.id,
                        id: field.id,
                      })(dispatch)}
                      size="1x"
                      style={{
                        color: 'blue',
                        cursor: 'pointer',
                        marginLeft: 10,
                      }}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon="times"
                      size="1x"
                      onClick={() => operations.entities.fields.deleteField(entity.id, field.id)(dispatch)}
                      style={{
                        color: '#ce0000',
                        cursor: 'pointer',
                        marginLeft: 10,
                      }}
                    />
                  </td>
                </tr>
              ))
          }
        </tbody>
      </Table>
    </>
  );
};

export default EntityFieldsTable;
