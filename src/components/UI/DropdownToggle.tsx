import React, { SyntheticEvent } from 'react';

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
    ...
  </div>
));

export default DropdownToggle;
