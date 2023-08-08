import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import links from 'utils/links';

const EntityRow = ({
  entity,
  onDeleteEntity,
}) => (
  <tr className="entityRow">
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
    <td width={35}>
      <Dropdown
        style={{
          position: 'static',
        }}
      >
        <Dropdown.Toggle as={DropdownToggle} />
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => onDeleteEntity(entity)}
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

function mapStateToProps(state) {
  return {
    entities: state.entities,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createEntity: operations.entities.createEntity,
    patchEntity: operations.entities.patchEntity,
    deleteEntity: operations.entities.deleteEntity,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityRow);
