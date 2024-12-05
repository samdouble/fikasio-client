import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import usePrevious from 'use-previous';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEqual from 'lodash.isequal';
import { AutosaveTextarea, Checkbox } from '@fikasio/react-ui-components';
import DropdownToggle from 'components/UI/DropdownToggle';
import { useAddItemMutation, useUpdateFieldValueForItemMutation, useDeleteItemMutation } from 'services/items/api';
import { Entity } from 'services/entities/types';
import { Item } from 'services/items/types';
import links from 'utils/links';

export interface ItemRowProps {
  entity: Entity;
  isSelected?: boolean;
  onAddItem: (item: Partial<Item>) => Promise<void>;
  onSelect: (item: Item) => Promise<void>;
  item: any;
}

const ItemRow = ({
  entity,
  isSelected,
  onAddItem,
  onSelect,
  item: pItem,
}: ItemRowProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const prevPItem = usePrevious(pItem);
  const [item, setItem] = useState(pItem);

  const [createItem] = useAddItemMutation();
  const [updateFieldValueForItem] = useUpdateFieldValueForItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  useEffect(() => {
    if (!isEqual(pItem, prevPItem)) {
      setItem({
        ...item,
        ...pItem,
      });
    }
  }, [pItem]);

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleKeyUp = (e, _updatedItem) => {
    if (e.key === 'Enter') {
      onAddItem({
        entityId: entity.id,
      })
      e.preventDefault();
    }
  };

  return (
    <tr
      className={classNames({
        itemRow: true,
        done: item && item.status === 'Completed',
      })}
    >
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Checkbox
          isChecked={isSelected}
          onClick={() => onSelect(item)}
        />
      </td>
      {
        entity.fields
          .map(field => {
            const defaultValue = item.values?.find(val => val.fieldId === field.id)?.value;
            if (['NUMBER', 'STRING', 'TEXT'].includes(field.type)) {
              return (
                <td key={`cell-${item.id}-${field.id}`}>
                  <AutosaveTextarea
                    className={classNames({
                      itemRow_field_editable: true,
                      [item.id]: true,
                    })}
                    defaultValue={defaultValue || ''}
                    onKeyDown={e => handleKeyDown(e)}
                    onKeyUp={e => handleKeyUp(e, item)}
                    onSave={async value => {
                      if (item.id) {
                        updateFieldValueForItem({
                          entityId: entity.id,
                          itemId: item.id,
                          fieldId: field.id,
                          value,
                        });
                      } else {
                        createItem({
                          entityId: entity.id,
                          values: [{
                            fieldId: field.id,
                            value,
                          }],
                        });
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
                </td>
              );
            } else if (field.type === 'BOOLEAN') {
              return (
                <Checkbox
                  defaultIsChecked={defaultValue || false}
                  onClick={async value => {
                    updateFieldValueForItem({
                      entityId: entity.id,
                      itemId: item.id,
                      fieldId: field.id,
                      value,
                    });
                  }}
                />
              );
            }
            return null;
          })
      }
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Dropdown
          style={{
            position: 'static',
          }}
        >
          <Dropdown.Toggle as={DropdownToggle} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => navigate(links.itemUpsert(entity.id, item.id))}
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
              onClick={() => createItem({
                entityId: entity.id,
                ...item,
              })}
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
              onClick={() => deleteItem({
                entityId: entity.id,
                id: item.id,
              })}
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
      </td>
    </tr>
  );
};

export default ItemRow;
