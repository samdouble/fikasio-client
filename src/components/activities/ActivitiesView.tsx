import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { operations } from 'services';
import ActivitiesList from './ActivitiesList';
import ActivitiesCalendar from './ActivitiesCalendar/ActivitiesCalendar';
import AddActivityButton from './AddActivityButton';

const ActivitiesView = ({
  activities,
  date,
  onActivitySelect,
}) => {
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('LIST');

  const addActivity = async activity => dispatch(operations.activities.createActivity(activity));

  let activityView;
  if (viewMode === 'LIST') {
    activityView = (
      <ActivitiesList
        activities={activities}
        onAddActivity={addActivity}
        onActivitySelect={onActivitySelect}
      />
    );
  } else {
    activityView = (
      <ActivitiesCalendar
        activities={activities}
        date={date}
        onActivitySelect={onActivitySelect}
      />
    );
  }

  return activities && (
    <>
      <div style={{ textAlign: 'left' }}>
        <AddActivityButton
          onClick={onActivitySelect}
          style={{
            float: 'right',
            marginRight: 0,
          }}
        />
        <Button
          variant="outline-secondary"
          active={viewMode === 'LIST'}
          onClick={() => setViewMode('LIST')}
        >
          <FontAwesomeIcon icon="list" size="1x" />
        </Button>
        <Button
          onClick={() => setViewMode('CALENDAR')}
          active={viewMode === 'CALENDAR'}
          variant="outline-secondary"
        >
          <FontAwesomeIcon icon="calendar-alt" size="1x" />
        </Button>
      </div>
      { activityView }
    </>
  );
}

export default ActivitiesView;
