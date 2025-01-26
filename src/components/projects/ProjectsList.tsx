import React from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@fikasio/react-ui-components';
import { useGetTasksQuery } from 'services/tasks/api';
import ProjectRow from './ProjectRow';
import { calculateIncompleteTime, calculateCompletionPercentage } from '../tasks/utils';
import './style.scss';

const ProjectsList = ({
  onAddProject,
  onProjectClick,
  onProjectSelect,
  onSelectAllProjects,
  projects,
  selectedProjects,
  showCompleteProjects,
  showIncompleteProjects,
  showArchivedProjects,
}) => {
  const { t } = useTranslation();
  const { data: tasks } = useGetTasksQuery({});
  
  const projectsToShow = projects?.map(project => {
      const projectTasks = tasks?.filter(task => task.projects?.some(p => p.id === project.id));
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
    ));

  const allProjectsAreChecked = !!projectsToShow?.length
    && (projectsToShow?.length === selectedProjects.length);

  const addProject = async project => {
    onAddProject(project)
      .then(async ({ data: resultProject }) => {
        if (resultProject) {
          await new Promise(resolve => setTimeout(resolve, 200));
          const elementsWithClassname = document.getElementsByClassName(resultProject.id!);
          const nbElementsWithClassname = elementsWithClassname.length;
          if (nbElementsWithClassname) {
            (elementsWithClassname[nbElementsWithClassname - 1] as HTMLElement).focus();
          }
        }
      });
  };

  return projects && (
    <Table
      bordered
      hover
      responsive
    >
      <thead>
        <tr>
          <th
            style={{ width: 35 }}
          >
            <Checkbox
              isChecked={allProjectsAreChecked}
              onClick={() => {
                if (allProjectsAreChecked) {
                  onSelectAllProjects([]);
                } else {
                  onSelectAllProjects(projectsToShow);
                }
              }}
            />
          </th>
          <th>{t('name')}</th>
          <th style={{ width: 150 }}>{t('timeLeft')}</th>
          <th style={{ width: 150 }}>{t('completion')}</th>
          <th style={{ width: 120 }}>{t('deadline')}</th>
          <th style={{ width: 35 }} />
        </tr>
      </thead>
      <tbody>
        {
          (!projectsToShow || !projectsToShow.length)
            && (
              <ProjectRow
                isSelected={false}
                onAddProject={addProject}
                onClick={onProjectClick}
                onSelect={onProjectSelect}
                project={{}}
              />
            )
        }
        {
          projectsToShow?.sort((p1, p2) => {
              const p1NameNoAccents = p1.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
              const p2NameNoAccents = p2.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
              return p1NameNoAccents < p2NameNoAccents ? -1 : 1;
            })
            .map(project => (
              <ProjectRow
                isSelected={!!selectedProjects.find(p1 => project.id === p1.id)}
                key={project.id}
                onAddProject={addProject}
                onClick={onProjectClick}
                onSelect={onProjectSelect}
                project={project}
              />
            ))
        }
      </tbody>
    </Table>
  );
};

export default ProjectsList;
