import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { operations } from 'services';
import links from 'utils/links';

const TemplateRow = ({
  template,
}) => {
  const dispatch = useDispatch();

  return (
    <tr className="templateRow">
      <td
        className="templateRow_comments"
        style={{ cursor: 'pointer' }}
      >
        <Link
          style={{ textDecoration: 'none' }}
          to={links.template(template.id)}
        >
          <div
            style={{
              color: '#000',
              height: '100%',
              width: '100%',
            }}
          >
            { template.name }
          </div>
        </Link>
      </td>
      <td width={35}>
        <FontAwesomeIcon
          icon="times"
          size="1x"
          onClick={() => {
            operations.templates.deleteTemplate(template.id)(dispatch);
          }}
          style={{
            color: '#ce0000',
            cursor: 'pointer',
          }}
        />
      </td>
    </tr>
  );
}

export default TemplateRow;
