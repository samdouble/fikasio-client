import React, { useEffect, useRef } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';

interface DatepickerProps {
  defaultValue: Date;
  isOpen: boolean;
  name?: string;
  onBlur?: () => void;
  onChange: (date: Date) => void;
  shouldCloseOnSelect?: boolean;
  showTimeSelect?: boolean;
  timeCaption?: string;
  timeFormat?: string;
  timeIntervals?: number;
}

const Datepicker = ({
  defaultValue,
  isOpen,
  name,
  onBlur,
  onChange,
  shouldCloseOnSelect,
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
      onBlur={onBlur}
      onChange={onChange}
      popperPlacement="auto"
      portalId="root-portal"
      ref={c => _calendar = c}
      selected={defaultValue}
      shouldCloseOnSelect={shouldCloseOnSelect || false}
      showTimeSelect={showTimeSelect}
      timeCaption={timeCaption}
      timeFormat={timeFormat}
      timeIntervals={timeIntervals}
    />
  );
};

export default Datepicker;
