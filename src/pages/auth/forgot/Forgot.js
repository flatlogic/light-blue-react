import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Alert, Button, FormGroup, InputGroup, Input, InputGroupText } from 'reactstrap';

import Widget from '../../../components/Widget';
import { sendPasswordResetEmail } from '../../../actions/auth';

function Forgot() {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.auth.isFetching);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const [email, setEmail] = useState('');

  const doSendResetEmail = (e) => {
    e.preventDefault();
    dispatch(sendPasswordResetEmail(email));
  };

  return (
    <div className="auth-page">
      <Container>
        <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Forgot password?</h3>}>
          <p className="widget-auth-info">
            Please fill your email below
          </p>
          <form className="mt" onSubmit={doSendResetEmail}>
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
            <Button type="submit" color="inverse" className="auth-btn mb-3 mx-auto"
              size="sm">{isFetching ? 'Loading...' : 'Send'}</Button>
          </form>
          <p className="widget-auth-info">
            Need to Login?
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

export default Forgot;
