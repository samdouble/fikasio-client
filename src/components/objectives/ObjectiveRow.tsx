import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import { DateTime } from 'luxon';
import ProjectTag from 'components/projects/ProjectTag';
import { operations } from 'services';
import Dot from './Dot';
import { getEstimatedCompletionDate } from './utils';

const ObjectiveRow = ({
  createObjective,
  deleteObjective,
  objective,
  patchObjective,
  setPaneContent,
}) => {
  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);
  const today = DateTime.fromJSDate(new Date());
  const currentProgress = objective.progress || 0;
  const dueDate = DateTime.fromISO(objective.dueDate);
  const estimatedCompletionDate = getEstimatedCompletionDate(objective);
  const isLate = currentProgress < objective.goal && today > dueDate;
  const isEstimatedLate = !isLate && estimatedCompletionDate && (estimatedCompletionDate > dueDate);
  const color = (isLate ? '#ff0000' : (isEstimatedLate ? '#dfa901' : '#5b995b'));

  return (
    <tr>
      <td
        onClick={() => setPaneContent({
          type: 'OBJECTIVE',
          id: objective.id,
        })}
        style={{
          cursor: 'pointer',
        }}
      >
        <Dot color={color} width={15} />
        { objective.name }
      </td>
      <td width={140}>
        {
          objective && objective.projects && objective.projects
            .map(p => (
              <ProjectTag
                key={p.id}
                projectId={p.id}
              />
            ))
        }
      </td>
      <td width={140}>
        {
          objective && objective.goal
            ? `${objective.progress || objective.initialProgress || 0} / ${objective.goal}`
            : '-'
        }
      </td>
      <td
        onClick={() => setIsDueAtDatepickerOpen(true)}
        style={{
          cursor: 'pointer',
          ...(isLate && { color: '#ff0000' }),
        }}
        width={160}
      >
        <DatePicker
          customInput={<input type='hidden' />}
          dateFormat="yyyy-MM-dd"
          isOpen={isDueAtDatepickerOpen}
          name="dueDate"
          onChange={dueAt => {
            const timestamp = DateTime.fromJSDate(dueAt)
              .set({ hour: 23, minute: 59, second: 59 })
              .toFormat('yyyy-MM-dd');
            patchObjective(objective.id, { dueDate: timestamp });
          }}
          popperPlacement="auto"
          selected={dueDate.toMillis() || Date.now()}
        />
        <FontAwesomeIcon
          icon="calendar-alt"
          size="1x"
          style={{ marginRight: 10 }}
        />
        { objective.dueDate }
      </td>
      <td width={35}>
        <FontAwesomeIcon
          icon="copy"
          size="1x"
          onClick={() => createObjective(objective)}
          style={{
            cursor: 'pointer',
          }}
        />
      </td>
      <td
        width={35}
      >
        <FontAwesomeIcon
          icon="archive"
          size="1x"
          onClick={() => {
            const isArchived = objective.isArchived || false;
            patchObjective(objective.id, { isArchived: !isArchived });
          }}
          style={{
            cursor: 'pointer',
          }}
        />
      </td>
      <td width={35}>
        <FontAwesomeIcon
          icon="times"
          size="1x"
          onClick={() => deleteObjective(objective.id)}
          style={{
            color: '#ce0000',
            cursor: 'pointer',
          }}
        />
      </td>
    </tr>
  );
};

function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createObjective: operations.objectives.createObjective,
    deleteObjective: operations.objectives.deleteObjective,
    patchObjective: operations.objectives.patchObjective,
    setPaneContent: operations.pane.setPaneContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveRow);
