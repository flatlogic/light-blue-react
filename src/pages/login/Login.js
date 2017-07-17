import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

// import Widget from '../../components/Widget';
// import Footer from '../../components/Footer';
import s from './Login.scss'; // eslint-disable-line
import { loginUser } from '../../actions/user';

class Login extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    // errorMessage: PropTypes.isRequired,
    // isFetching: PropTypes.bool.isRequired,
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
    this.props
      .dispatch(loginUser({ login: this.state.login, password: this.state.password }));
    e.preventDefault();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/app' } };

    if (this.props.isAuthenticated) { // cant access login page while logged in
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div>Login</div>
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

export default withRouter(connect(mapStateToProps)(withStyles(s)(Login)));
