import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ResourcesHandler from 'components/ResourcesHandler';
import TasksView from 'components/tasks/TasksView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import links from 'utils/links';
import './style.scss';

const TasksPage = ({
  metrics, fetchMetrics,
  objectives, fetchObjectives,
  projects, fetchProjects,
  setPaneContent,
  tasks, fetchTasks,
}) => {
  const getPage = () => {
    return (
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>Accueil</Breadcrumb.Item>
          <Breadcrumb.Item active>Tâches</Breadcrumb.Item>
        </Breadcrumb>
        <h4>Tâches</h4>
        <TasksView
          onTaskSelect={taskId => setPaneContent({
            type: 'TASK',
            id: taskId,
          })}
          showAddButton
          showCompletionFilter
          showDueDateFilter
          tasks={tasks}
        />
      </BasePage>
    );
  };

  return (
    <ResourcesHandler
      resources={[tasks, metrics, objectives, projects]}
      resourceFetchers={[fetchTasks, fetchMetrics, fetchObjectives, fetchProjects]}
      getContents={getPage}
    />
  );
};

function mapStateToProps(state) {
  return {
    metrics: state.metrics,
    objectives: state.objectives,
    projects: state.projects,
    tasks: state.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTasks: operations.tasks.fetchTasks,
    fetchMetrics: operations.metrics.fetchMetrics,
    fetchObjectives: operations.objectives.fetchObjectives,
    fetchProjects: operations.projects.fetchProjects,
    setPaneContent: operations.pane.setPaneContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
