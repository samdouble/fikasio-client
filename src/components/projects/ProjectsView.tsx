import React, { useState } from 'react';
import ProjectsList from './ProjectsList';
import AddProjectButton from './AddProjectButton';
import ProjectsFilter from './ProjectsFilter';

const ProjectsView = ({
  onProjectSelect,
}) => {
  const [showCompleteProjects, setShowCompleteProjects] = useState(false);
  const [showIncompleteProjects, setShowIncompleteProjects] = useState(true);
  const [showArchivedProjects, setShowArchivedProjects] = useState(false);

  const handleChangeFilter = val => {
    if (val === 'ALL') {
      setShowCompleteProjects(true);
      setShowIncompleteProjects(true);
      setShowArchivedProjects(true);
    } else if (val === 'COMPLETE') {
      setShowCompleteProjects(true);
      setShowIncompleteProjects(false);
      setShowArchivedProjects(false);
    } else if (val === 'INCOMPLETE') {
      setShowCompleteProjects(false);
      setShowIncompleteProjects(true);
      setShowArchivedProjects(false);
    } else if (val === 'ARCHIVED') {
      setShowCompleteProjects(false);
      setShowIncompleteProjects(false);
      setShowArchivedProjects(true);
    }
  };

  return (
    <>
      <AddProjectButton
        onClick={onProjectSelect}
        style={{
          float: 'right',
          marginRight: 0,
        }}
      />
      <ProjectsFilter
        onChange={handleChangeFilter}
        style={{
          float: 'right',
          margin: 5,
        }}
      />
      <br />
      <br />
      <ProjectsList
        onProjectSelect={onProjectSelect}
        showCompleteProjects={showCompleteProjects}
        showIncompleteProjects={showIncompleteProjects}
        showArchivedProjects={showArchivedProjects}
      />
    </>
  );
};

export default ProjectsView;
