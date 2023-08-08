import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AutosaveTextarea from 'components/UI/AutosaveTextarea';
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
  item,
  no,
}) => {
  const dispatch = useDispatch();

  return (
    <tr className="itemRow">
      <td>{no}</td>
      {
        entity.fields
          .map(field => (
            <td key={field.id}>
              <AutosaveTextarea
                defaultValue={
                  getValueForType(
                    item.values.find(val => val.fieldId === field.id)?.value,
                    field.type,
                  )
                }
                onSave={async value => {
                  operations.items.updateFieldValueForItem(entity.id, item.id, field.id, {
                    value,
                  })(dispatch);
                }}
                style={{
                  border: 'none',
                  height: 'auto',
                  overflowY: 'none',
                  padding: 0,
                }}
                useContentEditableDiv
              />
            </td>
          ))
      }
      <td width={35}>
        <Link
          style={{ textDecoration: 'none' }}
          to={links.itemUpsert(entity.id, item.id)}
        >
          <FontAwesomeIcon
            icon="edit"
            size="1x"
          />
        </Link>
      </td>
      <td width={35}>
        <Dropdown
          style={{
            position: 'static',
          }}
        >
          <Dropdown.Toggle as={DropdownToggle} />
          <Dropdown.Menu>
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
              Copier
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
              Supprimer
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default ItemRow;
