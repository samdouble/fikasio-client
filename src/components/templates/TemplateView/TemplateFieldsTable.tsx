import React from 'react';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setPaneContent } from 'services/pane/slice';
import { useDeleteFieldFromTemplateMutation } from 'services/templates/api';
import AddFieldButton from './AddFieldButton';

const TemplateFieldsTable = ({
  template,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [deleteTemplateField] = useDeleteFieldFromTemplateMutation();

  return (
    <>
      <AddFieldButton
        onClick={
          () => dispatch(
            setPaneContent({
              type: 'TEMPLATE_FIELD',
              templateId: template.id,
              id: 'NEW',
            })
          )
        }
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
            template.fields
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
                        onClick={() => deleteTemplateField({
                          templateId: template.id,
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
                      onClick={
                        () => dispatch(
                          setPaneContent({
                            type: 'TEMPLATE_FIELD',
                            templateId: template.id,
                            id: field.id,
                          })
                        )
                      }
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
                      onClick={() => deleteTemplateField({
                        templateId: template.id,
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

export default TemplateFieldsTable;
