import React from 'react';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { operations } from 'services';
import { Organization } from 'services/organizations/types';
import 'react-datepicker/dist/react-datepicker.css';
import 'components/UI/Form.scss';

interface OrganizationInformationsFormProps {
  organization?: Organization;
}

const OrganizationInformationsForm = ({
  organization,
}: OrganizationInformationsFormProps) => {
  const dispatch = useDispatch();

  const onSubmit = async values => {
    const formData = values;
    if (organization) {
      operations.organizations.updateOrganization(organization.id, formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    } else {
      operations.organizations.createOrganization(formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={organization}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RBForm.Group>
            <RBForm.Label>Nom</RBForm.Label>
            <Field
              name="name"
              component="input"
              className="form-control"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Membres</RBForm.Label>
            <FieldArray name="members">
              {({ fields }) => (
                <div>
                  {
                    fields.map((name, index) => (
                      <table key={name}>
                        <tbody>
                          <tr>
                            <td>
                              <Field
                                className="form-control"
                                component="input"
                                name={`${name}.emailAddress`}
                              />
                            </td>
                            <td width={35}>
                              <FontAwesomeIcon
                                icon="times"
                                size="1x"
                                onClick={() => fields.remove(index)}
                                style={{
                                  color: '#ce0000',
                                  cursor: 'pointer',
                                  marginLeft: 10,
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))
                  }
                  <Button
                    onClick={() => fields.push({ description: '' })}
                  >
                    Ajouter
                  </Button>
                </div>
              )}
            </FieldArray>
          </RBForm.Group>
          <div
            style={{
              float: 'right',
              bottom: 10,
              paddingBottom: 15,
              position: 'absolute',
              right: 30,
            }}
          >
            {
              organization
                ? <Button type="submit" variant='success'>Sauvegarder</Button>
                : <Button type="submit" variant='success'>Créer</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default OrganizationInformationsForm;
