import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import useTimeout from 'use-timeout';
import { Checkbox } from '@fikasio/react-ui-components';
import { useDeleteActivityMutation } from 'services/activities/api';
import { Activity } from 'services/activities/types';
import ActivityRow from './ActivityRow';
import './ActivitiesList.scss';

const ActivitiesList = ({
  activities,
  date,
  onAddActivity,
  onActivityClick,
  onActivitySelect,
  onSelectAllActivities,
  selectedActivities,
}) => {
  const [delay, setDelay] = useState<number | null>(null);
  const [newActivity, setNewActivity] = useState<Activity | null>(null);
  const { t } = useTranslation();

  const [deleteActivity] = useDeleteActivityMutation();

  const addActivity = async activity => {
    onAddActivity(activity)
      .then(resultActivity => {
        setNewActivity(resultActivity);
        setDelay(50);
      });
  };

  useTimeout(() => {
    if (newActivity) {
      document.getElementById(newActivity.id)?.focus();
      setDelay(null);
      setNewActivity(null);
    }
  }, delay);

  const handleDeleteActivity = activity => {
    deleteActivity(activity.id);
  };

  const activitiesToShow = activities?.filter(a => {
    const startOfDay = date.startOf('day');
    const endOfDay = date.endOf('day');
    return DateTime.fromISO(a.startTime) <= endOfDay && DateTime.fromISO(a.endTime) >= startOfDay;
  });
  const allActivitiesAreChecked = !!activitiesToShow?.length 
    && (activitiesToShow?.length === selectedActivities.length);

  return (
    <Table
      bordered
      hover
      responsive
    >
      <thead>
        <tr>
          <th style={{ width: 35 }}>
            <Checkbox
              isChecked={allActivitiesAreChecked}
              onClick={() => {
                if (allActivitiesAreChecked) {
                  onSelectAllActivities([]);
                } else {
                  onSelectAllActivities(activitiesToShow);
                }
              }}
            />
          </th>
          <th>{t('comment')}</th>
          <th style={{ width: 180 }}>{t('start')}</th>
          <th style={{ width: 180 }}>{t('end')}</th>
          <th style={{ width: 90 }}>{t('duration')}</th>
          <th style={{ width: 35 }} />
        </tr>
      </thead>
      <tbody>
        {
          activitiesToShow?.sort((a1, a2) => (
            DateTime.fromISO(a1.startTime) < DateTime.fromISO(a2.startTime) ? -1 : 1
          ))
            .map(activity => (
              <ActivityRow
                activity={activity}
                isSelected={!!selectedActivities.find(a => activity.id === a.id)}
                key={activity.id}
                onAddActivity={addActivity}
                onClick={onActivityClick}
                onDelete={handleDeleteActivity}
                onSelect={onActivitySelect}
              />
            ))
        }
      </tbody>
    </Table>
  );
}

export default ActivitiesList;
