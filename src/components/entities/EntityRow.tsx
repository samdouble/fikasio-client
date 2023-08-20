import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AutosaveTextarea from 'components/UI/AutosaveTextarea';
import Checkbox from 'components/UI/Checkbox';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import links from 'utils/links';

const EntityRow = ({
  entity,
  isSelected,
  onAddEntity,
  onDelete,
  onSelect,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleKeyDownName = e => {
    if (e.key === 'Enter') {
      onAddEntity({
        name: '',
      });
      e.preventDefault();
    }
  };

  const handleKeyUpName = (e, updatedEntity) => {
    if (updatedEntity) {
      if (e.key === 'Backspace' && e.target.textContent === '') {
        operations.entities.deleteEntity(updatedEntity.id)(dispatch);
      }
    } else if (e.target.textContent !== '') {
      operations.entities.createEntity({
        name: e.target.textContent,
      })(dispatch);
    }
  };

  return (
    <tr className="entityRow">
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Checkbox
          isChecked={isSelected}
          onClick={() => onSelect(entity)}
        />
      </td>
      <td
        className="entityRow_comments"
        style={{ cursor: 'pointer' }}
      >
        <Link
          style={{ textDecoration: 'none' }}
          to={links.entity(entity.id)}
        >
          <AutosaveTextarea
            defaultValue={entity.name}
            onKeyDown={e => handleKeyDownName(e)}
            onKeyUp={e => handleKeyUpName(e, entity)}
            onSave={async value => {
              operations.entities.patchEntity(entity.id, {
                name: value,
              })(dispatch);
            }}
            style={{
              border: 'none',
              cursor: 'auto',
              float: 'left',
              height: 25,
              minWidth: 'auto',
              outline: 'none',
              overflowY: 'hidden',
              paddingLeft: 5,
              paddingRight: 50,
              paddingTop: 0,
            }}
            useContentEditableDiv
          />
        </Link>
      </td>
      <td width={35}>
        <Link
          style={{ textDecoration: 'none' }}
          to={links.itemUpsert(entity.id, 'NEW')}
        >
          <FontAwesomeIcon
            icon="plus"
            size="1x"
            style={{
              cursor: 'pointer',
            }}
          />
        </Link>
      </td>
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
              onClick={() => onDelete(entity)}
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

export default EntityRow;
