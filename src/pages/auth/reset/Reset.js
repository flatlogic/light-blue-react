import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Alert, Button, FormGroup, InputGroup, Input, InputGroupText } from 'reactstrap';

import Widget from '../../../components/Widget';
import { authError, resetPassword } from '../../../actions/auth';

function Reset() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isFetching = useSelector((state) => state.auth.isFetching);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
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

  const doReset = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (!token) {
      dispatch(authError('There are no token'));
      clearAuthErrorWithDelay();
      return;
    }

    if (!checkPassword()) {
      return;
    }

    dispatch(resetPassword(token, password));
  };

  return (
    <div className="auth-page">
      <Container>
        <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Reset password</h3>}>
          <p className="widget-auth-info">
            Please fill all fields below
          </p>
          <form className="mt" onSubmit={doReset}>
            {
              errorMessage && (
                <Alert className="alert-sm" color="danger">
                  {errorMessage}
                </Alert>
              )
            }
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
            <Button type="submit" color="inverse" className="auth-btn mb-3"
              size="sm">{isFetching ? 'Loading...' : 'Reset'}</Button>
          </form>
          <p className="widget-auth-info">
            or
          </p>
          <Link className="d-block text-center" to="/login">Enter the account</Link>
        </Widget>
      </Container>
      <footer className="auth-footer">
        {new Date().getFullYear()} &copy; Light Blue - React Admin Dashboard Template. Made by <a href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic LLC</a>
      </footer>
    </div>
  );
}

export default Reset;
