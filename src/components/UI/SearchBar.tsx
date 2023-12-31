import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from 'services/store';
import './SearchBar.scss';

const renderSuggestion = suggestion => (
  <div
    style={{
      cursor: 'pointer',
      padding: 5,
    }}
  >
    {suggestion.name}
  </div>
);

const SearchBar = ({ style }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);

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

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value: text }) => {
    setSuggestions(getSuggestions(text) || []);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <div
      style={{
        ...style,
      }}
    >
      <FontAwesomeIcon
        icon="search"
        size="1x"
        style={{
          marginLeft: 10,
          position: 'relative',
          left: 25,
        }}
      />
      {/*
        <input
          type="text"
          style={{
            borderRadius: 0,
            marginRight: 50,
            paddingLeft: 30,
          }}
        />
        */}
      <Autosuggest
        getSuggestionValue={suggestion => suggestion.name}
        inputProps={{
          onChange,
          value,
        }}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        renderSuggestion={renderSuggestion}
        suggestions={suggestions}
      />
    </div>
  );
}

export default SearchBar;
