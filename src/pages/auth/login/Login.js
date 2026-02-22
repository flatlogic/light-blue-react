import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Alert, Button, FormGroup, Label, InputGroup, Input, InputGroupText } from 'reactstrap';

import Widget from '../../../components/Widget';
import { loginUser, receiveToken, doInit } from '../../../actions/auth';
import microsoft from '../../../images/microsoft.png';

function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isFetching = useSelector((state) => state.auth.isFetching);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const [email, setEmail] = useState('admin@flatlogic.com');
  const [password, setPassword] = useState('password');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      dispatch(receiveToken(token));
      dispatch(doInit());
    }
  }, [dispatch, location.search]);

  const doLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
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
        <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Login to your Web App</h3>}>
          <p className="widget-auth-info">
            Use your email to sign in.
          </p>
          <Alert className="alert-sm text-center mt-2 widget-middle-overflow rounded-0" color="default">
            This is a real app with Node.js backend - use
            <br />
            <span className="font-weight-bold">"admin@flatlogic.com / password"</span>
            <br />
            to login!
          </Alert>
          <form onSubmit={doLogin}>
            {
              errorMessage && (
                <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
                  {errorMessage}
                </Alert>
              )
            }
            <FormGroup className="mt">
              <Label for="email">Email</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupText>
                  <i className="la la-user text-white" />
                </InputGroupText>
                <Input id="email" className="input-transparent ps-3" value={email} onChange={(event) => setEmail(event.target.value)} type="email"
                  required name="email" placeholder="Email" />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupText>
                  <i className="la la-lock text-white" />
                </InputGroupText>
                <Input id="password" className="input-transparent ps-3" value={password}
                  onChange={(event) => setPassword(event.target.value)} type="password"
                  required name="password" placeholder="Password" />
              </InputGroup>
            </FormGroup>
            <div className="bg-widget auth-widget-footer">
              <Button type="submit" color="danger" className="auth-btn"
                size="sm">
                <span className="auth-btn-circle">
                  <i className="la la-caret-right" />
                </span>
                {isFetching ? 'Loading...' : 'Login'}
              </Button>
              <Link className="d-block text-center mt-2 fs-sm" to="/forgot">Forgot password?</Link>
              <p className="widget-auth-info mt-4">
                Don&apos;t have an account? Sign up now!
              </p>
              <Link className="d-block text-center mb-4" to="/register">Create an Account</Link>
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

export default Login;
