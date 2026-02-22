import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Alert, Button, FormGroup, InputGroup, Input, InputGroupText } from 'reactstrap';

import Widget from '../../../components/Widget';
import { registerUser, authError, loginUser } from '../../../actions/auth';
import microsoft from '../../../images/microsoft.png';

function Register() {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.auth.isFetching);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const clearErrorTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (clearErrorTimerRef.current) {
        clearTimeout(clearErrorTimerRef.current);
      }
    };
  }, []);

  const clearAuthErrorWithDelay = () => {
    if (clearErrorTimerRef.current) {
      clearTimeout(clearErrorTimerRef.current);
    }

    clearErrorTimerRef.current = setTimeout(() => {
      dispatch(authError());
    }, 3 * 1000);
  };

  const isPasswordValid = () => {
    return password && password === confirmPassword;
  };

  const checkPassword = () => {
    if (!isPasswordValid()) {
      if (!password) {
        dispatch(authError('Password field is empty'));
      } else {
        dispatch(authError('Passwords are not equal'));
      }
      clearAuthErrorWithDelay();
      return false;
    }

    return true;
  };

  const doRegister = (e) => {
    e.preventDefault();
    if (!checkPassword()) {
      return;
    }

    dispatch(registerUser({
      email,
      password,
    }));
  };

  const googleLogin = () => {
    dispatch(loginUser({ social: 'google' }));
  };

  const microsoftLogin = () => {
    dispatch(loginUser({ social: 'microsoft' }));
  };

  return (
    <div className="auth-page">
      <Container>
        <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Create an account</h3>}>
          <p className="widget-auth-info">
            Please fill all fields below
          </p>
          <form className="mt" onSubmit={doRegister}>
            {
              errorMessage && (
                <Alert className="alert-sm" color="danger">
                  {errorMessage}
                </Alert>
              )
            }
            <FormGroup className="mt">
              <InputGroup className="input-group-no-border">

                <InputGroupText>
                  <i className="la la-user text-white" />
                </InputGroupText>

                <Input
                  id="email"
                  className="input-transparent ps-3"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  required
                  name="email"
                  placeholder="Email"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-no-border">

                <InputGroupText>
                  <i className="la la-lock text-white" />
                </InputGroupText>

                <Input
                  id="password"
                  className="input-transparent ps-3"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  required
                  name="password"
                  placeholder="Password"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-no-border">

                <InputGroupText>
                  <i className="la la-lock text-white" />
                </InputGroupText>

                <Input
                  id="password"
                  className="input-transparent ps-3"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  onBlur={checkPassword}
                  type="password"
                  required
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </InputGroup>
            </FormGroup>
            <Button type="submit" color="inverse" className="auth-btn mb-3" size="sm">{isFetching ? 'Loading...' : 'Register'}</Button>
            <div className="bg-widget auth-widget-footer">
              <p className="widget-auth-info mt-4">
                Already have the account? Login now!
              </p>
              <Link className="d-block text-center" to="/login">Enter the account</Link>
              <p className="widget-auth-info mt-4 mb-4">
                Don&apos;t have an account? Sign up now!
              </p>
              <div className="social-buttons">
                <Button onClick={googleLogin} color="primary" className="social-button">
                  <i className="social-icon social-google" />
                  <p className="social-text">GOOGLE</p>
                </Button>
                <Button onClick={microsoftLogin} color="success" className="social-button">
                  <i className="social-icon social-microsoft"
                    style={{ backgroundImage: `url(${microsoft})` }} />
                  <p className="social-text">MICROSOFT</p>
                </Button>
              </div>
            </div>
          </form>
        </Widget>
      </Container>
      <footer className="auth-footer">
        {new Date().getFullYear()} &copy; Light Blue - React Admin Dashboard Template. Made by <a href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic LLC</a>
      </footer>
    </div>
  );
}

export default Register;
