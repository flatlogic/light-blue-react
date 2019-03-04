import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Alert, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Widget from '../../components/Widget';
import s from './Login.module.scss';
import { loginUser } from '../../actions/user';

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };

    this.doLogin = this.doLogin.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  changeLogin(event) {
    this.setState({ login: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  doLogin(e) {
    e.preventDefault();
    this.props.dispatch(loginUser({ login: this.state.login, password: this.state.password }));
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/app' } }; // eslint-disable-line

    // cant access login page while logged in
    if (this.props.isAuthenticated) { // eslint-disable-line
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className={s.root}>
        <Container>
          <Widget className={`${s.widget} mx-auto`} bodyClass="p-0" title={<h3 className="mt-0">Login to your Web App</h3>}>
            <p className={s.widgetLoginInfo}>
              Use Facebook, Twitter or your email to sign in.
            </p>
            {/* eslint-disable */}
            <p className={s.widgetLoginInfo}>
              Don't have an account? Sign up now!
            </p>
            {/* eslint-disable */}
            <form className="mt" onSubmit={this.doLogin} href="/app">
              {
                this.props.errorMessage && ( // eslint-disable-line
                  <Alert className="alert-sm mx-4" color="danger">
                    {this.props.errorMessage}
                  </Alert>
                )
              }
              <label htmlFor="email-input" className="ml-4">Email</label>
              <InputGroup className="input-group-no-border px-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="fa fa-user text-white" /></InputGroupText>
                </InputGroupAddon>
                <Input id="email-input" className="input-transparent" placeholder="Your Email" value={this.state.login} onChange={this.changeLogin} />
              </InputGroup>
              <label htmlFor="password-input" className="mt ml-4">Password</label>
              <InputGroup className="input-group-no-border px-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="fa fa-lock text-white" /></InputGroupText>
                </InputGroupAddon>
                <Input id="password-input" className="input-transparent" placeholder="Your Password"  value={this.state.password} onChange={this.changePassword} />
              </InputGroup>
              <div className="bg-widget-transparent mt-4">
                <div className="p-4">
                  <Button color="danger" style={{width: '100%'}} type="submit">
                    <span className={s.smallCircle}><i className="fa fa-caret-right"></i></span>
                    <small className="ml-xs">Sign In</small>
                  </Button>
                  <a href="#" className="text-center text-white w-100 d-block mt-4">Forgot Username or Password?</a>
                </div>
                <Button type="reset" color="primary" style={{minWidth: '100%', borderRadius: 0}}>
                  <span><i className="fa fa-facebook-square fa-lg"></i> LogIn with Facebook</span>
                </Button>
              </div>
            </form>
          </Widget>
          <footer className={s.footer}>
            2019 &copy; Light Blue - React Admin Dashboard Template.
          </footer>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Login));

