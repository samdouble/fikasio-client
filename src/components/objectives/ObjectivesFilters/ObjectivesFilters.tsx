import React from 'react';
import FilterButton from 'components/UI/FilterButton';
import useIsMobile from 'utils/isMobile';
import ObjectivesCompletionFilter from './ObjectivesCompletionFilter';
import ObjectivesDueDateFilter from './ObjectivesDueDateFilter';

interface ObjectivesFiltersProps {
  onChangeCompletionFilter: (value: string) => void;
  onChangeDueDateFilter: (value: string) => void;
  showCompletionFilter?: boolean;
  showDueDateFilter?: boolean;
  style?: React.CSSProperties;
}

const ObjectivesFilters = ({
  onChangeCompletionFilter,
  onChangeDueDateFilter,
  showCompletionFilter,
  showDueDateFilter,
  style,
}: ObjectivesFiltersProps) => {
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
                <ObjectivesCompletionFilter
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
                <ObjectivesDueDateFilter
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

export default ObjectivesFilters;
