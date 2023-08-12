import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import useTimeout from 'use-timeout';

const AutosaveTextarea = ({
  defaultValue,
  onSave,
  useContentEditableDiv,
  style,
}) => {
  const [value, setIValue] = useState(defaultValue ? defaultValue.toString() : '');
  const [delay, setDelay] = useState<number | null>(null);

  const saveValue = () => {
    if (value !== '') {
      onSave(value);
    }
  };

  useTimeout(() => {
    saveValue();
    setDelay(null);
  }, delay);

  const setValue = val => {
    setDelay(1000);
    setIValue(val);
  };

  return (
    <div>
      {
        useContentEditableDiv
          ? (
            <ContentEditable
              html={value}
              id="text"
              onChange={e => setValue(e.target.value)}
              onClick={e => e.stopPropagation()}
              style={{
                border: '1px solid #d0d0d0',
                borderRadius: 3,
                cursor: 'auto',
                display: 'inline-block',
                height: 300,
                minWidth: 'auto',
                outline: 'none',
                overflowY: 'scroll',
                paddingLeft: 10,
                paddingRight: 50,
                paddingTop: 10,
                textAlign: 'left',
                whiteSpace: 'pre',
                width: '100%',
                ...style,
              }}
            />
          ) : (
            <textarea
              defaultValue={value}
              id="text"
              onChange={e => setValue(e.target.value)}
              onClick={e => e.stopPropagation()}
              style={{
                border: '1px solid #d0d0d0',
                borderRadius: 3,
                cursor: 'auto',
                display: 'inline-block',
                height: 300,
                minWidth: 'auto',
                outline: 'none',
                overflowY: 'scroll',
                paddingLeft: 10,
                paddingRight: 50,
                paddingTop: 10,
                textAlign: 'left',
                width: '100%',
                ...style,
              }}
            />
          )
      }
    </div>
  );
};

export default AutosaveTextarea;
