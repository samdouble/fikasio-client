import React from 'react';

const Dot = ({ width, color }) => {
  return (
    <span
      className="dot"
      style={{
        height: width,
        width,
        backgroundColor: color,
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: 10,
      }}
    />
  );
}

export default Dot;
