import React from 'react';
import {
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Widget from '../../components/Widget';

import s from './ErrorPage.module.scss';

const ErrorPage = () => (
  <div className={`auth-page ${s.errorPage}`}>
    <Container>
      <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Page Not Found</h3>}>
        <div className={s.errorContainer}>
          <h1 className={s.errorCode}>404</h1>
          <p className={s.errorInfo}>
            Oops, this page does not exist.
          </p>
          <p className={s.errorHelp}>
            You can search for content or go back to the dashboard.
          </p>
          <Form method="get" action="/app/extra/search">
            <FormGroup className="mb-3">
              <InputGroup className="input-group-no-border">
                <InputGroupText>
                  <i className="la la-search text-white" />
                </InputGroupText>
                <Input className="input-transparent ps-3" type="text" name="q" placeholder="Search Pages" />
              </InputGroup>
            </FormGroup>
            <div className={s.actions}>
              <Button className={s.errorBtn} type="submit" color="secondary">
                Search
              </Button>
              <Button tag={Link} className={s.errorBtn} to="/app/main/dashboard" color="danger">
                Dashboard
              </Button>
            </div>
          </Form>
        </div>
      </Widget>
      <footer className="auth-footer">
        {new Date().getFullYear()} &copy; Light Blue - React Admin Dashboard Template. Made by <a href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic LLC</a>
      </footer>
    </Container>
  </div>
);

export default ErrorPage;
