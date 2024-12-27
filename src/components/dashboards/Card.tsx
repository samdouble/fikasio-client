import React from 'react';

const Card = ({ children }) => {
  return (
    <div
      style={{
        border: '1px solid #ababab',
        // boxShadow: '2px 4px 3px #888888',
        display: 'inline-block',
        padding: 20,
        margin: 10,
      }}
    >
      { children }
    </div>
  );
}

export default Card;
