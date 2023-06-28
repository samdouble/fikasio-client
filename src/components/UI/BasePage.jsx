import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SlidingPane from 'react-sliding-pane';
import ActivityPane from 'components/activities/ActivityPane';
// import EntityPane from 'components/entities/EntityPane';
import FieldPane from 'components/entities/fields/FieldPane';
// import ItemPane from 'components/entities/items/ItemPane';
import ObjectivePane from 'components/objectives/ObjectivePane';
import ProjectPane from 'components/projects/ProjectPane';
import TaskPane from 'components/tasks/TaskPane';
import TemplatePane from 'components/templates/TemplatePane';
import Sidebar from 'components/UI/Sidebar';
import { operations } from 'services';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './style.scss';

const BasePage = ({
  children,
  clearPaneContent,
  paneContent,
}) => {
  let pane = <div />;
  if (paneContent && paneContent.type === 'ACTIVITY') {
    const { activity } = paneContent;
    pane = <ActivityPane
      activity={activity}
    />;
  /*
  else if (paneContent && paneContent.type === 'ITEM') {
    pane = <ItemPane
      defaultTab={paneContent && paneContent.id === 'NEW' && 'infos'}
      id={paneContent && paneContent.id}
    />;
  */
  } else if (paneContent && paneContent.type === 'FIELD') {
    pane = <FieldPane
      entityId={paneContent && paneContent.entityId}
      id={paneContent && paneContent.id}
    />;
  } else if (paneContent && paneContent.type === 'OBJECTIVE') {
    pane = <ObjectivePane
      defaultTab={paneContent && paneContent.id === 'NEW' && 'infos'}
      id={paneContent && paneContent.id}
    />;
  } else if (paneContent && paneContent.type === 'PROJECT') {
    pane = <ProjectPane
      defaultTab={paneContent && paneContent.id === 'NEW' && 'infos'}
      id={paneContent && paneContent.id}
    />;
  } else if (paneContent && paneContent.type === 'TASK') {
    pane = <TaskPane
      id={paneContent && paneContent.id}
    />;
  } else if (paneContent && paneContent.type === 'TEMPLATE') {
    pane = <TemplatePane
      id={paneContent && paneContent.id}
    />;
  }

  return (
    <>
      <Sidebar />
      <SlidingPane
        isOpen={!!paneContent}
        onRequestClose={() => clearPaneContent()}
        overlayClassName="sliding-pane-overlay"
      >
        { pane }
      </SlidingPane>
      <Container fluid style={{
        paddingLeft: 100,
        paddingTop: 90,
      }}>
        <Row>
          <Col lg={12}>
            { children }
          </Col>
        </Row>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    paneContent: state.pane,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearPaneContent: operations.pane.clearPaneContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePage);
