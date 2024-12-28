import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import useTimeout from 'use-timeout';
import { Checkbox } from '@fikasio/react-ui-components';
import { useDeleteEntityMutation } from 'services/entities/api';
import { Entity } from 'services/entities/types';
import EntityRow from './EntityRow';
import './style.scss';

const EntitiesList = ({
  entities,
  onEntitySelect,
  onSelectAllEntities,
  selectedEntities,
}) => {
  const { t } = useTranslation();
  const [delay, setDelay] = useState<number | null>(null);
  const [newEntity, setNewEntity] = useState<Entity | null>(null);

  const [deleteEntity] = useDeleteEntityMutation();

  const allEntitiesAreChecked = !!entities?.length
    && (entities?.length === selectedEntities.length);

  useTimeout(() => {
    if (newEntity) {
      document.getElementById(newEntity.id)?.focus();
      setDelay(null);
      setNewEntity(null);
    }
  }, delay);

  const handleDelete = entity => {
    deleteEntity(entity.id);
  };

  return entities && (
    <Table
      bordered
      hover
      responsive
    >
      <thead>
        <tr>
          <th
            style={{
              width: 35,
            }}
          >
            <Checkbox
              isChecked={allEntitiesAreChecked}
              onClick={() => {
                if (allEntitiesAreChecked) {
                  onSelectAllEntities([]);
                } else {
                  onSelectAllEntities(entities);
                }
              }}
            />
          </th>
          <th>{t('name')}</th>
          <th
            colSpan={2}
            style={{
              width: 70,
            }}
          />
        </tr>
      </thead>
      <tbody>
        {
          [...(entities || [])]
            .sort((p1, p2) => (p1.name.toLowerCase().localeCompare(p2.name.toLowerCase())))
            .map(entity => (
              <EntityRow
                entity={entity}
                isSelected={!!selectedEntities.find(e => entity.id === e.id)}
                key={entity.id}
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
