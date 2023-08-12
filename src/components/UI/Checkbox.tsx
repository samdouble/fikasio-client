import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const Checkbox = ({
  isChecked,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
    >
      {
        isChecked ? (
          <FontAwesomeIcon
            className="checkbox"
            icon="check"
            size="lg"
            style={{
              border: '1px solid #7E5B9A',
              color: '#420076',
              width: 20,
            }}
          />
        ) : (
          <FontAwesomeIcon
            className="checkbox"
            icon="square"
            size="lg"
            style={{
              border: '1px solid #7E5B9A',
              color: '#ffffff',
              width: 20,
            }}
          />
        )
      }
    </div>
  );
}

export default Checkbox;
