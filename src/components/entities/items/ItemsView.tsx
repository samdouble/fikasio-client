import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { operations } from 'services';
import { Item } from 'services/items/types';
import ItemsList from './ItemsList';
import AddItemButton from './AddItemButton';

const ItemsView = ({
  entity,
  items,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('LIST');
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const addItem = async item => {
    return operations.items.createItem(entity.id, item)(dispatch)
      .then(res => {
        const addedItem = res.payload.item;
        dispatch(operations.pane.clearPaneContent());
        return addedItem;
      });
  };

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

  let itemView;
  if (viewMode === 'LIST') {
    itemView = (
      <ItemsList
        entity={entity}
        items={items}
        onAddItem={item => addItem(item)}
        onItemSelect={handleSelectItem}
        selectedItems={selectedItems}
      />
    );
  } else {
    itemView = null;
  }

  return (
    <>
      <div>
        <AddItemButton
          entity={entity}
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
      { itemView }
      {
        selectedItems.length > 0 && (
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
            <b>
              {t('xSelectedItems', { count: selectedItems.length })}
            </b>
          </div>
        )
      }
    </>
  );
};

export default ItemsView;