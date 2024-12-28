import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropdownToggle = React.forwardRef(({ onClick }: { onClick: (e: SyntheticEvent) => void; }, ref: any) => (
  <div
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
    ref={ref}
    style={{
      color: 'black',
      cursor: 'pointer',
      textDecoration: 'none',
    }}
  >
    <FontAwesomeIcon
      icon="ellipsis"
      size="1x"
    />
  </div>
));

export default DropdownToggle;
