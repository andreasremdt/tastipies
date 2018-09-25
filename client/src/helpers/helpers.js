export const isActiveNavLink = ({ isCurrent }) => {
  return isCurrent ? { className: "active" } : null;
};

export const hasError = field => {
  if (field.type === "submit" || field.type === "button") {
    return;
  }

  if (field.validity.valid) {
    return;
  }

  if (field.validity.valueMissing) {
    return "Please fill out this field.";
  }

  if (field.validity.tooShort) {
    return "Your text is too short, please lengthen it.";
  }

  if (field.validity.patternMismatch || field.validity.typeMismatch) {
    return "Please enter a valid email address.";
  }
};

export const formIsValid = (form, tester) => {
  let hasErrors = false;

  Array.from(form.elements).forEach(field => {
    const error = tester(field);

    if (error) hasErrors = true;
  });

  return !hasErrors;
};
