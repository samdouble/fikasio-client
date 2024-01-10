import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';
import useIsMobile from 'utils/isMobile';
import ProjectsCompletionFilter from './ProjectsCompletionFilter';
import ProjectsDueDateFilter from './ProjectsDueDateFilter';

interface ProjectsFiltersProps {
  onChangeCompletionFilter: (value: string) => void;
  onChangeDueDateFilter: (value: string) => void;
  showCompletionFilter?: boolean;
  showDueDateFilter?: boolean;
  style?: React.CSSProperties;
}

const ProjectsFilter = ({
  onChangeCompletionFilter,
  onChangeDueDateFilter,
  showCompletionFilter,
  showDueDateFilter,
  style,
}: ProjectsFiltersProps) => {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        ...style,
      }}
    >
      {
        isMobile && (
          <>
            <Button
              data-tooltip-content="Filters"
              data-tooltip-id="filters"
              style={{
                float: 'right',
              }}
              variant="light"
            >
              <FontAwesomeIcon
                icon="sliders"
                size="1x"
              />
            </Button>
            <Tooltip id="filters" />
          </>
        )
      }
      {
        !isMobile && (
          <>
            {
              showCompletionFilter && (
                <ProjectsCompletionFilter
                  onChange={onChangeCompletionFilter}
                  style={{
                    float: 'right',
                    margin: 5,
                  }}
                />
              )
            }
            {
              showDueDateFilter && (
                <ProjectsDueDateFilter
                  onChange={onChangeDueDateFilter}
                  style={{
                    float: 'right',
                    margin: 5,
                    marginRight: 0,
                  }}
                />
              )
            }
          </>
        )
      }
    </div>
  );
}

export default ProjectsFilter;
