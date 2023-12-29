import React from 'react';

interface DotProps {
  color: string;
  style?: React.CSSProperties;
  width: number;
}

const Dot = ({
  color,
  style,
  width,
}: DotProps) => {
  return (
    <span
      className="dot"
      style={{
        backgroundColor: color,
        borderRadius: '50%',
        display: 'inline-block',
        height: width,
        marginRight: 10,
        width,
        ...style,
      }}
    />
  );
}

export default Dot;
