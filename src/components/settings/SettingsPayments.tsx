import React from 'react';
import { useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { operations } from 'services';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from 'utils/creditCards';
import { processFormData } from 'utils/forms';

const SettingsPayments = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = async values => {
    const formData: any = processFormData(values);
    formData.cardNumber = formData.cardNumber.replace(' ', '');
    operations.cards.createCard(formData)(dispatch);
  };

  return (
    <>
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <RBForm.Group>
              <RBForm.Label>{t('creditCardNumber')}</RBForm.Label>
              <br />
              <Field
                className="form-control"
                component="input"
                format={formatCreditCardNumber}
                name="cardNumber"
                pattern="[\d ]{16,22}"
                placeholder="XXXX XXXX XXXX XXXX"
              />
            </RBForm.Group>
            <RBForm.Group>
              <RBForm.Label>{t('creditCardName')}</RBForm.Label>
              <br />
              <Field
                className="form-control"
                component="input"
                name="cardholderName"
              />
            </RBForm.Group>
            <Row>
              <Col md={6}>
                <RBForm.Group>
                  <RBForm.Label>{t('creditCardExpiration')}</RBForm.Label>
                  <br />
                  <Field
                    className="form-control"
                    component="input"
                    format={formatExpirationDate}
                    name="expirationDate"
                    pattern="\d{4}/\d{2}"
                    placeholder="YYYY/MM"
                  />
                </RBForm.Group>
              </Col>
              <Col md={6}>
                <RBForm.Group>
                  <RBForm.Label>{t('creditCardCvc')}</RBForm.Label>
                  <br />
                  <Field
                    className="form-control"
                    component="input"
                    format={formatCVC}
                    name="cvc"
                    pattern="\d{3,4}"
                    placeholder="XXX"
                  />
                </RBForm.Group>
              </Col>
            </Row>
            <Button
              style={{
                float: 'right',
                marginRight: 0,
              }}
              type="submit"
              variant="success"
            >
              {t('save')}
            </Button>
          </form>
        )}
      />
    </>
  );
};

export default SettingsPayments;
