import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { operations } from 'services';
import { RootState } from 'services/store';

const SettingsAdvanced = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.login);
  const { user } = login;

  const onSubmit = async values => {
    operations.login.patchUserMe({
      ...values,
    })(dispatch);
  };

  return (
    <Form
      initialValues={user}
      mutators={{ ...arrayMutators }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RBForm.Group>
            <RBForm.Label>
              {t('censoredWords')}
            </RBForm.Label>
            <FieldArray
              name="censoredWords"
            >
              {({ fields }) => (
                <div>
                  <table
                    style={{
                      width: '100%',
                    }}
                  >
                    <tbody>
                    {
                      fields
                        .map((name, index) => (
                          <tr
                            key={name}
                          >
                            <td>
                              <Field
                                className="form-control"
                                component="input"
                                name={name}
                              />
                            </td>
                            <td width={35}>
                              <FontAwesomeIcon
                                icon="times"
                                onClick={() => fields.remove(index)}
                                size="1x"
                                style={{
                                  color: '#ce0000',
                                  cursor: 'pointer',
                                  marginLeft: 10,
                                }}
                              />
                            </td>
                          </tr>
                        ))
                    }
                    </tbody>
                  </table>
                  <Button
                    onClick={() => fields.push('')}
                  >
                    {t('add')}
                  </Button>
                </div>
              )}
            </FieldArray>
          </RBForm.Group>
          <Button
            style={{
              float: 'right',
            }}
            type="submit"
            variant="success"
          >
            {t('save')}
          </Button>
        </form>
      )}
    />
  );
};

export default SettingsAdvanced;
