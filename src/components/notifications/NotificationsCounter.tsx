import React from 'react';

const NotificationsCounter = ({ count, style }) => {
  return (
    <span style={{
      color: '#ffffff',
      backgroundColor: '#ce0000',
      borderRadius: '50%',
      padding: '2px 6px',
      ...style,
    }}>
      { count }
    </span>
  );
};

export default NotificationsCounter;
