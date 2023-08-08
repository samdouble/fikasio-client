import React, { SyntheticEvent } from 'react';

const DropdownToggle = React.forwardRef(({ onClick }: { onClick: (e: SyntheticEvent) => void; }, ref: any) => (
  <div
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
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
