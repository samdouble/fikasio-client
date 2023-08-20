import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import EntityView from 'components/entities/EntityView';
import AddItemButton from 'components/entities/items/AddItemButton';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { Item } from 'services/items/types';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const EntityPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string; }>();
  const entities = useSelector((state: RootState) => state.entities);
  const entity = entities && entities.find(e => e.id === id);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.items.fetchItems(id));
  }, [id]);

  const handleSelectItem = item => {
    const isItemAlreadySelected = selectedItems.find(a => a.id === item.id);
    if (isItemAlreadySelected) {
      setSelectedItems([
        ...selectedItems.filter(a => a.id !== item.id),
      ]);
    } else {
      setSelectedItems([
        ...selectedItems,
        item,
      ]);
    }
  };

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.entities }}>{t('entities')}</Breadcrumb.Item>
        <Breadcrumb.Item active>{ entity?.name }</Breadcrumb.Item>
      </Breadcrumb>
      <Link to={links.itemUpsert(entity?.id, 'NEW')}>
        <AddItemButton
          entity={entity}
          style={{
            float: 'right',
            marginRight: 0,
          }}
        />
      </Link>
      <h4>{ entity?.name }</h4>
      <br />
      {
        entity && (
          <EntityView
            entity={entity}
            onItemSelect={handleSelectItem}
            selectedItems={selectedItems}
          />
        )
      }
    </BasePage>
  );

  return (
    <ResourcesHandler
      getContents={getPage}
      resourceFetchers={[
        () => dispatch(operations.entities.fetchEntities()),
      ]}
      resources={[entities]}
    />
  );
};

export default EntityPage;
