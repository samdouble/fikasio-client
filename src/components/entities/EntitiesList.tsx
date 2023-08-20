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
  onAddEntity,
  onEntitySelect,
  selectedEntities,
}) => {
  const dispatch = useDispatch();
  const [delay, setDelay] = useState<number | null>(null);
  const [newEntity, setNewEntity] = useState<Entity | null>(null);

  const addEntity = async entity => {
    onAddEntity(entity)
      .then(resultEntity => {
        setNewEntity(resultEntity);
        setDelay(50);
      });
  };

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
      bordered
      hover
      responsive
    >
      <thead>
        <tr>
          <th />
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
                entity={entity}
                isSelected={selectedEntities.find(e => entity.id === e.id)}
                key={entity.id}
                onAddEntity={addEntity}
                onDelete={() => handleDelete(entity)}
                onSelect={onEntitySelect}
              />
            ))
        }
      </tbody>
    </Table>
  );
}

export default EntitiesList;
