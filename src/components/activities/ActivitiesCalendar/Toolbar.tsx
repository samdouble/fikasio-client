import React, { useState } from 'react';
import classNames from 'classnames';

const Toolbar = ({
  localizer: {
    messages,
  },
  // label,
  // onNavigate,
  onView,
  view: viewProp,
  views,
}) => {
  const [view, setView] = useState(viewProp);

  const viewNamesGroup = pMessages => {
    const viewNames = views;

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <button
          className={
            classNames({
              'rbc-active': view === name,
            })
          }
          key={name}
          onClick={() => {
            setView(name);
            onView(name);
          }}
          type="button"
        >
          {pMessages[name]}
        </button>
      ))
    }
  }

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        {
          viewNamesGroup(messages)
        }
      </span>
    </div>
  );
};

export default Toolbar;
