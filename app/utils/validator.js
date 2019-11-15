const validateEmail = str => {
  const regex = /^\w+(?:\.\w+)*@\w+(?:\.\w+)+$/;
  return regex.test(str);
};

const validateName = name => {
  return name.trim().length >= 1;
};

const validatePassword = password => {
  const containsDigitRegex = /[0-9]/;
  const containsLowercaseRegex = /[a-z]/;
  const containsUppercaseRegex = /[A-Z]/;
  const containsSymbolRegex = /[!@#$%^&*(),.?"':;/\\{}|<>\-_+=~`[\]]/;

  return (
    password.length >= 8 &&
    containsDigitRegex.test(password) &&
    containsLowercaseRegex.test(password) &&
    containsUppercaseRegex.test(password) &&
    containsSymbolRegex.test(password)
  );
};

export { validateEmail, validatePassword, validateName };
