import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SlidingPane from 'react-sliding-pane';
import ActivityPane from 'components/activities/ActivityPane';
// import EntityPane from 'components/entities/EntityPane';
import EntityFieldPane from 'components/entities/fields/FieldPane';
// import ItemPane from 'components/entities/items/ItemPane';
import ObjectivePane from 'components/objectives/ObjectivePane';
import OrganizationMemberPane from 'components/organizations/members/MemberPane';
import ProjectPane from 'components/projects/ProjectPane';
import TaskPane from 'components/tasks/TaskPane';
import TemplateFieldPane from 'components/templates/fields/FieldPane';
import Sidebar from 'components/UI/Sidebar';
import { clearPaneContent, getPaneContent } from 'services/pane/slice';
import {
  IActivityPane,
  IEntityFieldPane,
  IOrganizationMemberPane,
  ITemplateFieldPane,
} from 'services/pane/types';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './style.scss';

const BasePage = ({
  children,
}) => {
  const dispatch = useDispatch();
  const paneContent = useSelector(getPaneContent);
  let pane = <div />;
  if (paneContent && paneContent.type === 'ACTIVITY') {
    const activityPaneContent = paneContent as IActivityPane;
    const { activity } = activityPaneContent;
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
  } else if (paneContent && paneContent.type === 'ENTITY_FIELD') {
    const entityFieldPaneContent = paneContent as IEntityFieldPane;
    pane = <EntityFieldPane
      entityId={entityFieldPaneContent && entityFieldPaneContent.entityId}
      id={entityFieldPaneContent && entityFieldPaneContent.id}
    />;
  } else if (paneContent && paneContent.type === 'OBJECTIVE') {
    pane = <ObjectivePane
      defaultTab={paneContent && paneContent.id === 'NEW' && 'infos'}
      id={paneContent && paneContent.id}
    />;
  } else if (paneContent && paneContent.type === 'ORGANIZATION_MEMBER') {
    const organizationMemberPaneContent = paneContent as IOrganizationMemberPane;
    pane = <OrganizationMemberPane
      organizationId={organizationMemberPaneContent && organizationMemberPaneContent.organizationId}
      id={organizationMemberPaneContent && organizationMemberPaneContent.id}
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
  } else if (paneContent && paneContent.type === 'TEMPLATE_FIELD') {
    const templateFieldPaneContent = paneContent as ITemplateFieldPane;
    pane = <TemplateFieldPane
      templateId={templateFieldPaneContent && templateFieldPaneContent.templateId}
      id={templateFieldPaneContent && templateFieldPaneContent.id}
    />;
  }

  return (
    <>
      <Sidebar />
      <SlidingPane
        isOpen={!!paneContent}
        onRequestClose={() => dispatch(clearPaneContent())}
        overlayClassName="sliding-pane-overlay"
      >
        { pane }
      </SlidingPane>
      <Container
        fluid
        style={{
          paddingLeft: 100,
          paddingRight: 30,
          paddingTop: 90,
        }}
      >
        <Row>
          <Col lg={12}>
            { children }
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BasePage;
