import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AutosaveTextarea from 'components/UI/AutosaveTextarea';
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
        <FontAwesomeIcon
          icon="copy"
          size="1x"
          onClick={() => operations.items.createItem(entity.id, item)(dispatch)}
          style={{
            cursor: 'pointer',
          }}
        />
      </td>
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
        <FontAwesomeIcon
          icon="times"
          size="1x"
          onClick={() => operations.items.deleteItem(entity.id, item.id)(dispatch)}
          style={{
            color: '#ce0000',
            cursor: 'pointer',
          }}
        />
      </td>
    </tr>
  );
};

export default ItemRow;
