import React from 'react';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDeleteFieldFromEntityMutation } from 'services/entities/api';
import { setPaneContent } from 'services/pane/slice';
import AddFieldButton from './AddFieldButton';

const EntityFieldsTable = ({
  entity,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [deleteField] = useDeleteFieldFromEntityMutation();

  return (
    <>
      <AddFieldButton
        onClick={() => dispatch(
          setPaneContent({
            type: 'ENTITY_FIELD',
            entityId: entity.id,
            id: 'NEW',
          })
        )}
        style={{
          float: 'right',
          marginRight: 0,
        }}
      />
      <Table>
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>{t('type')}</th>
            <th
              style={{
                width: 60,
              }}
            >
              {t('required')}
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
                        onClick={() => deleteField({
                          entityId: entity.id,
                          id: field.id,
                        })}
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
                      onClick={() => dispatch(
                        setPaneContent({
                          type: 'ENTITY_FIELD',
                          entityId: entity.id,
                          id: field.id,
                        })
                      )}
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
                      onClick={() => deleteField({
                        entityId: entity.id,
                        id: field.id,
                      })}
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
