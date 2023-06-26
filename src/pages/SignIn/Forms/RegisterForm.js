import { useState, useEffect } from 'react';

import Loader from '../../../components/Loader/Loader';
import useHttp from '../../../hooks/use-http';
import './RegisterForm.css';

const RegisterForm = () => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredConfirmedPasswordTouched, setEnteredConfirmedPasswordTouched] =
    useState(false);

  const [formValid, setFormValid] = useState(null);

  const { sendRequest, isLoading } = useHttp();
  const [errorMessage, setErrorMessage] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);

  const validName = enteredName.trim() !== '' && enteredName.length >= 6;
  const validEmail =
    enteredEmail.includes('@') &&
    enteredEmail.trim() !== '' &&
    enteredEmail.includes('.');
  const validPassword =
    enteredPassword.length >= 6 && enteredPassword.trim() !== '';
  const validConfirmedPassword =
    enteredPassword === confirmPassword && enteredPassword.length >= 6;

  const invalidName = !validName && enteredNameTouched;
  const invalidEmail = !validEmail && enteredEmailTouched;
  const invalidPassword = !validPassword && enteredPasswordTouched;
  const invalidConfirmedPassword =
    !validConfirmedPassword && enteredConfirmedPasswordTouched;

  const emailClass = invalidEmail
    ? 'registerForm__input--invalid'
    : 'registerForm__input';
  const passwordClass = invalidPassword
    ? 'registerForm__input--invalid'
    : 'registerForm__input';
  const nameClass = invalidName
    ? 'registerForm__input--invalid'
    : 'registerForm__input';
  const passwordConfirmClass = invalidConfirmedPassword
    ? 'registerForm__input--invalid'
    : 'registerForm__input';

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!validName && !validEmail) {
      return;
    }
    if (!validPassword && !validConfirmedPassword) {
      return;
    }

    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);
    setEnteredConfirmedPasswordTouched(false);
    setEnteredName('');
    setEnteredEmail('');
    setEnteredPassword('');
    setConfirmPassword('');

    const registerdata = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    registerUser(registerdata);
  };

  const registerUser = (userRegisterData) => {
    sendRequest(
      {
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-YGU5-AHmtAtxoOFZTY-7ZrQlbXN4nnk',
        method: 'POST',
        body: userRegisterData,
      },
      getRegistrationData
    );
  };

  const getRegistrationData = (userRegistrationResponseData) => {
    if (userRegistrationResponseData.error) {
      setErrorMessage(userRegistrationResponseData.error.message);
    } else {
      setRegisteredUser(true);
    }
  };

  const EmailInputHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const NameInputHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const PasswordInputHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const ConfirmedPasswordInputHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const EmailBlur = () => {
    setEnteredEmailTouched(true);
  };
  const PasswordBlur = () => {
    setEnteredPasswordTouched(true);
  };
  const ConfirmedPasswordBlur = () => {
    setEnteredConfirmedPasswordTouched(true);
  };
  const NameBlur = () => {
    setEnteredNameTouched(true);
  };

  useEffect(() => {
    if (validEmail && validName && validConfirmedPassword && validPassword) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
    return () => {};
  }, [validConfirmedPassword, validEmail, validName, validPassword]);

  return (
    <form className="registerForm" onSubmit={formSubmitHandler}>
      <div className="registerForm__header">
        <h2 className="registerForm__header__mainheading">
          I don't have an account
        </h2>
        <p>Sign up with your email and password</p>
      </div>
      <div className="registerForm__body">
        <input
          className={nameClass}
          id="name"
          type="text"
          placeholder="Display name"
          onChange={NameInputHandler}
          onBlur={NameBlur}
          value={enteredName}></input>
        <p className={invalidName ? 'errorMessage' : 'errorMessage--hidden'}>
          {' '}
          Entered name must be longer then 6 characters
        </p>
        <input
          className={emailClass}
          id="register-email"
          type="email"
          placeholder="Email"
          onChange={EmailInputHandler}
          onBlur={EmailBlur}
          value={enteredEmail}></input>
        <p className={invalidEmail ? 'errorMessage' : 'errorMessage--hidden'}>
          {' '}
          Entered email must contain '@' and '.'
        </p>
        <input
          className={passwordClass}
          id="register-password"
          type="password"
          placeholder="Password"
          onChange={PasswordInputHandler}
          onBlur={PasswordBlur}
          value={enteredPassword}></input>
        <p
          className={invalidPassword ? 'errorMessage' : 'errorMessage--hidden'}>
          {' '}
          Entered password must have more then 6 characters
        </p>
        <input
          className={passwordConfirmClass}
          id="password-confirm"
          type="password"
          placeholder="Confirm password"
          onChange={ConfirmedPasswordInputHandler}
          onBlur={ConfirmedPasswordBlur}
          value={confirmPassword}></input>
        <p
          className={
            invalidConfirmedPassword ? 'errorMessage' : 'errorMessage--hidden'
          }>
          {' '}
          Passwords don't match
        </p>
      </div>
      {isLoading && <Loader />}
      <div className="registerForm__buttons">
        <button
          className={
            !formValid ? 'registerForm--disabledBtn' : 'registerForm__signupBtn'
          }
          type="submit">
          Sign up
        </button>
      </div>
      <div>
        {errorMessage && (
          <p className="errorMessage__request">
            Registration failed : {errorMessage}
          </p>
        )}
        {registeredUser && (
          <p className="success">Succesfull registration , you can now login</p>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
