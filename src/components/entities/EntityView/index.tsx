import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useTranslation } from 'react-i18next';
import { Entity } from 'services/entities/types';
import { useGetItemsForEntityQuery } from 'services/items/api';
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
  const { t } = useTranslation();
  const { data: items } = useGetItemsForEntityQuery(entity.id);

  return (
    <div>
      <Tabs
        className="mb-3"
        defaultActiveKey={defaultTab || 'ITEMS'}
      >
        <Tab
          eventKey="ITEMS"
          title={t('items')}
        >
          <ItemsView
            entity={entity}
            items={items?.filter(i => i.entityId === entity.id)}
          />
        </Tab>
        <Tab
          eventKey="INFOS"
          title={t('informations')}
        >
          <EntityInformationsForm
            entity={entity}
          />
        </Tab>
        <Tab
          eventKey="FIELDS"
          title={t('fields')}
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
