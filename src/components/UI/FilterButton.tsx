import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';

const FilterButton = () => (
  <>
    <Button
      data-tooltip-content="Filters"
      data-tooltip-id="filters"
      style={{
        float: 'right',
      }}
      variant="light"
    >
      <FontAwesomeIcon
        icon="sliders"
        size="1x"
      />
    </Button>
    <Tooltip id="filters" />
  </>
);

export default FilterButton;
