import React, { useEffect, useRef } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';

interface DatepickerProps {
  defaultValue: Date;
  isOpen: boolean;
  name?: string;
  onChange: (date: Date) => void;
  showTimeSelect?: boolean;
  timeCaption?: string;
  timeFormat?: string;
  timeIntervals?: number;
}

const Datepicker = ({
  defaultValue,
  isOpen,
  name,
  onChange,
  showTimeSelect,
  timeCaption,
  timeFormat,
  timeIntervals,
}: DatepickerProps) => {
  let _calendar = useRef(null) as ReactDatePicker;

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
