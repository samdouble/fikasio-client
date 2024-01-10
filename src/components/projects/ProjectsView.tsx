import React, { useState } from 'react';
import { Project } from 'services/projects/types';
import ProjectsList from './ProjectsList';
import AddProjectButton from './AddProjectButton';
import ProjectsFilters from './ProjectsFilters/ProjectsFilters';

interface ProjectsViewProps {
  onProjectSelect: (projectId: string) => void;
  projects?: Project[] | null;
  showAddButton?: boolean;
  showCompletionFilter?: boolean;
  showDueDateFilter?: boolean;
}

const ProjectsView = ({
  onProjectSelect,
  projects,
  showAddButton,
  showCompletionFilter,
  showDueDateFilter,
}: ProjectsViewProps) => {
  const [showCompleteProjects, setShowCompleteProjects] = useState(false);
  const [showIncompleteProjects, setShowIncompleteProjects] = useState(true);
  const [showArchivedProjects, setShowArchivedProjects] = useState(false);

  const handleChangeCompletionFilter = val => {
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

  const handleChangeDueDateFilter = _val => {

  };

  return (
    <>
      {
        showAddButton && (
          <AddProjectButton
            onClick={onProjectSelect}
            style={{
              float: 'right',
              marginRight: 0,
            }}
          />
        )
      }
      <ProjectsFilters
        onChangeCompletionFilter={handleChangeCompletionFilter}
        onChangeDueDateFilter={handleChangeDueDateFilter}
        showCompletionFilter={showCompletionFilter}
        showDueDateFilter={showDueDateFilter}
      />
      <br />
      <br />
      <ProjectsList
        onProjectSelect={onProjectSelect}
        projects={projects}
        showCompleteProjects={showCompleteProjects}
        showIncompleteProjects={showIncompleteProjects}
        showArchivedProjects={showArchivedProjects}
      />
    </>
  );
};

export default ProjectsView;
