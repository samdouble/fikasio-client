import React, { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AutosaveTextarea, Checkbox, Table } from '@fikasio/react-ui-components';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import links from 'utils/links';
import './ItemsList.scss';

const ItemsList = ({
  entity,
  items,
  onAddItem,
  onItemSelect,
  selectedItems,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [rows, setRows] = useState(items);

  useEffect(() => {
    setRows([
      ...((!items || !items.length) ? [{}] : []),
      ...(items || []),
    ]);
  }, [items]);

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter' && field.type !== 'TEXT') {
      onAddItem({})
        .then(resultItem => {
          if (resultItem) {
            // const elementWithId = document.getElementById(resultItem.id!);
            // TODO Make this work with refs
            // (elementWithId as HTMLElement).focus();
          }
        });
      e.preventDefault();
    }
  };

  const handleKeyUp = (e, updatedItem) => {
    if (!updatedItem && e.target.textContent !== '') {
      operations.items.createItem(entity.id, {})(dispatch);
    }
  };

  return (
    <Table
      columns={[
        {
          type: 'checkbox',
          isChecked: row => selectedItems.find(selectedItem => selectedItem.id === row.id),
          onClick: row => onItemSelect(row),
        },
        {
          type: 'numbering',
        },
        ...entity.fields
          .map(field => {
            return {
              name: field.name,
              render: row => {
                const defaultValue = row.values?.find(val => val.fieldId === field.id)?.value;
                if (['NUMBER', 'STRING', 'TEXT'].includes(field.type)) {
                  return (
                    <AutosaveTextarea
                      className="itemRow_field_editable"
                      defaultValue={defaultValue || ''}
                      onKeyDown={e => handleKeyDown(e, field)}
                      onKeyUp={e => handleKeyUp(e, row)}
                      onSave={async value => {
                        if (row.id) {
                          operations.items.updateFieldValueForItem(entity.id, row.id, field.id, {
                            value,
                          })(dispatch);
                        } else {
                          operations.items.createItem(entity.id, {
                            values: [{
                              fieldId: field.id,
                              value,
                            }],
                          })(dispatch);
                        }
                      }}
                      style={{
                        border: 'none',
                        height: 25,
                        overflowY: 'hidden',
                        paddingLeft: 5,
                        paddingRight: 50,
                        paddingTop: 0,
                        ...(field.type === 'TEXT' && {
                          resize: 'vertical',
                          width: '100%',
                        }),
                      }}
                      useContentEditableDiv
                    />
                  );
                } else if (field.type === 'BOOLEAN') {
                  return (
                    <Checkbox
                      defaultIsChecked={defaultValue || false}
                      onClick={async value => {
                        operations.items.updateFieldValueForItem(entity.id, row.id, field.id, {
                          value,
                        })(dispatch);
                      }}
                    />
                  );
                }
              },
              sortable: true,
              type: 'cell',
              value: row => row.values?.find(val => val.fieldId === field.id)?.value,
            };
          }),
        {
          type: 'options',
        },
      ]}
      options={row => (
        <Dropdown
          style={{
            position: 'static',
          }}
        >
          <Dropdown.Toggle as={DropdownToggle} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => history.push(links.itemUpsert(entity.id, row.id))}
            >
              <FontAwesomeIcon
                icon="edit"
                style={{
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('edit')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => operations.items.createItem(entity.id, row)(dispatch)}
            >
              <FontAwesomeIcon
                icon="copy"
                style={{
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('duplicate')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => operations.items.deleteItem(entity.id, row.id)(dispatch)}
            >
              <FontAwesomeIcon
                icon="times"
                style={{
                  color: 'red',
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('delete')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      rows={rows}
    />
  );
};

export default ItemsList;
