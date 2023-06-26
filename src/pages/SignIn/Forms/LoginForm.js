import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/authSlice';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import React from 'react';

import { firebaseAuth, provider } from '../../../firebaseconfig';
import { signInWithPopup } from 'firebase/auth';

import './LoginForm.css';
import useHttp from '../../../hooks/use-http';
import Loader from '../../../components/Loader/Loader';

const LoginForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const { sendRequest, isLoading } = useHttp();
  const dispatch = useDispatch();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');

  const validEmail = enteredEmail.includes('@') && enteredEmail.trim() !== '';
  const validPassword =
    enteredPassword.length >= 6 && enteredPassword.trim() !== '';

  const invalidEmail = !validEmail && enteredEmailTouched;
  const invalidPassword = !validPassword && enteredPasswordTouched;

  const emailClass = invalidEmail
    ? 'loginForm__input--invalid'
    : 'loginForm__input';
  const passwordClass = invalidPassword
    ? 'loginForm__input--invalid'
    : 'loginForm__input';

  const FormSignInSubmitHandler = (event) => {
    event.preventDefault();

    if (!validEmail) {
      return;
    }
    if (!validPassword) {
      return;
    }

    setEnteredEmail('');
    setEnteredPassword('');
    setEnteredEmailTouched(false);
    setEnteredPasswordTouched(false);

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    loginUser(loginData);
  };

  const loginUser = (loginData) => {
    sendRequest(
      {
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-YGU5-AHmtAtxoOFZTY-7ZrQlbXN4nnk',
        method: 'POST',
        body: loginData,
      },
      getLoginResponseData
    );
  };

  const googleLogin = () => {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        dispatch(
          authActions.login({
            email: result.user.email,
            token: result._tokenResponse.idToken,
          })
        );
        localStorage.setItem('email', JSON.stringify(result.user.email));
        localStorage.setItem(
          'token',
          JSON.stringify(result._tokenResponse.idToken)
        );
        history.push('/');
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  const getLoginResponseData = (responseData) => {
    if (responseData.error) {
      setErrorMessage(responseData.error.message);
    } else {
      dispatch(
        authActions.login({
          email: responseData.email,
          token: responseData.idToken,
        })
      );
      localStorage.setItem('email', JSON.stringify(responseData.email));
      localStorage.setItem('token', JSON.stringify(responseData.idToken));

      history.push('/');
    }
  };

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const EmailBlur = () => {
    setEnteredEmailTouched(true);
  };
  const PasswordBlur = () => {
    setEnteredPasswordTouched(true);
  };

  useEffect(() => {
    if (validEmail && validPassword) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
    return () => {};
  }, [validEmail, validPassword, formValid]);

  return (
    <>
      <form className="loginForm" onSubmit={FormSignInSubmitHandler}>
        <div className="loginForm__header">
          <h2 className="loginForm__header_mainheading">
            I already have an account
          </h2>
          <p>Sign in with your email and password</p>
        </div>
        <div className="loginForm__body">
          <input
            className={emailClass}
            id="signin-email"
            type="email"
            placeholder="Enter email.."
            onChange={emailInputChangeHandler}
            onBlur={EmailBlur}
            value={enteredEmail}></input>
          <p className={invalidEmail ? 'errorMessage' : 'errorMessage--hidden'}>
            {' '}
            Entered email must contain '@'
          </p>
          <input
            className={passwordClass}
            id="signin-password"
            type="password"
            placeholder="Enter password.."
            onChange={passwordInputChangeHandler}
            onBlur={PasswordBlur}
            value={enteredPassword}></input>
          <p
            className={
              invalidPassword ? 'errorMessage' : 'errorMessage--hidden'
            }>
            {' '}
            Entered password must have more then 6 characters
          </p>
        </div>
        {isLoading && <Loader />}
        <div className="loginForm__buttons">
          <button
            className={
              !formValid ? 'loginForm--disabledBtn' : 'loginForm__loginBtn'
            }
            type="submit">
            Sign in
          </button>
          <button className="loginForm__googleBtn" onClick={googleLogin}>
            Sign in with google
          </button>
        </div>
        <div>
          {errorMessage && (
            <p className="errorMessage__request">
              Failed to login , invalid credentials
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
