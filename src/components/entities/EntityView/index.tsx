import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { operations } from 'services';
import { Entity } from 'services/entities/types';
import { Item } from 'services/items/types';
import { RootState } from 'services/store';
import ItemsList from '../items/ItemsList';
import EntityInformationsForm from './EntityInformationsForm';
import EntityFieldsTable from './EntityFieldsTable';

export interface EntityViewProps {
  defaultTab?: string,
  entity: Entity,
  onItemSelect: (item: Item) => void;
  selectedItems: Item[];
}

const EntityView = ({
  defaultTab,
  entity,
  onItemSelect,
  selectedItems,
}: EntityViewProps) => {
  const items = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch();

  const addItem = async item => {
    return operations.items.createItem(entity.id, item)(dispatch)
      .then(() => {
        dispatch(operations.pane.clearPaneContent());
      });
  };

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
          <ItemsList
            entity={entity}
            items={items?.filter(i => i.entityId === entity.id)}
            onAddItem={item => addItem(item)}
            onItemSelect={onItemSelect}
            selectedItems={selectedItems}
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
