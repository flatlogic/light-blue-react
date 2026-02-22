import React, { useState } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Alert, Button, FormGroup, InputGroup, InputGroupText, Input, Label } from 'reactstrap';
import Widget from '../../components/Widget';
import { registerUser, authError as registerError, loginUser } from '../../actions/auth';
import microsoft from '../../images/microsoft.png';
import { isAuthenticated } from '../../core/auth';

const Register = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isFetching = useSelector((state) => state.auth.isFetching);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isPasswordValid = () => password && password === confirmPassword;

  const checkPassword = () => {
    if (!isPasswordValid()) {
      if (!password) {
        dispatch(registerError("Password field is empty"));
      } else {
        dispatch(registerError("Passwords are not equal"));
      }
      setTimeout(() => {
        dispatch(registerError());
      }, 3 * 1000);
    }
  };

  const doRegister = (event) => {
    event.preventDefault();
    if (!isPasswordValid()) {
      checkPassword();
    } else {
      dispatch(registerUser({
        email,
        password
      }));
    }
  };

  const googleLogin = () => {
    dispatch(loginUser({ social: "google" }));
  };

  const microsoftLogin = () => {
    dispatch(loginUser({ social: "microsoft" }));
  };

  const { from } = location.state || { from: { pathname: '/app' } };

  if (isAuthenticated()) {
    return (
      <Navigate to={from} replace />
    );
  }

  return (
    <div className="auth-page">
      <Container>
        <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Login to your Web App</h3>}>
          <p className="widget-auth-info">
            Please fill all fields below.
          </p>
          <form onSubmit={doRegister}>
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
                  <i className="la la-user text-white"/>
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
              <Label for="password">Password</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupText>
                  <i className="la la-lock text-white"/>
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
              <Label for="confirmPassword">Confirm</Label>
              <InputGroup className="input-group-no-border">
                <InputGroupText>
                  <i className="la la-lock text-white"/>
                </InputGroupText>
                <Input
                  id="confirmPassword"
                  className="input-transparent ps-3"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  onBlur={checkPassword}
                  type="password"
                  required
                  name="confirmPassword"
                  placeholder="Confirm"
                />
              </InputGroup>
            </FormGroup>
            <div className="bg-widget-transparent auth-widget-footer">
              <Button type="submit" color="danger" className="auth-btn"
                      size="sm">{isFetching ? 'Loading...' : 'Register'}</Button>
              <p className="widget-auth-info mt-4">
                Already have the account? Login now!
              </p>
              <Link className="d-block text-center mb-4" to="/login">Enter the account</Link>
              <div className="social-buttons">
                <Button onClick={googleLogin} color="primary" className="social-button">
                  <i className="social-icon social-google"/>
                  <p className="social-text">GOOGLE</p>
                </Button>
                <Button onClick={microsoftLogin} color="success" className="social-button">
                  <i className="social-icon social-microsoft"
                     style={{backgroundImage: `url(${microsoft})`}}/>
                  <p className="social-text">MICROSOFT</p>
                </Button>
              </div>
            </div>
          </form>
        </Widget>
      </Container>
      <footer className="auth-footer">
        2020 &copy; Sing App - React Admin Dashboard Template.
      </footer>
    </div>
  );
};

export default Register;
