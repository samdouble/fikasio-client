import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const LoadingGif = ({ isChecked }) => {
  return (
    <div>
      {
        isChecked ? (
          <FontAwesomeIcon
            className="checkbox"
            icon="check"
            size="lg"
            style={{
              color: '#420076',
              border: '1px solid #7E5B9A',
            }}
          />
        ) : (
          <FontAwesomeIcon
            className="checkbox"
            icon="square"
            size="lg"
            style={{
              color: '#ffffff',
              border: '1px solid #7E5B9A',
            }}
          />
        )
      }
    </div>
  );
}

export default LoadingGif;
