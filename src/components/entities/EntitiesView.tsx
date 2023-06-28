import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EntitiesList from './EntitiesList';
import AddEntityButton from './AddEntityButton';

const EntitiesView = ({
  entities,
}) => {
  const [viewMode, setViewMode] = useState('LIST');

  let entityView;
  if (viewMode === 'LIST') {
    entityView = <EntitiesList
      entities={entities}
    />
  } else {
    entityView = null;
  }

  return (
    <>
      <div>
        <AddEntityButton
          style={{
            float: 'right',
            marginRight: 0,
          }}
        />
        <Button
          variant="outline-secondary"
          active={viewMode === 'LIST'}
          onClick={() => setViewMode('LIST')}
        >
          <FontAwesomeIcon icon="list" size="1x" />
        </Button>
        <Button
          onClick={() => setViewMode('BOARD')}
          active={viewMode === 'BOARD'}
          variant="outline-secondary"
        >
          <FontAwesomeIcon icon="th" size="1x" />
        </Button>
      </div>
      { entityView }
    </>
  );
};

export default EntitiesView;
