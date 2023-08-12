import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { RootState } from 'services/store';
import ProjectRow from './ProjectRow';
import { calculateIncompleteTime, calculateCompletionPercentage } from '../tasks/utils';

const ProjectsList = ({
  onProjectSelect,
  showCompleteProjects,
  showIncompleteProjects,
  showArchivedProjects,
}) => {
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
          <th>Nom</th>
          <th style={{ width: 150 }}>Temps restant</th>
          <th style={{ width: 150 }}>Complétion</th>
          <th style={{ width: 150 }}>Échéance</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {
          projects
            .map(project => {
              const projectTasks = tasks?.filter(t => t.projects.some(p => p.id === project.id));
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
