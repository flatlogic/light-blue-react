import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, Label, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import Widget from '../../components/Widget';
import { loginUser, receiveToken } from '../../actions/auth';
import jwt from "jsonwebtoken";
import microsoft from '../../images/microsoft.png';
import config from "../../config";

class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    static isAuthenticated(token) {
        // We check if app runs with backend mode
        if (!config.isBackend && token) return true;
        if (!token) return;
        const date = new Date().getTime() / 1000;
        const data = jwt.decode(token);
        return date < data.exp;
    }

    constructor(props) {
        super(props);

        this.state = {
            email: 'admin@flatlogic.com',
            password: 'password',
        };

        this.doLogin = this.doLogin.bind(this);
        this.googleLogin = this.googleLogin.bind(this);
        this.microsoftLogin = this.microsoftLogin.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    changeEmail(event) {
        this.setState({ email: event.target.value });
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }

    doLogin(e) {
        e.preventDefault();
        this.props.dispatch(loginUser({ email: this.state.email, password: this.state.password }));
    }

    googleLogin() {
        this.props.dispatch(loginUser({social: "google"}));
    }

    microsoftLogin() {
        this.props.dispatch(loginUser({social: "microsoft"}));
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const token = params.get('token');
        if (token) {
            this.props.dispatch(receiveToken(token));
        }
    }

    signUp() {
        this.props.history.push('/register');
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/app' } }; // eslint-disable-line

        // cant access login page while logged in
        if (Login.isAuthenticated(localStorage.getItem('token'))) {
            return (
                <Redirect to={from} />
            );
        }

        return (
            <div className="auth-page">
                <Container>
                    <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Login to your Web App</h3>}>
                        <p className="widget-auth-info">
                            Use your email to sign in.
                        </p>
                        <Alert className="alert-sm text-center mt-2 widget-middle-overflow rounded-0" color="secondary">
                            This is a real app with Node.js backend - use
                            <br/>
                            <span className="font-weight-bold">"admin@flatlogic.com / password"</span>
                            <br/>
                            to login!
                        </Alert>
                        <form onSubmit={this.doLogin}>
                            {
                                this.props.errorMessage && (
                                    <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
                                        {this.props.errorMessage}
                                    </Alert>
                                )
                            }
                            <FormGroup className="mt">
                                <Label for="email">Email</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-user text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="email" className="input-transparent pl-3" value={this.state.email} onChange={this.changeEmail} type="email"
                                           required name="email" placeholder="Email"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="la la-lock text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="password" className="input-transparent pl-3" value={this.state.password}
                                           onChange={this.changePassword} type="password"
                                           required name="password" placeholder="Password"/>
                                </InputGroup>
                            </FormGroup>
                            <div className="bg-widget auth-widget-footer">
                                <Button type="submit" color="danger" className="auth-btn"
                                        size="sm">
                                  <span className="auth-btn-circle">
                                    <i className="la la-caret-right"/>
                                  </span>
                                  {this.props.isFetching ? 'Loading...' : 'Login'}
                                </Button>
                                <p className="widget-auth-info mt-4">
                                    Don't have an account? Sign up now!
                                </p>
                                <Link className="d-block text-center mb-4" to="register">Create an Account</Link>
                                <div className="social-buttons">
                                    <Button onClick={this.googleLogin} color="primary" className="social-button">
                                        <i className="social-icon social-google"/>
                                        <p className="social-text">GOOGLE</p>
                                    </Button>
                                    <Button onClick={this.microsoftLogin} color="success" className="social-button">
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
<<<<<<< HEAD
                    2020 &copy; Light Blue - React Admin Dashboard Template.
=======
                {new Date().getFullYear()} &copy; Light Blue - React Admin Dashboard Template. Made by <a href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic LLC</a>
>>>>>>> 9e9aa184c64f1550cc100a583c8251a056bf1742
                </footer>
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

