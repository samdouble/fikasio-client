import React from 'react';
import FilterButton from 'components/UI/FilterButton';
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
        isMobile && <FilterButton />
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
