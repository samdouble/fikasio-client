import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

const AddTaskButton = ({
  onClick,
  style,
}) => {
  const { t } = useTranslation();

  return (
    <div
      style={style}
    >
      <Button
        onClick={() => onClick('NEW')}
        variant="primary"
      >
        {t('createATask')}
      </Button>
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
    </div>
  );
};

export default AddTaskButton;
