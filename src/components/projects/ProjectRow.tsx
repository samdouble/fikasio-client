import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import ClickOutside from 'react-click-outside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime, Duration } from 'luxon';
import classNames from 'classnames';
import Datepicker from 'components/UI/Datepicker';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import { isEmpty } from 'utils/isEmpty';
import { round } from 'utils/maths';
import './style.scss';

const ProjectRow = ({
  createProject,
  deleteProject,
  onClick,
  patchProject,
  project,
}) => {
  const { t } = useTranslation();
  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);
  const hasdueAtPassed = project && project.dueAt && DateTime.fromISO(project.dueAt) < DateTime.now();

  return (
    <tr className={classNames({ done: project.isCompleted && !project.isArchived })}>
      <td
        onClick={() => onClick(project.id)}
        style={{ cursor: 'pointer' }}
      >
        { project.name }
      </td>
      <td width={150}>
        {
          !isEmpty(project.incompleteTime)
            ? Duration.fromMillis(project.incompleteTime * 60 * 1000).toFormat('h:mm')
            : '-'
        }
      </td>
      <td width={150}>
        {
          !isEmpty(project.completionRatio)
            ? `${round(project.completionRatio * 100, 1)}%`
            : '-'
        }
      </td>
      <td
        className="projectRow_dueAt"
        width={150}
        onClick={() => setIsDueAtDatepickerOpen(true)}
        style={{
          cursor: 'pointer',
          ...(!project.isCompleted && hasdueAtPassed && { color: '#ff0000' }),
        }}
      >
        <ClickOutside
          onClickOutside={() => setIsDueAtDatepickerOpen(false)}
        >
          <Datepicker
            defaultValue={DateTime.fromISO(project.dueAt).toMillis()}
            isOpen={isDueAtDatepickerOpen}
            name="dueAt"
            onBlur={() => setIsDueAtDatepickerOpen(false)}
            onChange={dueAt => {
              const timestamp = DateTime.fromJSDate(dueAt)
                .set({ hour: 23, minute: 59, second: 59 })
                .toISO();
              patchProject(project.id, { dueAt: timestamp });
            }}
          />
        </ClickOutside>
        <FontAwesomeIcon
          icon="calendar-alt"
          size="1x"
          style={{ marginRight: 10 }}
        />
        {
          project
            && project.dueAt
            && DateTime.fromISO(project.dueAt).toFormat('yyyy-MM-dd')
        }
        {
          project && project.dueAt && (
            <FontAwesomeIcon
              className="projectRow_dueAt_remove"
              icon="times"
              onClick={e => {
                e.stopPropagation();
                patchProject(project.id, { dueAt: null });
              }}
              size="1x"
            />
          )
        }
      </td>
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Dropdown
          style={{
            position: 'static',
          }}
        >
          <Dropdown.Toggle as={DropdownToggle} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => createProject(project)}
            >
              <FontAwesomeIcon
                icon="copy"
                style={{
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('copy')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                const isArchived = project.isArchived || false;
                patchProject(project.id, { isArchived: !isArchived });
              }}
            >
              <FontAwesomeIcon
                icon="archive"
                style={{
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('archive')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => deleteProject(project.id)}
            >
              <FontAwesomeIcon
                icon="times"
                style={{
                  color: 'red',
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('delete')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

function mapStateToProps(state) {
  return {
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createProject: operations.projects.createProject,
    deleteProject: operations.projects.deleteProject,
    patchProject: operations.projects.patchProject,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRow);
