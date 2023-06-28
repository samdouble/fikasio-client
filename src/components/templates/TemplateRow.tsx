import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { operations } from 'services';

const TemplateRow = ({
  deletable,
  onSelect,
  template,
}) => {
  const dispatch = useDispatch();

  return (
    <tr className="templateRow">
      <td
        className="templateRow_comments"
        onClick={() => onSelect && onSelect(template.id)}
        style={{ cursor: 'pointer' }}
      >
        { template.name }
      </td>
      <td width={35}>
        <FontAwesomeIcon
          icon="times"
          size="1x"
          onClick={() => {
            if (deletable) {
              operations.templates.deleteTemplate(template.id)(dispatch);
            }
          }}
          style={{
            color: '#ce0000',
            ...(!deletable && { opacity: 0.3 }),
            ...(deletable && { cursor: 'pointer' }),
          }}
        />
      </td>
    </tr>
  );
}

export default TemplateRow;
