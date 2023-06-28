import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { useTranslation } from 'react-i18next';
import Sidebar from 'components/UI/Sidebar';
import { operations } from 'services';
import { setLanguage } from 'utils/translation';
import './style.scss';

const SettingsPage = ({ login, patchUserMe }) => {
  const { user } = login;
  const { language } = user;
  const { t } = useTranslation();

  const handleChangeLanguage = e => {
    patchUserMe({
      language: e.target.value,
    })
    .then(res => {
      setLanguage(res.payload.user.language);
    });
  };

  const onSubmit = async values => {
    patchUserMe({
      ...values,
    });
  };

  return (
    <>
      <Sidebar />
      <Container
        fluid
        style={{
          paddingLeft: 100,
          paddingTop: 90,
        }}
      >
        <Row>
          <Col lg={12}>
            <h4>{t('settings')}</h4>
            <RBForm.Group>
              <RBForm.Label>Langue</RBForm.Label>
              <select
                className="form-control"
                defaultValue={language}
                onChange={e => handleChangeLanguage(e)}
                style={{
                  width: 400,
                }}
              >
                <option value='en'>English</option>
                <option value='fr'>Français</option>
              </select>
            </RBForm.Group>
            <Form
              onSubmit={onSubmit}
              initialValues={user.censoredWords}
              mutators={{ ...arrayMutators }}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <RBForm.Group>
                    <RBForm.Label>Censure</RBForm.Label>
                    <FieldArray name="censoredWords">
                      {({ fields }) => (
                        <div>
                          {
                            fields.map((name, index) => (
                              <table key={name}>
                                <tbody>
                                  <tr>
                                    <td>
                                      <Field
                                        name={name}
                                        component="input"
                                        className="form-control"
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
                            onClick={() => fields.push('')}
                          >
                            Ajouter
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                  </RBForm.Group>
                  <Button type="submit" variant='success'>Sauvegarder</Button>
                </form>
              )}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    patchUserMe: operations.login.patchUserMe,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
