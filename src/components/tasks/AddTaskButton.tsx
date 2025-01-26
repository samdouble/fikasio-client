import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { Button } from '@fikasio/react-ui-components';

const AddTaskButton = ({
  onClick,
  showCreateSectionButton,
  style,
}) => {
  const { t } = useTranslation();

  return (
    <div
      style={style}
    >
      <Button.Action
        onClick={() => onClick('NEW')}
      >
        {t('createATask')}
      </Button.Action>
      {
        showCreateSectionButton && (
          <ButtonGroup
            style={{
              marginLeft: -10,
            }}
          >
            <DropdownButton
              as={ButtonGroup}
              title=""
            >
              <Dropdown.Item
                eventKey="1"
              >
                {t('createASection')}
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        )
      }
    </div>
  );
};

export default AddTaskButton;
