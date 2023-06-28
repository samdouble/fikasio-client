import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResourcesHandler from 'components/ResourcesHandler';
import TasksView from 'components/tasks/TasksView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import './style.scss';

const HomePage = ({
  metrics, fetchMetrics,
  objectives, fetchObjectives,
  projects, fetchProjects,
  setPaneContent,
  tasks, fetchTasks,
}) => {
  const getPage = () => (
    <BasePage>
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

  return (
    <ResourcesHandler
      resources={[metrics, objectives, projects, tasks]}
      resourceFetchers={[fetchMetrics, fetchObjectives, fetchProjects, fetchTasks]}
      getContents={getPage}
    />
  );
}

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
    fetchMetrics: operations.metrics.fetchMetrics,
    fetchObjectives: operations.objectives.fetchObjectives,
    fetchProjects: operations.projects.fetchProjects,
    fetchTasks: operations.tasks.fetchTasks,
    setPaneContent: operations.pane.setPaneContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
