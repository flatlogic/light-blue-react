import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Nav,
  NavLink,
  NavItem,
  Progress,
} from 'reactstrap';
import Formsy from 'formsy-react';
import Select2 from 'react-select2-wrapper';
import MaskedInput from 'react-maskedinput';
import Datetime from 'react-datetime';
import { select2CountriesData, select2ShipmentData, cardTypesData } from './data';


import InputValidation from '../../../components/InputValidation/InputValidation';
import Widget from '../../../components/Widget';
import s from './Wizard.scss';

const count = 4;
const StepsComponents = {
  Step1: function Step1() {
    return (<fieldset>
      <FormGroup row>
        <Label className="text-md-right" md={3} for="username">Username</Label>
        <Col md={8}>
          <Col md={10}>
            <InputValidation
              type="text"
              id="username"
              name="username"
              validations={{ isAlphanumeric: true }}
              trigger="change"
              required
              validationError={{ isAlphanumeric: 'Username can contain any letters or numbers, without spaces' }}
            />
            <p className="help-block">Username can contain any letters or numbers, without spaces</p>
          </Col>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label className="text-md-right" md={3} for="email">Email</Label>
        <Col md={8}>
          <Col md={10}>
            <InputValidation
              type="text"
              id="email"
              name="email"
              validations={{ isEmail: true }}
              required
              validationError={{ isEmail: 'Please provide your E-mail' }}
            />
            <p className="help-block">Please provide your E-mail</p>
          </Col>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label className="text-md-right" md={3} for="address">Address</Label>
        <Col md={8}>
          <Col md={10}>
            <InputValidation
              type="text"
              id="address"
              name="address"
              validations={{ isAlpha: true }}
              required
              validationError={{ isAlpha: 'Please provide your address' }}
            />
            <p className="help-block">Please provide your address</p>
          </Col>
        </Col>
      </FormGroup>
    </fieldset>);
  },
  Step2: function Step2() {
    return (
      <fieldset>
        <FormGroup row>
          <Label md={3} className="text-md-right" for="country-select">Destination Country</Label>
          <Col md={8}>
            <Col md={10}>
              <Select2
                style={{ width: '100%' }}
                id="country-selec"
                data={select2CountriesData}
              />
              <p className="help-block">Please choose your country destination</p>
            </Col>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={3} className="text-md-right" for="courier">Choose shipping option</Label>
          <Col md={8}>
            <Col md={10}>
              <Select2
                style={{ width: '100%' }}
                id="courier"
                data={select2ShipmentData}
              />
              <p className="help-block">Please choose your shipping option</p>
            </Col>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={3} className="text-md-right" for="destination">Destination Zip Code</Label>
          <Col md={8}>
            <Col md={10}>
              <MaskedInput
                className="form-control" id="destination" mask="111111"
                size="6"
              />
              <p className="help-block">Please provide your Destination Zip Code</p>
            </Col>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={3} className="text-md-right" for="dest-address">Destination Address</Label>
          <Col md={8}>
            <Col md={10}>
              <InputValidation type="text" id="dest-address" name="dest-address" />
              <p className="help-block">Please provide the destination address</p>
            </Col>
          </Col>
        </FormGroup>
      </fieldset>
    );
  },
  Step3: function Step3(props) {
    return (
      <fieldset>
        <FormGroup row>
          <Label md={3} className="text-md-right" for="name">Name on the Card</Label>
          <Col md={8}>
            <Col md={10}>
              <InputValidation type="text" id="name" name="name" />
            </Col>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={3} className="text-md-right" for="credit-card-type">Choose shipping option</Label>
          <Col md={8}>
            <Col md={10}>
              <Select2
                style={{ width: '100%' }}
                id="credit-card-type"
                data={cardTypesData}
              />
            </Col>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={3} className="text-md-right" for="credit">Credit Card Number</Label>
          <Col md={8}>
            <Col md={10}>
              <InputValidation type="text" id="credit" name="credit" />
            </Col>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={3} className="text-md-right" for="expiration-data">Expiration Date</Label>
          <Col md={8}>
            <Col md={10}>
              <div className="datepicker">
                <Datetime
                  id="datepicker"
                  open={props.isDatePickerOpen} //eslint-disable-line
                  viewMode="days"
                />
              </div>
            </Col>
          </Col>
        </FormGroup>
      </fieldset>
    );
  },
  Step4: function Step4() {
    return (
      <fieldset>
        <h2>Thank you!</h2>
        <p>Your submission has been received.</p>
      </fieldset>
    );
  },

};

class Wizard extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      currentStep: 1,
      progress: 25,
      isDatePickerOpen: false,
    };
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
  }

  nextStep() {
    let currentStep = this.state.currentStep;
    if (currentStep >= count) {
      currentStep = count;
    } else {
      currentStep += 1;
    }

    this.setState({
      currentStep,
      progress: (100 / count) * currentStep,
    });
  }

  previousStep() {
    let currentStep = this.state.currentStep;
    if (currentStep <= 1) {
      currentStep = 1;
    } else {
      currentStep -= 1;
    }

    this.setState({
      currentStep,
      progress: (100 / count) * currentStep,
    });
  }

  render() {
    const currentStep = this.state.currentStep;
    return (
      <div className={s.root}>
        <h2 className="page-title">Form Wizard
          <small>Form validation</small>
        </h2>
        <Row>
          <Col xl={1} className="d-none d-lg-block" />
          <Col xl={7} lg={12}>
            <Widget
              close collapse settings
              className={s.formWizard}
              title={<div>
                <h4>
                  <i className="fa fa-windows" />
                        &nbsp;Wizard&nbsp;
                        <small>Tunable widget</small>
                </h4>
                <p className="text-muted">An example of complete wizard form in widget.</p></div>}
            >

              <Nav pills justified className={s.wizardNavigation}>
                <NavItem>
                  <NavLink active={currentStep === 1}>
                    <small>1.</small>
                    &nbsp;
                    <strong> Your Details</strong>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={currentStep === 2}>
                    <small>2.</small>
                    &nbsp;
                    <strong>Shipping</strong>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={currentStep === 3}>
                    <small>3.</small>
                    &nbsp;
                    <strong>Pay</strong>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={currentStep === 4}>
                    <small>4.</small>
                    &nbsp;
                    <strong>Thank you!</strong>
                  </NavLink>
                </NavItem>
              </Nav>
              <Progress value={this.state.progress} color="white" className="progress-sm" />
              <div className="tab-content">
                <div className="step-body">
                  <Formsy.Form>
                    {currentStep === 1 && <StepsComponents.Step1 />}
                    {currentStep === 2 && <StepsComponents.Step2 />}
                    {currentStep === 3 && <StepsComponents.Step3 />}
                    {currentStep === 4 &&
                    <StepsComponents.Step4 isDatePickerOpen={this.state.isDatePickerOpen} />}
                  </Formsy.Form>
                </div>

                <div className="description ml mr">
                  <ul className="pager wizard">
                    <li className="previous">
                      <Button disabled={currentStep === 1} color="primary" onClick={this.previousStep}><i
                        className="fa fa-caret-left"
                      />
                        &nbsp;Previous</Button>
                    </li>
                    {currentStep < count &&
                    <li className="next">
                      <Button color="primary" onClick={this.nextStep}>Next <i className="fa fa-caret-right" /></Button>
                    </li>
                    }
                    {currentStep === count &&
                    <li className="finish">
                      <Button color="success">Finish <i className="fa fa-check" /></Button>
                    </li>
                    }
                  </ul>
                </div>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>);
  }
}

export default withStyles(s)(Wizard);
