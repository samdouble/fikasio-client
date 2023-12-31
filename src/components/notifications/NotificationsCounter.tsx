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
        borderRadius: '10%',
        fontSize: '0.9em',
        padding: '2px 6px',
        ...style,
      }}
    >
      {
        (count <= 99)
          ? count
          : '99+'
      }
    </span>
  );
};

export default NotificationsCounter;
