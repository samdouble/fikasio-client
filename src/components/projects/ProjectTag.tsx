import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { operations } from 'services';
import { RootState } from 'services/store';
import { invertColor } from 'utils/colors';

const ProjectTag = ({
  projectId,
}) => {
  const projects = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();
  const project = projects?.find(p => p.id === projectId);

  return project ? (
    <div
      data-tooltip-id={`project_${project.id}`}
      data-tooltip-content={project.name}
      onClick={
        () => operations.pane.setPaneContent({
            type: 'PROJECT',
            id: project.id,
          })(dispatch)
      }
      style={{
        backgroundColor: project.color,
        borderRadius: 3,
        color: project.color ? invertColor(project.color) : 'blue',
        cursor: 'pointer',
        display: 'inline-block',
        padding: '3px 5px',
        textDecoration: project.color ? 'none' : 'underline',
      }}
    >
      <Tooltip id={`project_${project.id}`} />
      {
        (project.name.length > 12)
          ? project.name.substr(0, 12).concat('...')
          : project.name
      }
    </div>
  ) : <div />;
};

export default ProjectTag;
