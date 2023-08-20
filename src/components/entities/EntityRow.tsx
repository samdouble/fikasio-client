import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onAddEntity({
        comments: '',
      });
      e.preventDefault();
    }
  };

  const handleKeyUpComments = (e, updatedActivity) => {
    if (updatedActivity) {
      if (e.key === 'Backspace' && e.target.textContent === '') {
        operations.activities.deleteActivity(updatedActivity.id)(dispatch);
      }
    } else if (e.target.textContent !== '') {
      operations.activities.createActivity({
        comments: e.target.textContent,
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
          <div
            style={{
              color: '#000',
              height: '100%',
              width: '100%',
            }}
          >
            {entity.name}
          </div>
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
