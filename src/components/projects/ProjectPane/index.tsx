import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import ObjectivesView from 'components/objectives/ObjectivesView';
import TasksView from 'components/tasks/TasksView';
import { operations } from 'services';
import { RootState } from 'services/store';
import ProjectInformationsForm from './ProjectInformationsForm';
import Stats from './Stats';

const ProjectPane = ({
  defaultTab,
  id,
}) => {
  const objectives = useSelector((state: RootState) => state.objectives);
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const project = (projects || []).find(p => p.id === id);
  const projectTasks = tasks?.filter(task => task.projects.some(tp => tp.id === project?.id));
  const projectTasksIncomplete = projectTasks?.filter(task => task.status !== 'Completed');
  const projectObjectives = objectives?.filter(objective => objective.projects.some(op => op.id === project?.id));

  return (
    <>
      <h4>{ project && project.name }</h4>
      <Tabs
        className="mb-3"
        defaultActiveKey={defaultTab || 'tasks'}
      >
        <Tab
          eventKey="tasks"
          title={`${t('tasks')} (${projectTasksIncomplete?.length})`}
        >
          <TasksView
            onTaskClick={
              taskId => operations.pane.setPaneContent({
                type: 'TASK',
                id: taskId,
              })(dispatch)
            }
            projectId={project?.id}
            showAddButton
            showCompletionFilter
            showDueDateFilter
            tasks={projectTasks}
          />
        </Tab>
        <Tab
          eventKey="objectives"
          title={`Objectifs (${projectObjectives?.length})`}
        >
          <ObjectivesView
            objectives={projectObjectives}
            showAddButton
            showCompletionFilter
          />
        </Tab>
        <Tab
          eventKey="workload"
          title="Charge de travail"
        >
          <Table>
            <tbody>
              <tr>
                <td />
              </tr>
            </tbody>
          </Table>
        </Tab>
        <Tab
          eventKey="stats"
          title="Statistiques"
        >
          <Stats
            projectId={project?.id}
          />
        </Tab>
        <Tab
          eventKey="infos"
          title="Informations"
        >
          <ProjectInformationsForm
            project={project}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default ProjectPane;
