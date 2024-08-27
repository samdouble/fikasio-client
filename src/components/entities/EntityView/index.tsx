import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useTranslation } from 'react-i18next';
import { Entity } from 'services/entities/types';
import { useLazyGetItemsForEntityQuery } from 'services/items/api';
import { Item } from 'services/items/types';
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
  const [getItemsForEntity] = useLazyGetItemsForEntityQuery();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getItemsForEntity(entity.id)
      .then(({ data }) => {
        if (data) {
          setItems(data);
        }
      })
  }, []);

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
