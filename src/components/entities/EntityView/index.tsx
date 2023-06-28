import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { operations } from 'services';
import { Entity } from 'services/entities/types';
import { Item } from 'services/items/types';
import ItemsList from '../items/ItemsList';
import EntityInformationsForm from './EntityInformationsForm';
import EntityFieldsTable from './EntityFieldsTable';

export interface EntityViewProps {
  defaultTab?: string,
  entity: Entity,
  items: Item[],
}

const EntityView = ({
  defaultTab,
  entity,
  items,
}: EntityViewProps) => (
  <div>
    <Tabs
      className="mb-3"
      defaultActiveKey={defaultTab || 'LOGS'}
    >
      <Tab
        eventKey="LOGS"
        title="Items"
      >
        <ItemsList
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

function mapStateToProps(state) {
  return {
    entities: state.entities,
    items: state.items,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createEntity: operations.entities.createEntity,
    updateEntity: operations.entities.updateEntity,
    patchEntity: operations.entities.patchEntity,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityView);
