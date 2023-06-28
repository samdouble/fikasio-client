import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { operations } from 'services';
import ObjectiveInformations from './ObjectiveInformations';
import ObjectiveProgress from './ObjectiveProgress';
import ObjectiveStats from './ObjectiveStats';

const ProjectPane = ({
  defaultTab,
  id,
  objectives,
}) => {
  const objective = (objectives || []).find(o => o.id === id) || {};

  return (
    <>
      <h4>{ objective && objective.name }</h4>
      <Tabs
        className="mb-3"
        defaultActiveKey={defaultTab}
      >
        {
          objective.id && (
            <Tab
              eventKey="stats"
              title="Statistiques"
            >
              <ObjectiveStats
                objective={objective}
              />
            </Tab>
          )
        }
        {
          objective.id && (
            <Tab
              eventKey="progress"
              title="Progrès"
            >
              <ObjectiveProgress
                objective={objective}
              />
            </Tab>
          )
        }
        <Tab
          eventKey="infos"
          title="Informations"
        >
          <ObjectiveInformations
            objective={objective}
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
