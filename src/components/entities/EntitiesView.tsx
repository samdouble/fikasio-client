import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { Entity } from 'services/entities/types';
import EntitiesList from './EntitiesList';
import AddEntityButton from './AddEntityButton';

const EntitiesView = ({
  entities,
}) => {
  const { t } = useTranslation();
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
        onSelectAllEntities={entitiesArray => setSelectedEntities(entitiesArray)}
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
      {
        selectedEntities.length > 0 && (
          <div
            style={{
              backgroundColor: '#7E5B9A',
              bottom: 50,
              color: 'white',
              height: 100,
              left: '22%',
              margin: 'auto',
              padding: 10,
              position: 'fixed',
              width: '60%',
            }}
          >
            <FontAwesomeIcon
              icon="times"
              onClick={() => {
                setSelectedEntities([]);
              }}
              style={{
                cursor: 'pointer',
                marginRight: 10,
                width: 25,
              }}
            />
            <b>
              {t('xSelectedEntities', { count: selectedEntities.length })}
            </b>
          </div>
        )
      }
    </>
  );
};

export default EntitiesView;
