import React, { useState } from 'react';
import { SearchBar } from '@fikasio/react-ui-components';
import { useGetProjectsQuery } from 'services/projects/api';
import { useGetTasksQuery } from 'services/tasks/api';

const MySearchBar = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { data: projects } = useGetProjectsQuery();
  const { data: tasks } = useGetTasksQuery({});

  const getSuggestions = text => {
    const inputValue = text.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return [];
    }
    return [
      ...(projects || [])
        .filter(p => (
          p.name.toLowerCase().slice(0, inputLength) === inputValue
        ))
        .map(p => ({
          name: p.name,
          type: 'PROJECT',
        })),
      ...(tasks || [])
        .filter(t => (
          t.description.toLowerCase().slice(0, inputLength) === inputValue
        ))
        .map(t => ({
          name: t.description,
          type: 'TASK',
        })),
    ]
    .slice(0, 10);
  };

  return (
    <SearchBar
      onChange={value => setSuggestions(getSuggestions(value))}
      options={suggestions.map(s => s.name)}
      style={{
        backgroundColor: 'white',
        width: 320,
      }}
    />
  );
}

export default MySearchBar;
