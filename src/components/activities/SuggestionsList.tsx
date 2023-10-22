import React, { useState, useEffect } from 'react';
import ClickOutside from 'react-click-outside';
import Collapse from '@kunukn/react-collapse';
import './SuggestionsList.scss';

const SuggestionsList = ({
  maxLength,
  onSelectSuggestion,
  suggestions,
}) => {
  const [isOpen, setIsOpen] = useState(suggestions.length > 0);

  useEffect(() => {
    setIsOpen(suggestions.length > 0);
  }, [suggestions]);

  return (
    <ClickOutside
      onClickOutside={() => setIsOpen(false)}
    >
      <Collapse
        isOpen={isOpen}
      >
        <div>
          {
            suggestions
              .slice(0, maxLength)
              .map(suggestion => (
                <div
                  className="suggestions_suggestion"
                  key={suggestion.id}
                  onClick={() => {
                    onSelectSuggestion(suggestion);
                    setIsOpen(false);
                  }}
                >
                  { suggestion.comments }
                </div>
              ))
          }
        </div>
      </Collapse>
    </ClickOutside>
  );
}

export default SuggestionsList;
