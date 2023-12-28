import RBForm from 'react-bootstrap/Form';
import { Field } from 'react-final-form';

export const processFormData = formData => Object
  .entries(formData)
  .reduce((obj, input) => {
    const [key, value] = input;
    let finalKey = key;
    let finalValue = value;
    const [keyType0, keyType1] = key.split(':');
    if (keyType0 === 'boolean') {
      finalKey = keyType1;
      finalValue = value === 'true';
    } else if (keyType0 === 'number') {
      if (Number.isNaN(Number(value))) {
        throw new Error('Invalid number value');
      }
      finalKey = keyType1;
      finalValue = value !== null ? Number(value) : null;
    } else if (keyType0 === 'string') {
      finalKey = keyType1;
      finalValue = value;
    }
    return {
      ...obj,
      [finalKey]: finalValue,
    };
  }, {});

export const getFormData = idHTML => {
  const formData: any = new FormData(document.querySelector(`#${idHTML}`)! as HTMLFormElement);
  return processFormData(Object.fromEntries(formData));
};

export const getFormFieldForType = (name: string, type?: string) => {
  switch (type) {
    case 'BOOLEAN':
      return (
        <Field
          className="form-control"
          component="input"
          name={name}
          type="checkbox"
        >
          {
            props => (
              <div>
                <RBForm.Check
                  {...props.input}
                  type="switch"
                />
              </div>
            )
          }
        </Field>
      );
    case 'NUMBER':
    case 'STRING':
    default:
      return (
        <Field
          className="form-control"
          component="input"
          name={name}
        />
      );
  }
}
