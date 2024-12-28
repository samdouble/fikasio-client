import React from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { Warning } from '@fikasio/react-ui-components';
import {
  calculateCompleteTime,
  calculateIncompleteTime,
  calculateCompletionPercentage,
  getFirstDueDate,
  getFurthestDueDate,
} from 'components/tasks/utils';
import { useGetProjectsQuery } from 'services/projects/api';
import { useGetTasksQuery } from 'services/tasks/api';
import { formatYYYYMMDD } from 'utils/date';
import { round } from 'utils/maths';
import { convertMinutesToHumanHM } from 'utils/time';

const Stats = ({
  projectId,
}) => {
  const { t } = useTranslation();
  const { data: projects } = useGetProjectsQuery();
  const { data: tasks } = useGetTasksQuery({});
  const project = (projects || []).find(p => p.id === projectId);
  const projectTasks = tasks?.filter(task => task.projects?.some(tp => tp.id === project?.id));
  const projectTasksIncomplete = projectTasks?.filter(task => task.status !== 'Completed');
  const hasUnspecifiedTasks = projectTasksIncomplete?.some(task => !task.dueAt || !task.estimatedCompletionTime);
  const completeTime = calculateCompleteTime(projectTasks);
  const incompleteTime = calculateIncompleteTime(projectTasks);
  const completionRatio = calculateCompletionPercentage(projectTasks);
  const firstTS = getFirstDueDate(projectTasks);
  const estimatedCompletionTS = getFurthestDueDate(projectTasksIncomplete);
  const statsToDisplay = [
    {
      name: 'Pourcentage de complétion',
      value: completionRatio !== null
        ? `${round(completionRatio * 100, 1)}%`
        : '-',
    }, {
      name: 'Temps effectué',
      value: completeTime !== null
        ? convertMinutesToHumanHM(completeTime)
        : '-',
    }, {
      name: t('timeLeft'),
      value: incompleteTime !== null
        ? convertMinutesToHumanHM(incompleteTime)
        : '-',
    }, {
      name: t('startDate'),
      value: firstTS !== null
        ? formatYYYYMMDD(new Date(firstTS))
        : '-',
    }, {
      name: 'Date de complétion',
      value: estimatedCompletionTS !== null
        ? formatYYYYMMDD(new Date(estimatedCompletionTS))
        : '-',
    },
  ];

  return (
    <>
      {
        hasUnspecifiedTasks && (
          <Warning>
            Certaines tâches de ce projet n'ont pas de date d'échéance ou de temps de complétion estimé.
          </Warning>
        )
      }
      <Table>
        <tbody>
          {
            statsToDisplay.map(stat => (
              <tr key={stat.name}>
                <td width={300}>
                  <b>{stat.name}</b>
                </td>
                <td>{stat.value}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
};

export default Stats;
