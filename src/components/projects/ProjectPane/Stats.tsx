import React from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import {
  calculateCompleteTime,
  calculateIncompleteTime,
  calculateCompletionPercentage,
  getFurthestDueDate,
} from 'components/tasks/utils';
import { formatYYYYMMDD } from 'utils/date';
import { round } from 'utils/maths';
import { convertMinutesToHumanHM } from 'utils/time';
import { RootState } from 'services/store';

const Stats = ({
  projectId,
}) => {
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const project = (projects || []).find(p => p.id === projectId);
  const projectTasks = tasks?.filter(task => task.projects.some(tp => tp.id === project?.id));
  const projectTasksIncomplete = projectTasks?.filter(task => !task.isCompleted);
  const hasUnspecifiedTasks = projectTasksIncomplete?.some(task => !task.dueAt || !task.estimatedCompletionTime);
  const completeTime = calculateCompleteTime(projectTasks);
  const incompleteTime = calculateIncompleteTime(projectTasks);
  const completionRatio = calculateCompletionPercentage(projectTasks);
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
      name: 'Temps restant',
      value: incompleteTime !== null
        ? convertMinutesToHumanHM(incompleteTime)
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
          <Alert variant="warning">
            Certaines tâches de ce projet n'ont pas de date d'échéance ou de temps de complétion estimé.
          </Alert>
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
