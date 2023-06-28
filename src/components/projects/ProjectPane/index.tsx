import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import ObjectivesView from 'components/objectives/ObjectivesView';
import TasksView from 'components/tasks/TasksView';
import { operations } from 'services';
import ProjectInformationsForm from './ProjectInformationsForm';
import Stats from './Stats';

const ProjectPane = ({
  defaultTab,
  id,
  objectives,
  projects,
  setPaneContent,
  tasks,
}) => {
  const project = (projects || []).find(p => p.id === id) || {};
  const projectTasks = tasks
    .filter(task => task.projects.some(tp => tp.id === project.id));
  const projectTasksIncomplete = projectTasks
    .filter(task => !task.isCompleted);
  const projectObjectives = objectives
    .filter(objective => objective.projects.some(op => op.id === project.id));

  return (
    <>
      <h4>{ project && project.name }</h4>
      <Tabs
        className="mb-3"
        defaultActiveKey={defaultTab || 'tasks'}
      >
        <Tab eventKey="tasks" title={`Tâches (${projectTasksIncomplete.length})`}>
          <TasksView
            onTaskSelect={taskId => setPaneContent({
              type: 'TASK',
              id: taskId,
            })}
            projectId={project.id}
            showAddButton
            showCompletionFilter
            showDueDateFilter
            tasks={projectTasks}
          />
        </Tab>
        <Tab eventKey="objectives" title={`Objectifs (${projectObjectives.length})`}>
          <ObjectivesView
            objectives={projectObjectives}
            showAddButton
            showCompletionFilter
          />
        </Tab>
        <Tab eventKey="workload" title="Charge de travail">
          <Table>
            <tbody>
              <tr>
                <td />
              </tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="stats" title="Statistiques">
          <Stats
            projectId={project.id}
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

function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    projects: state.projects,
    tasks: state.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPaneContent: operations.pane.setPaneContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPane);
