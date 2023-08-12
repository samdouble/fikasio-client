import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { operations } from 'services';
import { Activity } from 'services/activities/types';
import ActivitiesList from './ActivitiesList';
import ActivitiesCalendar from './ActivitiesCalendar/ActivitiesCalendar';
import AddActivityButton from './AddActivityButton';

const ActivitiesView = ({
  activities,
  date,
  onEditActivity,
}) => {
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('LIST');
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const { t } = useTranslation();

  const addActivity = async activity => dispatch(operations.activities.createActivity(activity));

  const handleSelectActivity = activity => {
    const isActivityAlreadySelected = selectedActivities.find(a => a.id === activity.id);
    if (isActivityAlreadySelected) {
      setSelectedActivities([
        ...selectedActivities.filter(a => a.id !== activity.id),
      ]);
    } else {
      setSelectedActivities([
        ...selectedActivities,
        activity,
      ]);
    }
  };

  let activityView;
  if (viewMode === 'LIST') {
    activityView = (
      <ActivitiesList
        activities={activities}
        date={date}
        onAddActivity={addActivity}
        onEditActivity={onEditActivity}
        onSelectActivity={handleSelectActivity}
        selectedActivities={selectedActivities}
      />
    );
  } else {
    activityView = (
      <ActivitiesCalendar
        activities={activities}
        date={date}
        onEditActivity={onEditActivity}
      />
    );
  }

  return activities && (
    <>
      <div
        style={{
          textAlign: 'left',
        }}
      >
        <AddActivityButton
          onClick={onEditActivity}
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
      {
        selectedActivities.length > 0 && (
          <div
            style={{
              backgroundColor: '#7E5B9A',
              bottom: 50,
              color: 'white',
              height: 100,
              left: '22%',
              margin: 'auto',
              padding: 10,
              position: 'fixed',
              width: '60%',
            }}
          >
            <div>
              <b>
                {t('xSelectedActivities', { count: selectedActivities.length })}
              </b>
            </div>
          </div>
        )
      }
    </>
  );
}

export default ActivitiesView;
