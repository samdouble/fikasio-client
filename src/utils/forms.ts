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
    if (value === 'null') {
      finalValue = null;
    }
    if (finalValue !== null) {
      return {
        ...obj,
        [finalKey]: finalValue,
      };
    }
    return obj;
  }, {});

export const getFormData = idHTML => {
  const formData: any = new FormData(document.querySelector(`#${idHTML}`)! as HTMLFormElement);
  return processFormData(Object.fromEntries(formData));
};

export default {
  getFormData,
  processFormData,
};
