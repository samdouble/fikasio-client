import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import 'components/UI/Form.scss';
import { useLazyGetEventsQuery } from 'services/events/api';
import LineChart from '../../dashboards/LineChart';
import { getEstimatedCompletionDate } from '../ObjectivesViewer/utils';

const ObjectiveStats = ({
  objective,
}) => {
  const { t } = useTranslation();
  const [getEvents] = useLazyGetEventsQuery();
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    getEvents({
        type: 'ObjectiveProgress',
        objectiveId: objective.id,
      })
      .then(({ data }) => {
        if (data) {
          setEvents(data);
        }
      });
  }, [objective]);

  const eventsToGraphPoints = events
    .sort((e1, e2) => e1.createdAt - e2.createdAt)
    .map(e => ({
      x: e.createdAt,
      y: e.progress,
    }));
  const today = DateTime.fromJSDate(new Date());
  const { goal } = objective;
  const lastProgressEventTs = eventsToGraphPoints.length && eventsToGraphPoints[eventsToGraphPoints.length - 1].x;
  const lastProgressEventDate = lastProgressEventTs && DateTime.fromJSDate(new Date(lastProgressEventTs));
  const timeSinceLastProgressEvent = lastProgressEventDate && today.diff(lastProgressEventDate, 'days').days;
  const dueDate = DateTime.fromISO(objective.dueDate);
  const daysLeft = dueDate.diff(today, 'days').days;
  const currentProgress = objective.progress || 0;
  const completionRatio = goal && (currentProgress / goal);
  const estimatedCompletionDate = getEstimatedCompletionDate(objective);
  const isLate = currentProgress < 1 && today > dueDate;
  const isEstimatedLate = !isLate && estimatedCompletionDate && (estimatedCompletionDate > dueDate);

  return (
    <table>
      <tbody>
        <tr>
          <td
            width="60%"
            style={{
              verticalAlign: 'top',
            }}
          >
            <div>
              <b>{t('lastUpdate')}</b>
              <br />
              Il y a { timeSinceLastProgressEvent ? Math.round(timeSinceLastProgressEvent) : '-' } jours
            </div>
            <div>
              <b>Pourcentage de complétion</b>
              <br />
              { Math.round(100 * completionRatio) }%
            </div>
            <div>
              <b>{t('timeLeft')}</b>
              <br />
              <div
                style={{
                  ...(daysLeft < 0 && { color: '#ff0000' }),
                }}
              >
                { Math.round(daysLeft) } jours
              </div>
            </div>
            <div>
              <b>{t('estimatedCompletionDate')}</b>
              <br />
              <div
                style={{
                  ...(isLate && { color: '#ff0000' }),
                  ...(isEstimatedLate && { color: '#dfa901' }),
                }}
              >
                { estimatedCompletionDate ? estimatedCompletionDate.toFormat('yyyy-MM-dd') : '-' }
              </div>
            </div>
            <div>
              <b>{t('requiredPace')}</b>
              <br />
              <div>
                { Math.round((goal - currentProgress) / daysLeft) } / jour
              </div>
            </div>
          </td>
          <td>
            <div style={{ width: 800 }}>
              <LineChart
                data={eventsToGraphPoints}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ObjectiveStats;
