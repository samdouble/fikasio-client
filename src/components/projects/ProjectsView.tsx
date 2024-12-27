import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Project } from 'services/projects/types';
import ProjectsList from './ProjectsList';
import AddProjectButton from './AddProjectButton';
import ProjectsFilters from './ProjectsFilters/ProjectsFilters';

interface ProjectsViewProps {
  onAddProject?: (project: Partial<Project>) => void;
  onProjectClick: (projectId: string) => void;
  projects?: Project[] | null;
  showAddButton?: boolean;
  showCompletionFilter?: boolean;
  showDueDateFilter?: boolean;
  showViewModeButtons?: boolean;
}

const ProjectsView = ({
  onAddProject,
  onProjectClick,
  projects,
  showAddButton,
  showCompletionFilter,
  showDueDateFilter,
  showViewModeButtons,
}: ProjectsViewProps) => {
  const { t } = useTranslation();
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
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

  const handleProjectSelect = project => {
    const isProjectAlreadySelected = selectedProjects.find(a => a.id === project.id);
    if (isProjectAlreadySelected) {
      setSelectedProjects([
        ...selectedProjects.filter(a => a.id !== project.id),
      ]);
    } else {
      setSelectedProjects([
        ...selectedProjects,
        project,
      ]);
    }
  };

  return (
    <>
      {
        showAddButton && (
          <AddProjectButton
            onClick={onProjectClick}
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
      <>
        {
          showViewModeButtons && (
            <div style={{ textAlign: 'left' }}>
              <Button
                active
                onClick={() => undefined}
                variant="outline-secondary"
              >
                <FontAwesomeIcon icon="list" size="1x" />
              </Button>
            </div>
          )
        }
        <ProjectsList
          onAddProject={onAddProject}
          onProjectClick={onProjectClick}
          onProjectSelect={handleProjectSelect}
          onSelectAllProjects={projectsArray => setSelectedProjects(projectsArray)}
          projects={projects}
          selectedProjects={selectedProjects}
          showCompleteProjects={showCompleteProjects}
          showIncompleteProjects={showIncompleteProjects}
          showArchivedProjects={showArchivedProjects}
        />
      </>
      {
        selectedProjects.length > 0 && (
          <div
            style={{
              backgroundColor: '#7E5B9A',
              bottom: 50,
              color: 'white',
              height: 100,
              left: '22%',
              margin: 'auto',
              padding: 10,
              position: 'fixed',
              width: '60%',
            }}
          >
            <FontAwesomeIcon
              icon="times"
              onClick={() => {
                setSelectedProjects([]);
              }}
              style={{
                cursor: 'pointer',
                marginRight: 10,
                width: 25,
              }}
            />
            <b>
              {t('xSelectedProjects', { count: selectedProjects.length })}
            </b>
          </div>
        )
      }
    </>
  );
};

export default ProjectsView;
