import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';
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
        isMobile && (
          <>
            <Button
              data-tooltip-content="filters"
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
                <TasksCompletionFilter
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
