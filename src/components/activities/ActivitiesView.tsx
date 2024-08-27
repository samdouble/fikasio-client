import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAddActivityMutation } from 'services/activities/api';
import { Activity } from 'services/activities/types';
import ActivitiesList from './ActivitiesList';
import ActivitiesCalendar from './ActivitiesCalendar/ActivitiesCalendar';
import AddActivityButton from './AddActivityButton';

const ActivitiesView = ({
  activities,
  date,
  onActivityClick,
}) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState('CALENDAR');
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);

  const [createActivity] = useAddActivityMutation();

  const addActivity = async activity => createActivity(activity);

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
        onActivityClick={onActivityClick}
        onActivitySelect={handleSelectActivity}
        onAddActivity={addActivity}
        onSelectAllActivities={activitiesArray => setSelectedActivities(activitiesArray)}
        selectedActivities={selectedActivities}
      />
    );
  } else {
    activityView = (
      <ActivitiesCalendar
        date={date}
        onActivityClick={onActivityClick}
      />
    );
  }

  return (
    <>
      <div
        style={{
          textAlign: 'left',
        }}
      >
        <AddActivityButton
          onClick={onActivityClick}
          style={{
            float: 'right',
            marginRight: 0,
          }}
        />
        <Button
          active={viewMode === 'LIST'}
          onClick={() => setViewMode('LIST')}
          variant="outline-secondary"
        >
          <FontAwesomeIcon icon="list" size="1x" />
        </Button>
        <Button
          active={viewMode === 'CALENDAR'}
          onClick={() => setViewMode('CALENDAR')}
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
            <FontAwesomeIcon
              icon="times"
              onClick={() => {
                setSelectedActivities([]);
              }}
              style={{
                cursor: 'pointer',
                marginRight: 10,
                width: 25,
              }}
            />
            <b>
              {t('xSelectedActivities', { count: selectedActivities.length })}
            </b>
          </div>
        )
      }
    </>
  );
}

export default ActivitiesView;
