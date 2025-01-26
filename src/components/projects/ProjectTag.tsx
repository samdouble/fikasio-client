import React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { setPaneContent } from 'services/pane/slice';
import { useGetProjectsQuery } from 'services/projects/api';
import { invertColor } from 'utils/colors';

const ProjectTag = ({
  projectId,
}) => {
  const { data: projects } = useGetProjectsQuery();
  const dispatch = useDispatch();
  const project = projects?.find(p => p.id === projectId);

  return project ? (
    <div
      data-tooltip-id={`project_${project.id}`}
      data-tooltip-content={project.name}
      onClick={
        () => dispatch(
          setPaneContent({
            type: 'PROJECT',
            id: project.id,
          })
        )
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
        (project.name.length > 10)
          ? project.name.substring(0, 10).concat('...')
          : project.name
      }
    </div>
  ) : <div />;
};

export default ProjectTag;
