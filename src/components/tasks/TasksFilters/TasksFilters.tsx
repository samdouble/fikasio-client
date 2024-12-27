import React from 'react';
import FilterButton from 'components/UI/FilterButton';
import useIsMobile from 'utils/isMobile';
import TasksCompletionFilter from './TasksCompletionFilter';
import TasksDueDateFilter from './TasksDueDateFilter';

interface TasksFiltersProps {
  onChangeCompletionFilter: (value: string) => void;
  onChangeDueDateFilter: (value: string) => void;
  showCompletionFilter?: boolean;
  showDueDateFilter?: boolean;
  style?: React.CSSProperties;
}

const TasksFilters = ({
  onChangeCompletionFilter,
  onChangeDueDateFilter,
  showCompletionFilter,
  showDueDateFilter,
  style,
}: TasksFiltersProps) => {
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
                <TasksCompletionFilter
                  onChange={onChangeCompletionFilter}
                  style={{
                    float: 'right',
                    margin: 5,
                    ...(!showDueDateFilter && { marginRight: 0 }),
                  }}
                />
              )
            }
            {
              showDueDateFilter && (
                <TasksDueDateFilter
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
};

export default TasksFilters;
