import React from 'react';
import { useSelector } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Entity } from 'services/entities/types';
import { RootState } from 'services/store';
import ItemsView from '../items/ItemsView';
import EntityInformationsForm from './EntityInformationsForm';
import EntityFieldsTable from './EntityFieldsTable';

export interface EntityViewProps {
  defaultTab?: string,
  entity: Entity,
}

const EntityView = ({
  defaultTab,
  entity,
}: EntityViewProps) => {
  const items = useSelector((state: RootState) => state.items);

  return (
    <div>
      <Tabs
        className="mb-3"
        defaultActiveKey={defaultTab || 'ITEMS'}
      >
        <Tab
          eventKey="ITEMS"
          title="Items"
        >
          <ItemsView
            entity={entity}
            items={items?.filter(i => i.entityId === entity.id)}
          />
        </Tab>
        <Tab
          eventKey="INFOS"
          title="Informations"
        >
          <EntityInformationsForm
            entity={entity}
          />
        </Tab>
        <Tab
          eventKey="FIELDS"
          title="Champs"
        >
          <EntityFieldsTable
            entity={entity}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default EntityView;
