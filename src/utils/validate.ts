type Field = {
  label?: string;
  name: string;
  required?: boolean;
};

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;

export const validateForm = (
  fields: Field[],
  values: FormValues
): FormErrors => {
  const errors: FormErrors = {};

  fields.forEach((field) => {
    if (field.required && !values[field.name]?.trim()) {
      errors[field.name] = `${field?.label ?? field?.name} is required`;
    }
  });

  return errors;
};
