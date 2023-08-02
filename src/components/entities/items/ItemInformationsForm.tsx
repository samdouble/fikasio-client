import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { operations } from 'services';
import { EntityField } from 'services/entities/types';
import { RootState } from 'services/store';
import { getFormFieldForType, processFormData } from 'utils/forms';

export interface ItemInformationsFormProps {
  entityId: string;
  id: string;
}

const ItemInformationsForm = ({
  entityId,
  id,
}: ItemInformationsFormProps) => {
  const entities = useSelector((state: RootState) => state.entities);
  const items = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch();
  const entity = (entities || []).find(e => e.id === entityId);
  const item = (items || []).find(i => i.id === id);

  const onSubmit = async values => {
    const formData: any = processFormData(values);
    if (id !== 'NEW') {
      operations.items.updateItem(entityId, id, formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    } else {
      operations.items.createItem(entityId, formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    }
  };

  const itemWithInitialValues = {
    ...item,
    values: entity?.fields
      .map((field: EntityField) => ({
        fieldId: field.id,
        value: item?.values?.find(v => v.fieldId === field.id)?.value,
      })),
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={itemWithInitialValues}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RBForm.Group>
            <FieldArray name="values">
              {({ fields }) => (
                <div>
                  {
                    fields
                      .map((name, index) => (
                        <div key={name}>
                          <RBForm.Label>{entity?.fields[index].name}</RBForm.Label>
                          <Field name={`${name}.fieldId`}>
                            {
                              ({ input }) => (
                                <input {...input} type="hidden" name={`${name}.fieldId`} />
                              )
                            }
                          </Field>
                          {
                            getFormFieldForType(
                              `${name}.value`,
                              entity?.fields[index].type,
                            )
                          }
                        </div>
                      ))
                  }
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
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(operations.pane.clearPaneContent())}
            >
              Annuler
            </Button>
            {
              item
                ? <Button type="submit" variant='success'>Sauvegarder</Button>
                : <Button type="submit" variant='success'>Créer</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default ItemInformationsForm;
