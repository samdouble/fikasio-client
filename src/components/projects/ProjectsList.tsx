import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { RootState } from 'services/store';
import ProjectRow from './ProjectRow';
import { calculateIncompleteTime, calculateCompletionPercentage } from '../tasks/utils';

const ProjectsList = ({
  onProjectSelect,
  showCompleteProjects,
  showIncompleteProjects,
  showArchivedProjects,
}) => {
  const { t } = useTranslation();
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);

  return projects ? (
    <Table
      responsive
      bordered
      hover
    >
      <thead>
        <tr>
          <th>{t('name')}</th>
          <th style={{ width: 150 }}>{t('timeleft')}</th>
          <th style={{ width: 150 }}>{t('completion')}</th>
          <th style={{ width: 150 }}>{t('deadline')}</th>
          <th style={{ width: 35 }} />
        </tr>
      </thead>
      <tbody>
        {
          projects
            .map(project => {
              const projectTasks = tasks?.filter(task => task.projects.some(p => p.id === project.id));
              const completionRatio = calculateCompletionPercentage(projectTasks);
              const incompleteTime = calculateIncompleteTime(projectTasks);
              return {
                ...project,
                completionRatio,
                incompleteTime,
                isCompleted: completionRatio === 1,
              };
            })
            .filter(project => (
              (showCompleteProjects && project.isCompleted && !project.isArchived)
              || (showIncompleteProjects && !project.isCompleted && !project.isArchived)
              || (showArchivedProjects && project.isArchived)
            ))
            .sort((p1, p2) => {
              const p1NameNoAccents = p1.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
              const p2NameNoAccents = p2.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
              return p1NameNoAccents < p2NameNoAccents ? -1 : 1;
            })
            .map(project => (
              <ProjectRow
                key={project.id}
                onClick={onProjectSelect}
                project={project}
              />
            ))
        }
      </tbody>
    </Table>
  ) : <div />;
};

export default ProjectsList;
