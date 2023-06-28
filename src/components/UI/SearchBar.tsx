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

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : projects?.filter(lang => (
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    ));
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value) || []);
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
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSuggestion={renderSuggestion}
        suggestions={suggestions}
      />
    </div>
  );
}

export default SearchBar;
