import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';

import s from './ErrorPage.scss';

class ErrorPage extends React.Component {
  render() {
    return (
      <div className={s.errorPage}>
        <Container>
          <main id="content" className={s.errorContainer} role="main">
            <Row className="justify-content-center">
              <Col
                xs={{ size: 10 }}
                md={{ size: 6 }}
                xl={{ size: 4 }}
              >
                <div className={s.errorContainer}>
                  <h1 className={s.errorCode}>404</h1>
                  <p className={s.errorInfo}>
                    Opps, it seems this page does not exist.
                  </p>
                  <p className={`${s.errorHelp} mb-3`}>
                    If you are sure it should, search for it.
                  </p>
                  <Form method="get" action="/">
                    <FormGroup>
                      <Input className="input-no-border" type="text" placeholder="Search Pages" />
                    </FormGroup>
                    <Button className={s.errorBtn} type="submit" color="transparent">
                      Search <i className="fa fa-search text-warning ml-1" />
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </main>
          <footer className={s.pageFooter}>
            2014-2017 &copy; Light Blue. Admin Dashboard Template.
          </footer>
        </Container>
      </div>
    );
  }
}

export default withStyles(s)(ErrorPage);
