import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { useTranslation } from 'react-i18next';
import Sidebar from 'components/UI/Sidebar';
import { operations } from 'services';
import { PatchUserMeAction } from 'services/login/actions';
import { setLanguage } from 'utils/translation';
import './style.scss';
import { RootState } from 'services/store';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.login);
  const { user } = login;
  const { language } = user;
  const { t } = useTranslation();

  const handleChangeLanguage = e => {
    operations.login.patchUserMe({
      language: e.target.value,
    })(dispatch)
    .then(res => {
      const patchUserMeResponse = res as PatchUserMeAction;
      setLanguage(patchUserMeResponse.payload.user.language);
    });
  };

  const onSubmit = async values => {
    operations.login.patchUserMe({
      ...values,
    })(dispatch);
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
            <Tabs
              className="mb-3"
              defaultActiveKey="GENERAL"
            >
              <Tab
                eventKey="GENERAL"
                title="Général"
              >
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
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </RBForm.Group>
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
                              {
                                fields.map((name, index) => (
                                  <table key={name}>
                                    <tbody>
                                      <tr>
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
                                    </tbody>
                                  </table>
                                ))
                              }
                              <Button
                                onClick={() => fields.push('')}
                              >
                                {t('add')}
                              </Button>
                            </div>
                          )}
                        </FieldArray>
                      </RBForm.Group>
                      <Button type="submit" variant="success">{t('save')}</Button>
                    </form>
                  )}
                />
              </Tab>
              <Tab
                eventKey="PAYMENTS"
                title="Paiements"
              >
                
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SettingsPage;
