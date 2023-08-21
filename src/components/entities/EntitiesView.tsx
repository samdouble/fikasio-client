import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Entity } from 'services/entities/types';
import EntitiesList from './EntitiesList';
import AddEntityButton from './AddEntityButton';

const EntitiesView = ({
  entities,
}) => {
  const [viewMode, setViewMode] = useState('LIST');
  const [selectedEntities, setSelectedEntities] = useState<Entity[]>([]);

  const handleSelectEntity = entity => {
    const isEntityAlreadySelected = selectedEntities.find(a => a.id === entity.id);
    if (isEntityAlreadySelected) {
      setSelectedEntities([
        ...selectedEntities.filter(a => a.id !== entity.id),
      ]);
    } else {
      setSelectedEntities([
        ...selectedEntities,
        entity,
      ]);
    }
  };

  let entityView;
  if (viewMode === 'LIST') {
    entityView = (
      <EntitiesList
        entities={entities}
        onEntitySelect={handleSelectEntity}
        selectedEntities={selectedEntities}
      />
    );
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
