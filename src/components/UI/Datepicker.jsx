import React, { useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';

const Datepicker = ({
  defaultValue,
  isOpen,
  name,
  onChange,
  showTimeSelect,
  timeCaption,
  timeFormat,
  timeIntervals,
}) => {
  let _calendar = useRef(null);

  useEffect(() => {
    if (_calendar) {
      _calendar.setOpen(isOpen);
    }
  }, [_calendar, isOpen]);

  return (
    <DatePicker
      customInput={<input type="hidden" />}
      name={name}
      onChange={onChange}
      popperPlacement="auto"
      ref={c => _calendar = c}
      selected={defaultValue}
      showTimeSelect={showTimeSelect}
      timeCaption={timeCaption}
      timeFormat={timeFormat}
      timeIntervals={timeIntervals}
    />
  );
};

export default Datepicker;
