import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import useTimeout from 'use-timeout';

interface AutosaveTextareaProps {
  className?: string;
  defaultValue?: string;
  onBlur?: any;
  onFocus?: any;
  onKeyDown: any;
  onKeyUp: any;
  onSave: (value: string) => void;
  style: React.CSSProperties;
  useContentEditableDiv?: boolean;
}

const AutosaveTextarea = ({
  className,
  defaultValue,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  onSave,
  useContentEditableDiv,
  style,
}: AutosaveTextareaProps) => {
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
    <>
      {
        useContentEditableDiv
          ? (
            <ContentEditable
              className={className}
              html={value}
              onBlur={e => onBlur && onBlur(e)}
              onChange={e => setValue(e.target.value)}
              onClick={e => e.stopPropagation()}
              onFocus={e => onFocus && onFocus(e)}
              onKeyDown={e => onKeyDown(e)}
              onKeyUp={e => onKeyUp(e)}
              style={{
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
                verticalAlign: 'middle',
                whiteSpace: 'pre',
                width: '100%',
                ...style,
              }}
            />
          ) : (
            <textarea
              className={className}
              defaultValue={value}
              onBlur={e => onBlur(e)}
              onChange={e => setValue(e.target.value)}
              onClick={e => e.stopPropagation()}
              onFocus={e => onFocus(e)}
              onKeyDown={e => onKeyDown(e)}
              onKeyUp={e => onKeyUp(e)}
              style={{
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
                verticalAlign: 'middle',
                width: '100%',
                ...style,
              }}
            />
          )
      }
    </>
  );
};

export default AutosaveTextarea;
