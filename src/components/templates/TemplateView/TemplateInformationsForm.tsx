import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import ClickOutside from 'react-click-outside';
import { CompactPicker } from 'react-color';
import { operations } from 'services';
import { invertColor } from 'utils/colors';
import { processFormData } from 'utils/forms';
import links from 'utils/links';

const TemplateInformationsForm = ({
  template,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [color, setColor] = useState(template?.color);
  const [isColorpickerOpen, setIsColorpickerOpen] = useState(false);

  const onSubmit = async values => {
    const formData: any = processFormData(values);
    if (template) {
      operations.templates.updateTemplate(template.id, formData)(dispatch);
    } else {
      operations.templates.createTemplate(formData)(dispatch)
        .then(() => {
          dispatch(operations.pane.clearPaneContent());
          history.push(links.paths.templates);
        });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={template}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
        >
          <RBForm.Group>
            <RBForm.Label>{t('name')}</RBForm.Label>
            <Field
              className="form-control"
              component="input"
              name="name"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Couleur</RBForm.Label>
            <br />
            <Field
              name="color"
            >
              {
                ({ input }) => (
                  <>
                    <input
                      name="color"
                      type="hidden"
                      value={color}
                    />
                    <Button
                      onClick={() => setIsColorpickerOpen(true)}
                      style={{
                        backgroundColor: color,
                        borderColor: color,
                        color: color && invertColor(color),
                      }}
                      variant={!color ? 'link' : ''}
                    >
                      Sélectionner
                    </Button>
                    {
                      isColorpickerOpen && (
                        <ClickOutside
                          onClickOutside={() => setIsColorpickerOpen(false)}
                        >
                          <CompactPicker
                            color={color}
                            onChangeComplete={c => {
                              setColor(c.hex);
                              input.onChange(c.hex);
                              setIsColorpickerOpen(false);
                            }}
                          />
                        </ClickOutside>
                      )
                    }
                  </>
                )
              }
            </Field>
          </RBForm.Group>
          <div
            style={{
              bottom: 10,
              float: 'right',
              paddingBottom: 15,
              position: 'fixed',
              right: 30,
            }}
          >
            <Button
              onClick={() => dispatch(operations.pane.clearPaneContent())}
              variant="outline-secondary"
            >
              {t('cancel')}
            </Button>
            {
              template
                ? <Button type="submit" variant="success">{t('save')}</Button>
                : <Button type="submit" variant="success">{t('create')}</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default TemplateInformationsForm;
