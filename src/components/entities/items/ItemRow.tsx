import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AutosaveTextarea from 'components/UI/AutosaveTextarea';
import Checkbox from 'components/UI/Checkbox';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import links from 'utils/links';

const getValueForType = (value: any, type?: string) => {
  switch (type) {
    case 'BOOLEAN':
      return value ? 'OUI' : 'NON';
    case 'NUMBER':
    case 'STRING':
    default:
      return value;
  }
}

const ItemRow = ({
  entity,
  isSelected,
  item,
  no,
  onAddItem,
  onSelect,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onAddItem({});
      e.preventDefault();
    }
  };

  const handleKeyUp = (e, updatedItem) => {
    if (updatedItem) {
      if (e.key === 'Backspace' && e.target.textContent === '') {
        operations.items.deleteItem(entity.id, updatedItem.id)(dispatch);
      }
    } else if (e.target.textContent !== '') {
      operations.items.createItem(entity.id, {})(dispatch);
    }
  };

  return (
    <tr className="itemRow">
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
      <td>{no}</td>
      {
        entity.fields
          .map(field => (
            <td
              className="itemRow_field"
              key={field.id}
            >
              <AutosaveTextarea
                className="itemRow_field_editable"
                defaultValue={
                  getValueForType(
                    item.values.find(val => val.fieldId === field.id)?.value,
                    field.type,
                  )
                }
                onKeyDown={e => handleKeyDown(e)}
                onKeyUp={e => handleKeyUp(e, item)}
                onSave={async value => {
                  operations.items.updateFieldValueForItem(entity.id, item.id, field.id, {
                    value,
                  })(dispatch);
                }}
                style={{
                  border: 'none',
                  height: 25,
                  overflowY: 'hidden',
                  paddingLeft: 5,
                  paddingRight: 50,
                  paddingTop: 0,
                  width: 'auto',
                }}
                useContentEditableDiv
              />
            </td>
          ))
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
              onClick={() => history.push(links.itemUpsert(entity.id, item.id))}
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
              onClick={() => operations.items.createItem(entity.id, item)(dispatch)}
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
              onClick={() => operations.items.deleteItem(entity.id, item.id)(dispatch)}
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
