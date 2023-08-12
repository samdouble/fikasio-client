import React from 'react';

interface NotificationsCounterProps {
  count: number;
  style?: React.CSSProperties;
}

const NotificationsCounter = ({
  count,
  style,
}: NotificationsCounterProps) => {
  return (
    <span
      style={{
        color: '#ffffff',
        backgroundColor: '#ce0000',
        borderRadius: '50%',
        padding: '2px 6px',
        ...style,
      }}
    >
      { count }
    </span>
  );
};

export default NotificationsCounter;
