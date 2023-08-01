import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import useTimeout from 'use-timeout';
import { operations } from 'services';
import { Entity } from 'services/entities/types';
import EntityRow from './EntityRow';
import './style.scss';

const EntitiesList = ({
  entities,
}) => {
  const dispatch = useDispatch();
  const [delay, setDelay] = useState(null);
  const [newEntity, setNewEntity] = useState<Entity | null>(null);

  useTimeout(() => {
    if (newEntity) {
      document.getElementById(newEntity.id)?.focus();
      setDelay(null);
      setNewEntity(null);
    }
  }, delay);

  const handleDelete = entity => {
    operations.entities.deleteEntity(entity.id)(dispatch);
  };

  return entities && (
    <Table
      responsive
      bordered
      hover
    >
      <thead>
        <tr>
          <th>Nom</th>
          <th colSpan={2} />
        </tr>
      </thead>
      <tbody>
        {
          entities
            .sort((p1, p2) => (p1.name.toLowerCase().localeCompare(p2.name.toLowerCase())))
            .map(entity => (
              <EntityRow
                key={entity.id}
                entity={entity}
                onDeleteEntity={() => handleDelete(entity)}
              />
            ))
        }
      </tbody>
    </Table>
  );
}

export default EntitiesList;
