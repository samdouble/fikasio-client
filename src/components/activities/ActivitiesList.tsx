import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import useTimeout from 'use-timeout';
import { operations } from 'services';
import { Activity } from 'services/activities/types';
import ActivityRow from './ActivityRow';
import './ActivitiesList.scss';

const ActivitiesList = ({
  activities,
  date,
  onActivitySelect,
  onAddActivity,
}) => {
  const dispatch = useDispatch();
  const [delay, setDelay] = useState<number | null>(null);
  const [newActivity, setNewActivity] = useState<Activity | null>(null);
  const { t } = useTranslation();

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

  const handleDelete = activity => {
    operations.activities.deleteActivity(activity.id)(dispatch);
  };

  return activities && (
    <Table responsive bordered hover>
      <thead>
        <tr>
          <th>{t('comment')}</th>
          <th style={{ width: 150 }}>Début</th>
          <th style={{ width: 150 }}>Fin</th>
          <th style={{ width: 90 }}>Durée</th>
          <th colSpan={2} />
        </tr>
      </thead>
      <tbody>
        {
          activities
            .filter(a => {
              const startOfDay = date.startOf('day');
              const endOfDay = date.endOf('day');
              return DateTime.fromISO(a.startTime) <= endOfDay && DateTime.fromISO(a.endTime) >= startOfDay;
            })
            .sort((a1, a2) => (DateTime.fromISO(a1.startTime) < DateTime.fromISO(a2.startTime) ? -1 : 1))
            .map(activity => (
              <ActivityRow
                key={activity.id}
                activity={activity}
                onAddActivity={addActivity}
                onDeleteActivity={() => handleDelete(activity)}
                onSelect={onActivitySelect}
              />
            ))
        }
      </tbody>
    </Table>
  );
}

export default ActivitiesList;
